/**
 * Create a product from the terminal.
 *
 * Usage:
 *   Simple (positional):  npx medusa exec ./src/scripts/create-product.ts "Title" handle "Description"
 *   Full spec (JSON):    npx medusa exec ./src/scripts/create-product.ts ./product.json
 *   Batch (JSON array):  npx medusa exec ./src/scripts/create-product.ts ./products-batch.json
 *   Or env:             PRODUCT_JSON='{"title":"...", ...}' npx medusa exec ./src/scripts/create-product.ts
 *
 * Optional env vars (when not using JSON): PRODUCT_TITLE, PRODUCT_HANDLE, PRODUCT_DESCRIPTION, PRODUCT_METADATA_JSON
 *
 * Prerequisites: run seed first so you have a shipping profile and sales channel.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules, ProductStatus } from "@medusajs/framework/utils";
import { createProductsWorkflow } from "@medusajs/medusa/core-flows";

/** Product spec that mirrors Store API / createProductsWorkflow (one product). */
export interface ProductSpec {
  title: string;
  subtitle?: string | null;
  description?: string | null;
  handle: string;
  weight?: number | null;
  /** Product-level image URLs */
  images?: { url: string }[];
  /** e.g. { title: "Weight", values: ["¼ lb", "½ lb", "1 lb"] } */
  options?: { title: string; values: string[] }[];
  /** One per variant; options map option title → value; prices in cents or as amount + currency_code */
  variants?: {
    title: string;
    sku?: string | null;
    options?: Record<string, string>;
    prices: { amount: number; currency_code: string }[];
  }[];
  /** Storefront metadata: category, intendedUse, speciesSlug, tags, stock */
  metadata?: Record<string, unknown> | null;
  /** Medusa collection id (e.g. pcol_01KGWP8J4HTF4P3MJ1Q7Q91DR0) to show in collection filter */
  collection_id?: string | null;
}

function parseArgs(args: string[]): { title: string; handle: string; description: string } {
  const title =
    process.env.PRODUCT_TITLE ?? args[0] ?? "New Product";
  const handle =
    process.env.PRODUCT_HANDLE ??
    args[1] ??
    title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const description = process.env.PRODUCT_DESCRIPTION ?? args[2] ?? "";
  return { title, handle, description };
}

function parseMetadata(): Record<string, unknown> | undefined {
  const raw = process.env.PRODUCT_METADATA_JSON;
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return undefined;
  }
}

/** Single product spec or array for batch upload. */
type SpecOrBatch = ProductSpec | ProductSpec[];

async function loadSpec(args: string[]): Promise<SpecOrBatch | null> {
  const rawEnv = process.env.PRODUCT_JSON;
  if (rawEnv) {
    try {
      const parsed = JSON.parse(rawEnv);
      return Array.isArray(parsed) ? (parsed as ProductSpec[]) : (parsed as ProductSpec);
    } catch (e) {
      throw new Error("Invalid PRODUCT_JSON: " + (e instanceof Error ? e.message : String(e)));
    }
  }
  const first = args[0];
  if (first && (first.endsWith(".json") || path.isAbsolute(first) || first.includes("/") || first.includes("\\"))) {
    const filePath = path.isAbsolute(first) ? first : path.resolve(process.cwd(), first);
    const content = await fs.promises.readFile(filePath, "utf-8");
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? (parsed as ProductSpec[]) : (parsed as ProductSpec);
  }
  return null;
}

function isBatch(spec: SpecOrBatch): spec is ProductSpec[] {
  return Array.isArray(spec);
}

/** Medusa requires product options when there are variants. Use a single default option when none provided. */
const DEFAULT_OPTION = { title: "Option", values: ["Default"] };
const DEFAULT_VARIANT_OPTIONS = { Option: "Default" };

function buildWorkflowProduct(
  spec: ProductSpec,
  shippingProfileId: string,
  salesChannelId: string
): Record<string, unknown> {
  const hasOptions = spec.options && spec.options.length > 0;
  const options = hasOptions ? spec.options! : [DEFAULT_OPTION];

  const base: Record<string, unknown> = {
    title: spec.title,
    handle: spec.handle,
    description: spec.description ?? undefined,
    status: ProductStatus.PUBLISHED,
    shipping_profile_id: shippingProfileId,
    weight: spec.weight ?? 0,
    metadata: spec.metadata ?? undefined,
    images: spec.images?.length ? spec.images : undefined,
    options,
    variants: undefined as unknown,
    sales_channels: [{ id: salesChannelId }],
  };
  if (spec.subtitle != null && spec.subtitle !== "") {
    base.subtitle = spec.subtitle;
  }
  if (spec.collection_id) {
    base.collection_id = spec.collection_id;
  }
  if (spec.variants?.length) {
    base.variants = spec.variants.map((v) => ({
      title: v.title,
      sku: v.sku ?? undefined,
      options: v.options && Object.keys(v.options).length > 0 ? v.options : DEFAULT_VARIANT_OPTIONS,
      prices: v.prices,
    }));
  } else {
    base.variants = [
      {
        title: "Default",
        sku: `${(spec.handle || "product").toUpperCase().replace(/-/g, "_")}_DEFAULT`,
        options: DEFAULT_VARIANT_OPTIONS,
        prices: [
          { amount: 0, currency_code: "usd" },
          { amount: 0, currency_code: "eur" },
        ],
      },
    ];
  }
  return base;
}

export default async function createProduct({ container, args = [] }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER) as { info: (s: string) => void };
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);

  const argList = Array.isArray(args) ? args : [];
  const specOrBatch = await loadSpec(argList);

  if (specOrBatch) {
    if (isBatch(specOrBatch)) {
      for (const s of specOrBatch) {
        if (!s.title || !s.handle) throw new Error("Each product in batch must have title and handle");
      }
      logger.info(`Creating ${specOrBatch.length} products (batch)`);
    } else {
      if (!specOrBatch.title || !specOrBatch.handle) {
        throw new Error("Product JSON must have title and handle");
      }
      logger.info(`Creating product from spec: "${specOrBatch.title}" (handle: ${specOrBatch.handle})`);
    }
  } else {
    const { title, handle, description } = parseArgs(argList);
    const metadata = parseMetadata();
    logger.info(`Creating product: "${title}" (handle: ${handle})`);
    const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({ type: "default" });
    const shippingProfile = shippingProfiles[0];
    if (!shippingProfile) {
      throw new Error("No default shipping profile found. Run the seed script first: npm run seed");
    }
    const salesChannels = await salesChannelModuleService.listSalesChannels({});
    const defaultChannel = salesChannels[0];
    if (!defaultChannel) {
      throw new Error("No sales channel found. Run the seed script first: npm run seed");
    }
    const minimalSpec: ProductSpec = {
      title,
      handle,
      description: description || undefined,
      metadata: metadata ?? undefined,
      variants: [
        {
          title: "Default",
          prices: [
            { amount: 0, currency_code: "usd" },
            { amount: 0, currency_code: "eur" },
          ],
        },
      ],
    };
    const productInput = buildWorkflowProduct(minimalSpec, shippingProfile.id, defaultChannel.id);
    const { result } = await createProductsWorkflow(container).run({
      input: { products: [productInput] },
    });
    if (result[0]) logger.info(`Created product id: ${result[0].id}`);
    return result;
  }

  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({ type: "default" });
  const shippingProfile = shippingProfiles[0];
  if (!shippingProfile) {
    throw new Error("No default shipping profile found. Run the seed script first: npm run seed");
  }
  const salesChannels = await salesChannelModuleService.listSalesChannels({});
  const defaultChannel = salesChannels[0];
  if (!defaultChannel) {
    throw new Error("No sales channel found. Run the seed script first: npm run seed");
  }

  const specs: ProductSpec[] = isBatch(specOrBatch) ? specOrBatch : [specOrBatch];
  const productInputs = specs.map((s) => buildWorkflowProduct(s, shippingProfile.id, defaultChannel.id));
  const { result } = await createProductsWorkflow(container).run({
    input: { products: productInputs },
  });

  for (let i = 0; i < result.length; i++) {
    const p = result[i] as { id?: string } | undefined;
    if (p?.id) logger.info(`Created ${specs[i]?.title ?? "product"}: ${p.id}`);
  }
  return result;
}

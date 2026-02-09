/**
 * Add Canada-only fulfillment and shipping options (Standard + Express).
 * Does not touch products or other seed data.
 *
 * Usage:
 *   npx medusa exec ./src/scripts/add-canada-shipping.ts
 *   # Or with explicit IDs (e.g. if query fails):
 *   REGION_ID=reg_xxx STOCK_LOCATION_ID=sloc_xxx npx medusa exec ./src/scripts/add-canada-shipping.ts
 *
 * Prerequisites: at least one region named "Canada", one default shipping profile,
 * and one stock location (normally created by seed). Use REGION_ID and
 * STOCK_LOCATION_ID if your DB was set up differently.
 */

import type { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import {
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
} from "@medusajs/medusa/core-flows";

export default async function addCanadaShipping({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);

  const regionId = process.env.REGION_ID;
  const stockLocationId = process.env.STOCK_LOCATION_ID;

  let canadaRegionId = regionId;
  let stockLocId = stockLocationId;

  if (!canadaRegionId || !stockLocId) {
    const { data: regions } = await query.graph({
      entity: "region",
      fields: ["id", "name"],
    });
    const canada = (regions as { id: string; name: string }[] | undefined)?.find(
      (r) => r.name?.toLowerCase() === "canada"
    );
    if (!canada && !canadaRegionId) {
      throw new Error(
        'No region named "Canada" found. Create a Canada region in Admin or set REGION_ID.'
      );
    }
    if (!stockLocId) {
      const { data: locations } = await query.graph({
        entity: "stock_location",
        fields: ["id"],
      });
      const first = (locations as { id: string }[] | undefined)?.[0];
      if (!first) {
        throw new Error(
          "No stock location found. Create one in Admin or set STOCK_LOCATION_ID."
        );
      }
      stockLocId = first.id;
    }
    if (!canadaRegionId && canada) canadaRegionId = canada.id;
  }

  if (!canadaRegionId) {
    throw new Error("Canada region ID is required. Set REGION_ID or ensure a region named 'Canada' exists.");
  }

  logger.info("Using Canada region: " + canadaRegionId);
  logger.info("Using stock location: " + stockLocId);

  // Use the same shipping profile as existing products so cart completion succeeds.
  // Cart items "require shipping profiles satisfied by the current shipping methods".
  let shippingProfileId: string | null = null;
  try {
    const { data: products } = await query.graph({
      entity: "product",
      fields: ["shipping_profile_id"],
    });
    const first = (products as unknown as { shipping_profile_id: string }[] | undefined)?.[0];
    if (first?.shipping_profile_id) {
      shippingProfileId = first.shipping_profile_id;
      logger.info("Using shipping profile from existing product: " + shippingProfileId);
    }
  } catch {
    // query entity may differ
  }

  if (!shippingProfileId) {
    const defaultProfile = (
      await fulfillmentModuleService.listShippingProfiles({ type: "default" })
    )[0];
    if (defaultProfile) {
      shippingProfileId = defaultProfile.id;
      logger.info("Using default shipping profile: " + shippingProfileId);
    }
  }

  if (!shippingProfileId) {
    logger.info("Creating default shipping profile...");
    const { result } = await createShippingProfilesWorkflow(container).run({
      input: {
        data: [
          { name: "Default Shipping Profile", type: "default" },
        ],
      },
    });
    shippingProfileId = result[0].id;
  }

  const shippingProfile = { id: shippingProfileId };

  try {
    const { data: existingSets } = await query.graph({
      entity: "fulfillment_set",
      fields: ["id", "name"],
    });
    const hasCanada = (existingSets as { id: string; name: string }[] | undefined)?.some(
      (s) => s.name === "Canada shipping"
    );
    if (hasCanada) {
      logger.info("Fulfillment set 'Canada shipping' already exists. Exiting.");
      return;
    }
  } catch {
    // query entity name may differ; continue and create
  }

  logger.info("Creating fulfillment set 'Canada shipping'...");
  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "Canada shipping",
    type: "shipping",
    service_zones: [
      {
        name: "Canada",
        geo_zones: [{ country_code: "ca", type: "country" }],
      },
    ],
  });

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocId },
    [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
  });

  logger.info("Creating Standard and Express shipping options for Canada...");
  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Standard Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standard",
          description: "Ship in 2-3 days.",
          code: "standard",
        },
        prices: [
          { currency_code: "cad", amount: 1000 },
          { region_id: canadaRegionId, amount: 1000 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
      {
        name: "Express Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Express",
          description: "Ship in 24 hours.",
          code: "express",
        },
        prices: [
          { currency_code: "cad", amount: 2000 },
          { region_id: canadaRegionId, amount: 2000 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
    ],
  });

  logger.info("Done. Canada region now has Standard (10 CAD) and Express (20 CAD) shipping.");
  logger.info("Use NEXT_PUBLIC_MEDUSA_REGION_ID=" + canadaRegionId + " in your storefront.");
}

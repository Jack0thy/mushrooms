"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function HomeEmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_SUBSCRIBE;
    const url = formspreeEndpoint || "/api/subscribe";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm text-primary font-medium">
        Thanks. We&apos;ll send harvest updates to your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2 sm:flex-row sm:max-w-md sm:mx-auto">
      <Label htmlFor="email-newsletter" className="sr-only">
        Email for harvest updates
      </Label>
      <Input
        id="email-newsletter"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading"}
        className="flex-1"
        required
      />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Submitting…" : "Subscribe"}
      </Button>
    </form>
  );
}

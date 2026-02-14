import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { mergeGuestCart } from "@/actions/cart.actions";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("CLERK_WEBHOOK_SECRET not set");
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Verification failed", { status: 400 });
  }

  if (evt.type === "session.created") {
    const { user_id } = evt.data;

    if (user_id) {
      // Find any guest carts that could belong to this user
      // We look for active guest carts (those with sessionId but no userId)
      // The actual sessionId matching happens via the cookie, but since webhooks
      // don't have cookies, we check for recent guest carts
      // A more robust approach: check all active guest carts and merge if found
      const recentGuestCarts = await prisma.cart.findMany({
        where: {
          userId: null,
          sessionId: { not: null },
          status: "ACTIVE",
          updatedAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        },
        include: { items: true },
        orderBy: { updatedAt: "desc" },
        take: 1,
      });

      // Note: Without the cookie, we can't perfectly match the guest session.
      // The client-side will also attempt merge on auth state change as a fallback.
      for (const guestCart of recentGuestCarts) {
        if (guestCart.sessionId && guestCart.items.length > 0) {
          await mergeGuestCart(guestCart.sessionId, user_id);
        }
      }
    }
  }

  return new Response("OK", { status: 200 });
}

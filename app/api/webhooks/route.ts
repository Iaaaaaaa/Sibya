import { Webhook } from "svix";
import { headers } from "next/headers";
import { createOrUpdateUser } from "@/lib/actions/user";

type WebhookEventData = {
  id: string;
  first_name?: string;
  last_name?: string;
  image_url?: string;
  email_addresses?: { email_address: string }[];
  username?: string;
  contact_number?: string;
  role?: string; // Include role field here
};

type WebhookEvent = {
  data: WebhookEventData;
  type: string;
};

export async function POST(req: Request): Promise<Response> {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  if (eventType === "user.created" || eventType === "user.updated") {
    const {
      first_name,
      last_name,
      image_url,
      email_addresses,
      username,
      contact_number,
      role, // Capture the role from the event
    } = evt.data;

    // Ensure role is included in the event
    if (!role) {
      return new Response("Role is required", { status: 400 });
    }

    try {
      // Include role when creating or updating the user
      await createOrUpdateUser(
        id,
        first_name || "",
        last_name || "",
        image_url || "",
        email_addresses || [],
        username || "",
        contact_number || "",
        role // Pass role along with the other user data
      );
      return new Response("User is created or updated", {
        status: 200,
      });
    } catch (error) {
      console.error("Error creating or updating user:", error);
      return new Response("Error occurred", {
        status: 400,
      });
    }
  }

  return new Response("", { status: 200 });
}

import { Webhook } from "svix";
import { headers } from "next/headers";
import { createOrUpdateUser, deleteUser } from "@/lib/actions/user";

type WebhookEventData = {
  id: string;
  first_name?: string;
  last_name?: string;
  image_url?: string;
  email_addresses?: { email_address: string }[];
  role?: string;
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

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("3Error occurred -- no svix headers", {
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
    console.error("2Error verifying webhook:", err);
    return new Response("1Error occurred", {
      status: 400,
    });
  }

  // Handle the event
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  if (eventType === "user.created" || eventType === "user.updated") {
    const { first_name, last_name, image_url, email_addresses, role } =
      evt.data;
    const missingFields: string[] = [];
    if (!first_name) missingFields.push("first_name");
    if (!last_name) missingFields.push("last_name");
    if (!image_url) missingFields.push("image_url");
    if (!email_addresses || email_addresses.length === 0)
      missingFields.push("email_addresses");

    if (!role) missingFields.push("role");

    // If there are missing fields, return a specific error message
    if (missingFields.length > 0) {
      return new Response(
        `Error occurred. Missing fields: ${missingFields.join(", ")}`,
        {
          status: 400,
        }
      );
    }
    try {
      await createOrUpdateUser(
        id,
        first_name || "",
        last_name || "",
        image_url || "",
        email_addresses || [],
        role || ""
      );
      return new Response("User is created or updated", {
        status: 200,
      });
    } catch (error) {
      console.log(first_name, last_name, role, email_addresses);
      console.error("Error creating or updating user:", error);
      return new Response("5Error occurred", {
        status: 400,
      });
    }
  }

  if (eventType === "user.deleted") {
    try {
      await deleteUser(id);
      return new Response("User is deleted", {
        status: 200,
      });
    } catch (error) {
      console.error("7Error deleting user:", error);
      return new Response("6Error occurred", {
        status: 400,
      });
    }
  }

  return new Response("", { status: 200 });
}

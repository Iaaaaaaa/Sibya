import { Webhook } from "svix";
import { headers } from "next/headers";
import { createOrUpdateUser, deleteUser } from "@lib/actions/user";

export async function POST(req) {
  // Retrieve the webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Error: WEBHOOK_SECRET is not defined.");
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Extract headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // Check for missing headers
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Error: Missing required Svix headers.");
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get and verify the request body
  let evt;
  try {
    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);

    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", {
      status: 400,
    });
  }

  // Handle the verified event
  const eventType = evt?.type;
  console.log(`Received event: ${eventType}`);

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, first_name, last_name, image_url, email_addresses, username } =
      evt?.data;

    try {
      console.log(
        `Processing ${eventType} event for user ID: ${id} (${username})`
      );

      await createOrUpdateUser(
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username
      );

      console.log(`Successfully handled ${eventType} event for user ID: ${id}`);
      return new Response("User is created or updated", {
        status: 200,
      });
    } catch (err) {
      console.error(`Error creating or updating user (ID: ${id}):`, err);
      return new Response("Error processing user creation/update", {
        status: 500,
      });
    }
  }

  if (eventType === "user.deleted") {
    try {
      const { id } = evt?.data;
      console.log(`Processing user.deleted event for user ID: ${id}`);

      await deleteUser(id);

      console.log(`Successfully deleted user ID: ${id}`);
      return new Response("User is deleted", {
        status: 200,
      });
    } catch (err) {
      console.error(`Error deleting user (ID: ${id}):`, err);
      return new Response("Error processing user deletion", {
        status: 500,
      });
    }
  }

  console.warn(`Unhandled event type: ${eventType}`);
  return new Response("Unhandled event type", {
    status: 400,
  });
}

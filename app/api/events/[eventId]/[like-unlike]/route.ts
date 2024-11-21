import { NextResponse, NextRequest } from "next/server"; // Import NextRequest
import Event from "@/lib/models/Event";
import { connectToDB } from "@/mongodb/mongoose";
import { getAuth } from "@clerk/nextjs/server"; // Correct import

export async function GET(
  req: NextRequest,
  context: { params: { eventId: string } }
): Promise<Response> {
  try {
    // Connect to the database
    await connectToDB();

    // Destructure eventId from params
    const { eventId } = context.params;

    // Get the user from Clerk's authentication
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch the event by eventId and populate the likes to check the user
    const event = await Event.findById(eventId)
      .populate("likes") // Assuming likes is an array of user objects or user IDs
      .exec();

    if (!event) {
      return new NextResponse("Event not found", { status: 404 });
    }

    // Check if the user has already liked the event
    const isLiked = event.likes.some(
      (like: any) => like._id.toString() === userId
    );

    return NextResponse.json({ isLiked }, { status: 200 });
  } catch (err) {
    console.error(`Error fetching event ${context.params.eventId}:`, err);
    return new NextResponse("Failed to fetch event", { status: 500 });
  }
}

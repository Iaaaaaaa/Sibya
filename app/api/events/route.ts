import { NextResponse } from "next/server";
import Event from "@/lib/models/Event";
import { connectToDB } from "@/mongodb/mongoose";
import { Types } from "mongoose";

export const GET = async (req: Request): Promise<Response> => {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch all posts and populate related fields (if needed)
    const events = await Event.find()
      .populate<{ page: Types.ObjectId | null }>("page") // You can populate more fields if needed
      .exec();

    // Return the posts as a JSON response
    return NextResponse.json(events, { status: 200 });
  } catch (err) {
    console.error("Error fetching events:", err);
    return new NextResponse("Failed to fetch all events", { status: 500 });
  }
};

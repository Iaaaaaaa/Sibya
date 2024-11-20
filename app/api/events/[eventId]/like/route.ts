import { NextResponse } from "next/server";
import Event from "@/lib/models/Event";
import User from "@/lib/models/User";
import { connectToDB } from "@/mongodb/mongoose";
import { ObjectId } from "mongodb";
import generateObjectId from "@/app/utils/objectIdUtil";
import mongoose from "mongoose";

export const PUT = async (
  req: Request,
  context: { params: Promise<{ eventId: string }> }
): Promise<Response> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { eventId } = await context.params;
    console.log("Requested eventId:", eventId);

    await connectToDB();

    if (!eventId || !ObjectId.isValid(eventId)) {
      console.log("Invalid eventId:", eventId);
      return NextResponse.json({ error: "Invalid eventId" }, { status: 400 });
    }

    let { userId } = await req.json();
    userId = userId.trim();

    const userObjectId = generateObjectId(userId);

    if (!ObjectId.isValid(userObjectId)) {
      console.log("Invalid userId:", userId);
      return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
    }

    const event = await Event.findById(eventId).session(session);
    const user = await User.findOne({ clerkId: userId }).session(session);

    if (!event) {
      console.log("Event not found for eventId:", eventId);
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (!user) {
      console.log("User not found for userId:", userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let message = "Event liked";
    let updateOperation;

    if (event.likes.includes(user._id)) {
      // Unlike the event
      updateOperation = { $pull: { likes: user._id } };
      message = "Event unliked";
    } else {
      // Like the event
      updateOperation = { $push: { likes: user._id } };
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      updateOperation,
      { new: true, session }
    );

    // Update the user's likedEvents
    await User.findByIdAndUpdate(
      user._id,
      updateOperation.hasOwnProperty("$push")
        ? { $push: { likedEvents: eventId } }
        : { $pull: { likedEvents: eventId } },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(
      { message, likes: updatedEvent.likes },
      { status: 200 }
    );
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error liking/unliking post:", err);
    return NextResponse.json(
      { error: "Failed to like/unlike post" },
      { status: 500 }
    );
  }
};

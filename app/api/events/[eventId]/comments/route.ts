import { NextResponse } from "next/server";
import Event from "@/lib/models/Event";
import User from "@/lib/models/User";
import { connectToDB } from "@/mongodb/mongoose";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request,
  context: { params: { eventId: string } }
) {
  try {
    await connectToDB();

    const { eventId } = await context.params;

    const event = await Event.findById(eventId).populate({
      path: "comments.commenter",
      model: User,
      select: "firstName lastName profilePhoto",
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event.comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  context: { params: { eventId: string } }
) {
  try {
    await connectToDB();

    const { eventId } = await context.params;
    const { text, userId } = await req.json();

    if (!text || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const newComment = {
      commenter: user._id,
      text,
      createdAt: new Date(),
    };

    event.comments.push(newComment);
    await event.save();

    const populatedComment = await Event.populate(event, {
      path: "comments.commenter",
      model: User,
      select: "firstName lastName profilePhoto",
    });

    const addedComment =
      populatedComment.comments[populatedComment.comments.length - 1];

    return NextResponse.json(addedComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

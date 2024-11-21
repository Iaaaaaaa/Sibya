import { NextResponse } from "next/server";
import Event from "@/lib/models/Event";
import { connectToDB } from "@/mongodb/mongoose";
import { Types } from "mongoose";

export async function PUT(
  req: Request,
  context: { params: { pageId: string; eventId: string } }
) {
  try {
    const { pageId, eventId } = await context.params;
    await connectToDB();

    if (!Types.ObjectId.isValid(pageId) || !Types.ObjectId.isValid(eventId)) {
      return NextResponse.json(
        { error: "Invalid pageId or eventId" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const department = formData.get("department") as string;
    const image = formData.get("image") as File | null;

    const updateData: any = {
      title,
      description,
      date,
      time,
      department,
    };

    if (image) {
      // Handle image upload and update updateData with new image URL
      // This part depends on your image upload implementation
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, {
      new: true,
    }).populate("page");

    if (!updatedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: { pageId: string; eventId: string } }
) {
  try {
    const { pageId, eventId } = await context.params;
    await connectToDB();

    if (!Types.ObjectId.isValid(pageId) || !Types.ObjectId.isValid(eventId)) {
      return NextResponse.json(
        { error: "Invalid pageId or eventId" },
        { status: 400 }
      );
    }

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import Page from "@/lib/models/Page";
import Event from "@/lib/models/Event";
import { connectToDB } from "@/mongodb/mongoose";
import { Types } from "mongoose";

export const GET = async (
  req: Request,
  context: { params: { pageId: string } }
): Promise<Response> => {
  try {
    const { pageId } = context.params;

    // Debug: Log the pageId
    console.log("Requested pageId:", pageId);

    await connectToDB();

    // Ensure the `pageId` is a valid ObjectId
    if (!Types.ObjectId.isValid(pageId)) {
      console.log("Invalid pageId:", pageId);
      return new NextResponse("Invalid pageId", { status: 400 });
    }

    // Fetch the page and populate events
    const page = await Page.findById(pageId).populate("events").exec();

    // Debug: Log the page details
    console.log("Found page:", page);

    if (!page) {
      return new NextResponse("Page not found", { status: 404 });
    }

    // Extract the populated events
    const events = page.events;

    // Debug: Log the associated events
    console.log("Found events:", events);

    if (!events || events.length === 0) {
    }

    return NextResponse.json(events, { status: 200 });
  } catch (err) {
    console.error("Error fetching events for the page:", err);
    return new NextResponse("Failed to fetch events", { status: 500 });
  }
};

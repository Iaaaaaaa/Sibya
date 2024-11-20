import { NextResponse } from "next/server";
import Page from "@/lib/models/Page";
import { connectToDB } from "@/mongodb/mongoose";
import { Types } from "mongoose";

// The GET method should handle async params correctly
export const GET = async (
  req: Request,
  context: { params: Promise<{ pageId: string }> } // Await params correctly
): Promise<Response> => {
  try {
    // Await the params to get the pageId
    const { pageId } = await context.params;

    // Debug: Log the pageId for verification
    console.log("Requested pageId:", pageId);

    // Connect to the database
    await connectToDB();

    // Validate the pageId
    if (!Types.ObjectId.isValid(pageId)) {
      console.log("Invalid pageId:", pageId);
      return NextResponse.json({ error: "Invalid pageId" }, { status: 400 });
    }

    // Fetch the page from the database
    const page = await Page.findById(pageId).populate("creator").exec();

    // Handle case where page is not found
    if (!page) {
      console.log("Page not found for pageId:", pageId);
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Return the page data in the response
    return NextResponse.json(page, { status: 200 });
  } catch (err) {
    console.error("Error fetching page:", err);
    return NextResponse.json(
      { error: "Failed to fetch page" },
      { status: 500 }
    );
  }
};

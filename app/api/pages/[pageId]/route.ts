import { NextResponse } from "next/server";
import Page from "@/lib/models/Page";
import { connectToDB } from "@/mongodb/mongoose";
import { Types } from "mongoose";

export const GET = async (
  req: Request,
  context: { params: { pageId: string } } // Use `Promise` correctly
): Promise<Response> => {
  try {
    // Await params before accessing pageId
    const { pageId } = await context.params;

    // Connect to the database
    await connectToDB();

    // Validate the pageId
    if (!Types.ObjectId.isValid(pageId)) {
      return NextResponse.json({ error: "Invalid pageId" }, { status: 400 });
    }

    // Fetch the page
    const page = await Page.findById(pageId).populate("creator").exec();

    // Handle page not found
    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(page, { status: 200 });
  } catch (err) {
    console.error("Error fetching page:", err);
    return NextResponse.json(
      { error: "Failed to fetch page" },
      { status: 500 }
    );
  }
};

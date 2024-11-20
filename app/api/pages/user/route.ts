import { NextResponse, NextRequest } from "next/server"; // Import NextRequest
import Page from "@/lib/models/Page";
import { connectToDB } from "@/mongodb/mongoose";
import { getAuth } from "@clerk/nextjs/server"; // Correct import

export async function GET(req: NextRequest): Promise<Response> {
  // Use NextRequest here
  try {
    // Connect to the database
    await connectToDB();

    // Get the user from Clerk's authentication
    const { userId } = getAuth(req); // This retrieves the userId from Clerk

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch pages created by the current user
    const pages = await Page.find({ creator: userId })
      .populate("creator")
      .exec();

    return NextResponse.json(pages, { status: 200 });
  } catch (err) {
    console.error("Error fetching pages:", err);
    return new NextResponse("Failed to fetch pages", { status: 500 });
  }
}

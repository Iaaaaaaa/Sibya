import { NextResponse } from "next/server";
import Page from "@/lib/models/Page";
import { connectToDB } from "@/mongodb/mongoose";
import { HydratedDocument, Types } from "mongoose";

export const GET = async (req: Request): Promise<Response> => {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch all pages and populate related fields
    const pages = await Page.find()
      .populate<{ creator: Types.ObjectId | null }>("creator")
      .exec();

    // Return the pages as a JSON response
    return NextResponse.json(pages, { status: 200 });
  } catch (err) {
    console.error("Error fetching pages:", err);
    return new NextResponse("Failed to fetch all pages", { status: 500 });
  }
};

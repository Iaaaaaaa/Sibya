import { NextResponse } from "next/server";
import Event from "@/lib/models/Event";
import { connectToDB } from "@/mongodb/mongoose";
import { auth } from "@clerk/nextjs/server";
import { writeFile } from "fs/promises";
import path from "path";
import generateObjectId from "@/app/utils/objectIdUtil"; // Use the hashing utility
import Page from "@/lib/models/Page";

// Disable automatic body parsing by Next.js
export const config = {
  api: {
    bodyParser: false, // Disable Next.js's body parser so we can handle it manually
  },
};

// Utility function to save uploaded files
const saveFile = async (
  file: File | null,
  folder: string
): Promise<string | null> => {
  if (!file) return null;

  const currentWorkingDirectory = process.cwd();

  // Generate a unique file name using timestamp and file name
  const uniqueFileName = `${Date.now()}-${file.name}`;

  // Validate file type and size (example: allowing only images under 5MB)
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    console.error("Invalid file type:", file.type);
    throw new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed.");
  }
  if (file.size > 5 * 1024 * 1024) {
    // 5MB limit
    console.error("File size exceeds 5MB:", file.size);
    throw new Error("File size exceeds the 5MB limit.");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Path where the file will be saved
  const filePath = path.join(
    currentWorkingDirectory,
    "public",
    "uploads",
    folder,
    uniqueFileName
  );

  try {
    await writeFile(filePath, buffer);
    console.log("File saved to:", filePath);
    return `/uploads/${folder}/${uniqueFileName}`;
  } catch (error) {
    console.error("Error saving file:", error);
    throw new Error("Error saving file.");
  }
};

export async function POST(
  req: Request,
  { params }: { params: { pageId: string } }
) {
  try {
    // Authentication with Clerk
    const { userId }: { userId: string | null } = await auth();
    if (!userId) {
      console.error("Unauthorized access attempt");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extract the pageId from the URL parameters (e.g., /create/[pageId]/route.ts)
    const { pageId } = params;

    // Parse the form data manually
    const formData = await req.formData();
    console.log("Form Data:", formData);

    const title = formData.get("title") as string; // Changed field name
    const description = formData.get("description") as string; // Changed field name
    const image = formData.get("image") as File | null;
    const date = formData.get("date") as string; // User-provided date (e.g., '2024-11-22')
    const time = formData.get("time") as string; // User-provided time (e.g., '12:43')

    // Ensure that required fields are present
    if (!title || !description || !date || !time) {
      console.error("Missing required fields:", {
        title: !title,
        description: !description,
        date: !date,
        time: !time,
      });
      return new NextResponse(
        "Title, Description, date, and time are required",
        {
          status: 400,
        }
      );
    }

    // Connect to the database
    await connectToDB();

    // Convert userId to a valid ObjectId
    const creatorId = generateObjectId(userId);

    // Combine the date and time into a single Date object
    const dateTimeString = `${date}T${time}:00`; // Format as 'YYYY-MM-DDTHH:mm:ss'
    const eventDate = new Date(dateTimeString);

    // Fetch the page by pageId (ensure that the event is associated with the correct page)
    const currentPage = await Page.findById(pageId);
    if (!currentPage) {
      console.error("Page not found for the given pageId:", pageId);
      return new NextResponse("Page not found", { status: 400 });
    }

    // Save the image (if present)
    let imageUrl = null;
    try {
      imageUrl = await saveFile(image, "postImages");
    } catch (error) {
      console.error(
        "File saving error:",
        error instanceof Error ? error.message : error
      );
      return new NextResponse(
        error instanceof Error ? error.message : "Error saving file",
        {
          status: 400,
        }
      );
    }

    // Create the post document in MongoDB
    const event = await Event.create({
      creator: creatorId,
      page: currentPage._id, // Associate the post with the current page
      title, // Changed field name
      description, // Changed field name
      image: imageUrl, // Save the file URL
      date: eventDate, // Save the combined date and time
    });

    // Optionally, you can update the page to add the post to the `posts` array
    const updatedPage = await Page.findByIdAndUpdate(
      pageId,
      { $push: { events: event._id } },
      { new: true } // Return the updated document
    );

    if (!updatedPage) {
      return new NextResponse("Failed to update the page", { status: 500 });
    }

    console.log("event created successfully:", event);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event in the database:", error);

    // Type guard to handle unknown error types
    if (error instanceof Error) {
      // Log the entire error object for debugging
      console.error("Error details:", error);

      // Return the full error object (you can stringify it for better readability)
      return new NextResponse(`Error: ${JSON.stringify(error, null, 2)}`, {
        status: 400,
      });
    }

    // For non-Error objects, handle the generic case
    console.error("Internal Server Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

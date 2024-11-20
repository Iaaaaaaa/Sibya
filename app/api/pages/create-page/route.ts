import { NextResponse } from "next/server";
import Page from "@/lib/models/Page";
import { connectToDB } from "@/mongodb/mongoose";
import { auth } from "@clerk/nextjs/server";
import { writeFile } from "fs/promises";
import path from "path";

// Disable automatic body parsing by Next.js
export const config = {
  api: {
    bodyParser: false,
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

  // Validate file type and size
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed.");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File size exceeds the 5MB limit.");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(
    currentWorkingDirectory,
    "public",
    "uploads",
    folder,
    uniqueFileName
  );

  try {
    await writeFile(filePath, buffer);
    return `/uploads/${folder}/${uniqueFileName}`;
  } catch (error) {
    throw new Error("Error saving file.");
  }
};

export async function POST(req: Request) {
  try {
    // Authenticate the user
    const { userId }: { userId: string | null } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse the form data
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const department = formData.get("department") as string | null;
    const profilePhoto = formData.get("profilePhoto") as File | null;
    const coverPhoto = formData.get("coverPhoto") as File | null;

    // Validate required fields
    if (!name || !description) {
      return new NextResponse("Name and description are required", {
        status: 400,
      });
    }

    // Connect to the database
    await connectToDB();

    // Save the profile and cover photos (if provided)
    let profilePhotoUrl = null;
    let coverPhotoUrl = null;

    if (profilePhoto) {
      try {
        profilePhotoUrl = await saveFile(profilePhoto, "profilePhotos");
      } catch (error) {
        return new NextResponse(
          error instanceof Error ? error.message : "Error saving profile photo",
          { status: 400 }
        );
      }
    }

    if (coverPhoto) {
      try {
        coverPhotoUrl = await saveFile(coverPhoto, "coverPhotos");
      } catch (error) {
        return new NextResponse(
          error instanceof Error ? error.message : "Error saving cover photo",
          { status: 400 }
        );
      }
    }

    // Create the page in the database
    const page = await Page.create({
      creator: userId,
      createdBy: userId,
      name,
      description,
      profilePhoto: profilePhotoUrl || "default-profile-photo-url",
      coverPhoto: coverPhotoUrl || "default-cover-photo-url",
      department: department || undefined,
      events: [], // Initialize with an empty array
    });

    console.log("Page created successfully:", page);
    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    console.error("Error creating page:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Internal Server Error",
      { status: 500 }
    );
  }
}

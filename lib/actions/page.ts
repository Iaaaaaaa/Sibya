import Page from "@/lib/models/Page";
import { connectToDB } from "../../mongodb/mongoose";

interface CreatePageParams {
  creatorId: string; // ID of the user creating the page
  name: string;
  description: string;
  profilePhoto?: string;
  coverPhoto?: string;
  department?: string;
}

export const createPage = async ({
  creatorId,
  name,
  description,
  profilePhoto = "default-profile-photo-url",
  coverPhoto = "default-cover-photo-url",
  department,
}: CreatePageParams) => {
  try {
    // Connect to the database
    await connectToDB();

    // Validate required fields
    if (!creatorId || !name || !description) {
      throw new Error(
        "Missing required fields: creatorId, name, or description."
      );
    }

    // Create the new page
    const newPage = new Page({
      creator: creatorId,
      createdBy: creatorId,
      name,
      description,
      profilePhoto,
      coverPhoto,
      department,
    });

    // Save the page to the database
    const savedPage = await newPage.save();

    return savedPage;
  } catch (error) {
    console.error("Error in createPage:", error);
    throw new Error("Failed to create page.");
  }
};

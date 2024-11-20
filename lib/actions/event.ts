import Event from "@/lib/models/Event";
import { connectToDB } from "../../mongodb/mongoose";

interface CreateEventParams {
  creatorId: string; // ID of the user creating the post
  pageId: string; // ID of the page the post will belong to
  title: string; // Changed field name
  description: string; // Changed field name
  department: string;
  image?: string; // Optional image for the post
  date: string; // The user-provided date (e.g., '2024-11-22')
  time: string; // The user-provided time (e.g., '12:43')
}

export const createEvent = async ({
  creatorId,
  pageId,
  title,
  description,
  department,
  image = "", // Default value for image
  date, // User-provided date (e.g., '2024-11-22')
  time, // User-provided time (e.g., '12:43')
}: CreateEventParams) => {
  try {
    // Connect to the database
    await connectToDB();

    // Validate required fields
    if (
      !creatorId ||
      !pageId ||
      !title ||
      !description ||
      !department ||
      !date ||
      !time
    ) {
      throw new Error(
        "Missing required fields: creatorId, pageId, Title, Description, date, or time."
      );
    }

    // Combine the date and time into a single Date object
    const dateTimeString = `${date}T${time}:00`; // Format as 'YYYY-MM-DDTHH:mm:ss'
    const eventDate = new Date(dateTimeString);

    // Create a new post with the combined date and time
    const newEvent = new Event({
      creator: creatorId,
      page: pageId, // The post is associated with the page
      title,
      description,
      department,
      image,
      date: eventDate, // Save the combined date and time
    });

    // Save the post to the database
    const savedEvent = await newEvent.save();

    return savedEvent;
  } catch (error) {
    console.error("Error in createPost:", error);
    throw new Error("Failed to create post.");
  }
};

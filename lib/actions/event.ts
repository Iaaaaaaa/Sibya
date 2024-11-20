import Post from "@/lib/models/Event";
import { connectToDB } from "../../mongodb/mongoose";
import Page from "@/lib/models/Page";

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

export const createPost = async ({
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
    const postDate = new Date(dateTimeString);

    // Create a new post with the combined date and time
    const newEvent = new Post({
      creator: creatorId,
      page: pageId, // The post is associated with the page
      title,
      description,
      department,
      image,
      date: postDate, // Save the combined date and time
    });

    // Save the post to the database
    const savedEvent = await newEvent.save();

    // Optionally, you can update the page to add the post to the `posts` array
    await Page.findByIdAndUpdate(pageId, {
      $push: { posts: savedEvent._id },
    });

    return savedEvent;
  } catch (error) {
    console.error("Error in createPost:", error);
    throw new Error("Failed to create post.");
  }
};

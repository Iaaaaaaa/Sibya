import mongoose, { Schema, model, models } from "mongoose";

// Define the Post Schema
const EventSchema = new Schema(
  {
    title: { type: String, required: true }, // Changed field name
    description: { type: String, required: true }, // Changed field name
    image: { type: String, default: "" }, // Optional image for the post
    creator: { type: String, required: true }, // The user who created the post
    page: { type: mongoose.Schema.Types.ObjectId, ref: "Page", required: true }, // Reference to the Page model
    comments: [
      {
        commenter: { type: String, required: true }, // User who commented
        text: { type: String, required: true }, // The comment text
        createdAt: { type: Date, default: Date.now }, // Timestamp for when the comment was made
      },
    ],
    date: { type: Date, required: true }, // Let the user provide the date
  },
  {
    timestamps: true, // Auto adds createdAt and updatedAt fields
  }
);

// Create the Post model
const Event = models.Event || model("Event", EventSchema);

export default Event;

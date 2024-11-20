import mongoose, { Schema, model, models } from "mongoose";

const PageSchema = new Schema(
  {
    creator: { type: String, required: true }, // Accept Clerk's string userId
    createdBy: { type: String, required: true }, // Accept Clerk's string userId
    name: { type: String, required: true },
    description: { type: String, required: true },
    profilePhoto: { type: String, default: "default-profile-photo-url" },
    coverPhoto: { type: String, default: "default-cover-photo-url" },
    department: { type: String },
    events: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Event", default: [] },
    ],
  },
  {
    timestamps: true,
  }
);

const Page = models.Page || model("Page", PageSchema);

export default Page;

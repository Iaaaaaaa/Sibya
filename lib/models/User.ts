import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePhoto: { type: String },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["Admin", "User"], default: "User" },
});

const User = models.User || model("User", UserSchema);

export default User;

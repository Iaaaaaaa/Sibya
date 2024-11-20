import mongoose from "mongoose";
import crypto from "crypto";

// Convert Clerk userId to a 24-character hex string
function generateObjectId(userId: string): mongoose.Types.ObjectId {
  const hashedId = crypto
    .createHash("md5")
    .update(userId)
    .digest("hex")
    .substring(0, 24); // Ensure it’s 24 characters
  return new mongoose.Types.ObjectId(hashedId);
}

export default generateObjectId;

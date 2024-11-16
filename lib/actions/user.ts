import User from "@/lib/models/User";
import { connectToDB } from "../../mongodb/mongoose";

// Updated UserInput type with contact number
type EmailAddress = {
  email_address: string;
};

type UserInput = {
  first_name: string;
  last_name: string;
  image_url: string;
  email_addresses: EmailAddress[];
  username: string;
  contact_number: string; // Added contact number
};

export const createOrUpdateUser = async (
  clerkId: string,
  firstName: string,
  lastName: string,
  profilePhoto: string,
  emailAddresses: { email_address: string }[],
  username: string,
  contactNumber: string,
  role: string // New role parameter
) => {
  try {
    // Check if role is valid (either "Student" or "Faculty")
    if (!["Student", "Faculty"].includes(role)) {
      throw new Error("Invalid role");
    }

    // Create or update the user with the role
    const user = await User.findOneAndUpdate(
      { clerkId }, // Find the user by clerkId
      {
        $set: {
          firstName,
          lastName,
          profilePhoto,
          emailAddresses,
          username,
          contact_number: contactNumber,
          role,
        },
      },
      { new: true, upsert: true } // Create a new user if not found
    );

    return user;
  } catch (error) {
    console.error("Error creating or updating user:", error);
    throw new Error("Failed to create or update user");
  }
};

// Deleting user by clerkId
export const deleteUser = async (id: string) => {
  try {
    // Establish DB connection
    await connectToDB();

    // Delete user based on clerkId
    const deletedUser = await User.findOneAndDelete({ clerkId: id });

    if (!deletedUser) {
      console.log("User not found for deletion");
      return null; // Return null if user was not found
    }

    return deletedUser;
  } catch (error) {
    console.error("Error in deleteUser:", error);
    throw new Error("Error deleting user");
  }
};

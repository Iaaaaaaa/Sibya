import User from "@/lib/models/User";
import { connectToDB } from "../../mongodb/mongoose";

export const createOrUpdateUser = async (
  id: string,
  first_name: string,
  last_name: string,
  image_url: string,
  email_addresses: { email_address: string }[],
  role: string
) => {
  try {
    await connectToDB();

    const userRole = role || "User";

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePhoto: image_url,
          email: email_addresses[0]?.email_address || "",
          role: userRole,
        },
      },
      { upsert: true, new: true } // Create a new user if one doesn't exist
    );

    await user?.save();
    return user;
  } catch (error) {
    console.error("Error in createOrUpdateUser:", error);
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

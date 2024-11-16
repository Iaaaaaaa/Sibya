import User from "@/lib/models/User";
import { connectToDB } from "../../mongodb/mongoose";

type EmailAddress = {
  email_address: string;
};

type UserInput = {
  first_name: string;
  last_name: string;
  image_url: string;
  email_addresses: EmailAddress[];
  username: string;
};

export const createOrUpdateUser = async (
  id: string,
  first_name: string,
  last_name: string,
  image_url: string,
  email_addresses: EmailAddress[],
  username: string
) => {
  try {
    await connectToDB();

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePhoto: image_url,
          email: email_addresses[0].email_address,
          username: username,
        },
      },
      { upsert: true, new: true } // if user doesn't exist, create a new one
    );

    await user?.save();
    return user;
  } catch (error) {
    console.error("Error in createOrUpdateUser:", error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connectToDB();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.error("Error in deleteUser:", error);
  }
};

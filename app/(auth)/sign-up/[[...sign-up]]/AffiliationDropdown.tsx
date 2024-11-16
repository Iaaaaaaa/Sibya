"use client";

import React, { useState } from "react";
import { Poppins } from "next/font/google";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const AffiliationDropdown: React.FC = () => {
  const [role, setRole] = useState<string>(""); // State to manage the selected role

  const handleRoleChange = async (selectedValue: string) => {
    setRole(selectedValue);

    // Create event types dynamically
    const eventType = role
      ? "role.updated" // If role already exists, it's an update
      : "role.created"; // Otherwise, it's a creation

    // API call to send the role and event type
    try {
      const response = await fetch("/api/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: selectedValue,
          eventType,
        }),
      });

      if (response.ok) {
        console.log("Role event successfully sent.");
      } else {
        console.error("Failed to send role event:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending role event:", error);
    }
  };

  const handleRoleDelete = async () => {
    if (!role) {
      console.error("No role to delete");
      return;
    }

    // API call to send the deletion event
    try {
      const response = await fetch("/api/roles", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          eventType: "role.deleted",
        }),
      });

      if (response.ok) {
        console.log("Role deleted successfully.");
        setRole(""); // Clear the role after deletion
      } else {
        console.error("Failed to delete role:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  return (
    <div className="mt-3">
      <Select onValueChange={handleRoleChange}>
        <SelectTrigger
          className={`${poppins.className} w-[492px] h-[47px] border-2 mt-3 rounded-lg border-black bg-white pb-2 text-sm/6 outline-none placeholder:text-black`}
        >
          <SelectValue placeholder="Select Affiliation" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Student">
            Student from Caraga State University
          </SelectItem>
          <SelectItem value="Faculty">
            Faculty from Caraga State University
          </SelectItem>
        </SelectContent>
      </Select>
      {/* Button to trigger role deletion */}
      {role && (
        <button
          onClick={handleRoleDelete}
          className="mt-3 text-red-500 underline"
        >
          Delete Role
        </button>
      )}
      {/* Display the selected role */}
      <p className="mt-2 text-sm text-gray-600">
        {role ? `Selected Role: ${role}` : "No role selected"}
      </p>
    </div>
  );
};

export default AffiliationDropdown;

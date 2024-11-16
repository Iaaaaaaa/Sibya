"use client";

import React, { useState } from "react";
import { Poppins } from "next/font/google";
import * as Clerk from "@clerk/elements/common";
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
  return (
    <div className="mt-3">
      <Select>
        <Clerk.Input type="select">
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
        </Clerk.Input>
      </Select>
    </div>
  );
};

export default AffiliationDropdown;

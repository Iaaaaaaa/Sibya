"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import Link from "next/link";

const montserrat = Montserrat({
  weight: "700",
  subsets: ["latin"],
});

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 z-50 flex items-center w-full border-b px-16 py-5 text-xl font-bold text-green-700 bg-white shadow-[0px_4px_15px_rgba(0,0,0,0.25)] max-md:px-5">
      <div className="flex items-center flex-grow">
        <Link href={"/"}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/7b968fd9fa90a0ae388b8a5ca40687a68a5fe2c88ee455a0787e7824dd954cb6?apiKey=69d26e7d3134467f9c216eb5f38b89f7&"
            alt="Logo"
            className="object-contain shrink-0 aspect-square w-[52px]"
          />
        </Link>
        <div className="ml-4">
          <div
            className={`${montserrat.className} text-sm font-bold text-[#259026]`}
          >
            SIBYA
          </div>
        </div>
      </div>

      {/* UserButton - Hidden by default, shown on small screens */}
      <div className="hidden ml-4 max-md:block">
        <UserButton />
      </div>
    </header>
  );
};

export default Header;

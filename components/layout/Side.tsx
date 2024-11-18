"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-[18%] h-screen bg-white shadow-md flex-shrink-0">
      <nav className="p-4">
        {/* User Button */}
        <div className="flex justify-center pb-5 mt-32 mb-4 border-b">
          <UserButton />
        </div>

        <ul className="flex flex-col h-full gap-4 ">
          {/* News Feed Button */}
          <li>
            <button className="flex justify-center w-full p-3 text-gray-700 rounded hover:bg-[#CCECCC] focus:outline-none">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/1cf0f32e184318d171aa267e2584cde40e92d4cbce73bfd82cc19ea5f49841c3?apiKey=69d26e7d3134467f9c216eb5f38b89f7&"
                alt="News Feed"
                className="w-6 h-6 mr-3"
              />
              <span className="text-black">News Feed</span>
            </button>
          </li>

          {/* Website Button */}
          <li>
            <button className="flex justify-center w-full p-3 text-gray-700 rounded hover:bg-[#CCECCC] focus:outline-none">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/01e338e68bb9f5a7ed94f1b4a9a40274d348a6046ae9677c4a55fcf110d1bb99?apiKey=69d26e7d3134467f9c216eb5f38b89f7&"
                alt="Website"
                className="w-6 h-6 mr-3"
              />
              <span className="text-black">Website</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

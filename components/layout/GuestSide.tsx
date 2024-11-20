"use client";

import React from "react";
import Link from "next/link";

export default function GuestSide() {
  return (
    <aside className="hidden lg:block w-[18%] h-screen bg-white shadow-md flex-shrink-0">
      <nav className="p-4">
        {/* Guest User Button */}
        <div className="flex justify-center pb-5 mt-32 mb-4 border-b">
          <div className="flex items-center justify-center w-8 h-8 mr-2 bg-gray-300 rounded-full">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span>Guest</span>
        </div>

        <ul className="flex flex-col h-full gap-4 ">
          {/* News Feed Button */}
          <li>
            <button className="flex justify-center w-full p-3 text-gray-700 rounded hover:bg-[#CCECCC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
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
            <button className="flex justify-center w-full p-3 text-gray-700 rounded hover:bg-[#CCECCC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/01e338e68bb9f5a7ed94f1b4a9a40274d348a6046ae9677c4a55fcf110d1bb99?apiKey=69d26e7d3134467f9c216eb5f38b89f7&"
                alt="Website"
                className="w-6 h-6 mr-3"
              />
              <span className="text-black">Website</span>
            </button>
          </li>
          <li>
            <Link
              href="sign-in"
              className="flex justify-center w-full p-3 text-gray-700 rounded hover:bg-[#CCECCC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

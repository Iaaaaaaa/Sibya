"use client";

import React from "react";
import SearchBar from "./SearchBar";
import FeedItem from "./FeedItem";

const MainContent: React.FC = () => {
  return (
    <main className="flex flex-col ml-5 w-[43%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col w-full mt-24 max-md:mt-10 max-md:max-w-full">
        <SearchBar />
        <h1 className="self-start mt-20 text-3xl font-extrabold leading-none text-lime-950 max-md:mt-10">
          Feed
        </h1>
        <FeedItem />
        <div className="flex flex-col px-7 pt-9 mt-7 bg-white rounded-xl shadow-[0px_4px_15px_rgba(0,0,0,0.1)] max-md:px-5 max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/c62b02c42f7154e78beccf5a6619bd506b35f9172018206688e3729cb94fd0e6?apiKey=69d26e7d3134467f9c216eb5f38b89f7&"
            alt=""
            className="object-contain aspect-[8.2] w-[509px] max-md:max-w-full"
          />
        </div>
      </div>
    </main>
  );
};

export default MainContent;

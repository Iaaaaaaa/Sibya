import React from "react";

const FeedItem: React.FC = () => {
  return (
    <article className="flex flex-col items-start px-7 py-8 mt-8 font-medium bg-white rounded-xl shadow-[0px_4px_15px_rgba(0,0,0,0.1)] max-md:px-5 max-md:max-w-full">
      <div className="flex relative flex-col items-start self-stretch px-12 pt-10 pb-96 text-xs text-green-500 min-h-[462px] max-md:px-5 max-md:pb-24 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/c18aae915cb9a7a7868e1164f70688a1edf0ebf8076f29cf463407d933cdfd77?apiKey=69d26e7d3134467f9c216eb5f38b89f7&"
          alt="Event image"
          className="absolute inset-0 object-cover size-full"
        />
        <div className="relative px-0.5 py-1.5 mb-0 max-w-full bg-white w-[159px] max-md:pr-5 max-md:mb-2.5">
          Just now
        </div>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/b16cd341af417ddac6dabec07e0e75b53552b1a581d88afe1378016677d5695c?apiKey=69d26e7d3134467f9c216eb5f38b89f7&"
        alt="Event rating"
        className="object-contain mt-1.5 w-24 aspect-[3.1]"
      />
      <div className="mt-4 text-xs text-black">
        Marjorie Polistico and 897+ others are attending
      </div>
    </article>
  );
};

export default FeedItem;

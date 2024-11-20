import React from "react";

const SearchBar: React.FC = () => {
  return (
    <div className="flex gap-3.5 self-end text-base font-medium leading-none text-black max-md:mr-2.5">
      <div className="flex flex-auto gap-3.5 px-4 py-3.5 bg-neutral-200 rounded-[38px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/b7c5e1ad1816e4cb07db3bd890c93c5ed74cf9006a980623bef3a22084f2e044?apiKey=69d26e7d3134467f9c216eb5f38b89f7&"
          alt=""
          className="object-contain shrink-0 aspect-square w-[17px]"
        />
        <input
          type="text"
          placeholder="Search for events"
          className="flex-auto my-auto bg-transparent outline-none"
        />
      </div>
      <button aria-label="Additional options">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/d5f4e6ac36b52031ed389886dd229d5162f220b1f39e30447401767be1931bd2?apiKey=69d26e7d3134467f9c216eb5f38b89f7&"
          alt=""
          className="object-contain w-6 my-auto shrink-0 aspect-square"
        />
      </button>
    </div>
  );
};

export default SearchBar;

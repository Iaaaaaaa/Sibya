import React from "react";
import Image from "next/image";
import logo from "../../../../public/assets/csulogo.png";

function Logo() {
  return (
    <Image
      loading="lazy"
      src={logo} // Directly reference from public
      alt="Caraga State University Logo"
      className="object-contain max-w-full aspect-square w-[126px]"
    />
  );
}

export default Logo;

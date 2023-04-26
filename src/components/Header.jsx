import React from "react";
import linkedLogo from "../assets/linkedin-logo.png";

const Header = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center w-[80%] mt-2">
        <img src={linkedLogo} alt="logo" className="h-[50px] pl-6 " />
        <div className="flex gap-20 items-center ">
          <h2 className="cursor-pointer p-2 hover:bg-[#bed4ea] rounded-full">
            Join Now
          </h2>
          <h2 className="text-[#004182] py-3  rounded-full px-6 hover:bg-[#bed4ea] outline outline-1">
            Sign in
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Header;

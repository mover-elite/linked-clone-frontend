import React from "react";
import Image from "./Image";

import linkedLogo from "../assets/home-logo.png";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineUserSwitch,
} from "react-icons/ai";

const HomeHeader = ({ user }) => {
  return (
    <div className="flex justify-between  mx-[100px] items-center  mt-2">
      <div className="flex gap-5 items-center">
        <img src={linkedLogo} alt="logo" className="h-[50px] pl-6 " />
        <AiOutlineSearch
          size={20}
          className="mr-[-40px] text-[#707070] z-10 bg-none"
        />
        <input
          type="text"
          className="h-10 w-[300px] bg-none pl-6 focus:w-[400px] bg-black bg-opacity-5 rounded-md transition-all duration-300"
          placeholder="Search User"
        />
      </div>
      <div className="flex gap-20 items-center ">
        <AiOutlineHome size={30} />
        <AiOutlineUserSwitch size={30} />
      </div>
      <Image src={"https://source.unsplash.com/BP3EU4nq_ao/"} />
    </div>
  );
};

export default HomeHeader;

import React from "react";
import linkedLogo from "../assets/linkedin-logo.png";

const RegisterComponent = () => {
  return (
    <div className="font-system-ui font-semibold text-[16px] leading-[24px] text-black text-opacity-70 h-[100vh]">
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

      <div className="flex flex-col justify-center items-center ">
        <h2 className="mt-[90px] leading-[48px] text-[32px] font-[500px]">
          Register
        </h2>
        <div className="flex flex-col">
          <label htmlFor="email" className="font-semibold pt-3">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="outline outline-2 p-2 my-2 hover:bg-black hover:bg-opacity-10"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="outline outline-2 font-semibold p-2 my-2 hover:bg-black hover:bg-opacity-10"
          />
          <button className="w-[100%] bg-[#004182] self-center py-2 rounded-lg text-white hover:bg-opacity-80">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;

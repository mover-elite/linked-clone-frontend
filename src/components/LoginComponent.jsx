import { useState } from "react";
import linkedLogo from "../assets/linkedin-logo.png";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!(email && password)) {
      toast.error("Input Email and password");
      return;
    }
    const formdata = { username: email, password };
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        qs.stringify(formdata),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      let accessToken = res.data.access_token;
      localStorage.setItem("access_token", accessToken);
      navigator("/");
    } catch (e) {
      toast.error(e.response.data.detail);
    }
  };

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
          Sign In
        </h2>
        <div className="flex flex-col">
          <label htmlFor="email" className="font-semibold pt-3">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline outline-2 p-2 my-2 hover:bg-black hover:bg-opacity-10"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline outline-2 font-semibold p-2 my-2 hover:bg-black hover:bg-opacity-10"
          />
          <button
            className="w-[100%] bg-[#004182] self-center py-2 rounded-lg text-white hover:bg-opacity-80"
            onClick={() => handleLogin()}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;

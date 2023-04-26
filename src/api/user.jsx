import axios from "axios";
import { BASE_URL } from "../config";

export const getUser = async () => {
  const access_token = localStorage.getItem("access_token");
  console.log(access_token);
  try {
    const res = await axios.get(`${BASE_URL}/auth/user/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (e) {
    return null;
  }
};

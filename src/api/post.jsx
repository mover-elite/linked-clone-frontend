import { BASE_URL } from "../config";
import axios from "axios";

export const getPosts = async () => {
  const access_token = localStorage.getItem("access_token");

  try {
    const res = await axios.get(`${BASE_URL}/post/posts`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const commentOnPost = async (postId, comment) => {
  const access_token = localStorage.getItem("access_token");
  console.log(postId);
  console.log(comment);
  try {
    const res = await axios.post(
      `${BASE_URL}/post/comment`,
      {
        post_id: postId,
        content: comment,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const likePost = async (post_id) => {
  console.log(post_id);
  const access_token = localStorage.getItem("access_token");
  try {
    const res = await axios.get(
      `${BASE_URL}/post/like/${post_id}`,

      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getPostInfo = async (post_id) => {
  if (!post_id) return;
  const access_token = localStorage.getItem("access_token");
  try {
    const res = await axios.get(
      `${BASE_URL}/post/${post_id}`,

      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
  console.log(post_id);
};

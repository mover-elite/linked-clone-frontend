import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

const PostModal = ({ isOpen, setIsOpen, user }) => {
  const [post, setPost] = useState("");

  const handlePost = async () => {
    const access_token = localStorage.getItem("access_token");
    if (post.length < 20) {
      toast.error("Make sure your post is at least 10 characters");
      return;
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/post/new`,
        {
          content: post,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      title="Create a post"
      centered
      open={isOpen}
      onCancel={() => {
        setPost("");
        setIsOpen(false);
      }}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            handlePost();
          }}
        >
          Post
        </Button>,
      ]}
    >
      <div className="flex flex-col justify-center items-center ">
        <ReactQuill
          theme="snow"
          value={post}
          placeholder="Share Something Useful.."
          onChange={(e) => {
            setPost(e);
          }}
        />
      </div>
    </Modal>
  );
};

export default PostModal;

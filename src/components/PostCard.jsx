import { useEffect, useState } from "react";
import Image from "./Image";
import CommentBox from "./CommentBox";

import { BsHandThumbsUp, BsFillHandThumbsUpFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { commentOnPost, likePost } from "../api/post";
import { getPostInfo } from "../api/post";

const PostCard = ({ post, user }) => {
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);

  const commentPost = async () => {
    await commentOnPost(post?._id, comment);
    setComment("");
  };

  useEffect(() => {
    async function getPostData() {
      let data = await getPostInfo(post?._id);
      setLikes(data.likes);
      setComments(data.comments);
    }
    getPostData();
  }, [post, user?.id]);

  useEffect(() => {
    const userLiked = likes.some((like) => like.user_id == user._id);
    setLiked(userLiked);
  }, [likes, user._id]);

  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:8000/subscribe/${post?._id}`
    );
    eventSource.addEventListener("message", (event) => {
      // console.log(event.data);
      const data = JSON.parse(event.data);
      let eventData = JSON.parse(data.data);
      console.log(eventData.entity);
      if (eventData.entity == "like") {
        if (eventData.action == "add") {
          setLikes((likes) => [
            ...likes,
            { entity_id: post._id, user_id: eventData.user_id },
          ]);
        } else {
          setLikes((likes) =>
            likes.filter((like) => like.user_id !== eventData.user_id)
          );
        }
      } else if (eventData.entity == "comment") {
        setComments((comments) => [...comments, eventData.data]);
      }
    });

    return () => {
      eventSource.close();
    };
  }, [post?._id]);

  return (
    <div className="h-90 w-full bg-white mt-6 rounded-lg p-2">
      {/* Header */}
      <div className="flex justify-between  w-[90%]">
        <div className="flex gap-5 items-center">
          <Image src={"https://source.unsplash.com/BP3EU4nq_ao/"} />

          <div>
            <h2 className="text-[14px] leading-[20px]  font-bold hover:text-[#0a66c2] hover:underline">
              {post.user_name}
            </h2>
            <h5 className="text-[12px] leading-[16px] text-white-600">
              {post.user_username}
            </h5>
            <h6 className="text-[12px] leading-[16px] text-white-600">1d</h6>
          </div>
        </div>

        <button className="font-bold leading-[20px] text-[16px] hover:bg-[#5a85af] h-fit p-4 py-1 rounded-md">
          Follow
        </button>
      </div>
      <div className="m-3 text-[14px] leading-[20px] font-normal">
        {/* Content */}
        {post.content}
      </div>

      <div className="flex justify-between mx-2">
        <h6>{likes.length} people like this post</h6>
        <h6>{comments.length} comments</h6>
      </div>
      <hr />
      <div className="pt-1 mx-2 text-[14px] leading-[28px] flex font-semibold py-2">
        <button
          className="py-2 flex justify-center w-[50%] rounded-sm items-center  hover:bg-opacity-20 hover:bg-black"
          onClick={() => likePost(post?._id)}
        >
          <span className="pr-2">
            {liked ? <BsFillHandThumbsUpFill /> : <BsHandThumbsUp />}
          </span>{" "}
          Like
        </button>

        <label className="w-[50%]" htmlFor="add-comment">
          <button className="py-2 w-full flex justify-center rounded-sm items-center hover:bg-opacity-20 hover:bg-black">
            <AiOutlineComment size={30} color={"#0a66c2"} /> Comment
          </button>
        </label>
      </div>
      <div className="flex px-4">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          id="add-comment"
          placeholder="Add a comment"
          type="text"
          className="w-[90%] py-2 rounded-lg pl-2 h-fit border-2"
        />
        <button
          className="py-2 px-4 bg-[#0a66c2] text-white rounded-2xl font-bold ml-2 "
          disabled={comment.length < 4}
          onClick={() => commentPost()}
        >
          Comment
        </button>
      </div>
      <h2 className="pt-4 font-bold ">Comments</h2>
      {comments.map((comment) => {
        return <CommentBox key={comment._id} comment={comment} />;
      })}

      {/* <CommentBox /> */}
    </div>
  );
};

export default PostCard;

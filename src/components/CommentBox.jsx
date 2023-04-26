// import React from "react";

const CommentBox = ({ comment }) => {
  return (
    <div className="mt-2 bg-black bg-opacity-5  m-auto rounded-md p-2">
      <div className="flex justify-between">
        <h2 className="font-bold">{comment.user_name}</h2>
      </div>
      <h3>{comment.content}</h3>
    </div>
  );
};

export default CommentBox;

import { format } from "timeago.js";
import React from "react";
import { Link } from "react-router-dom";
import ViewAllComment from "./ViewAllComment";

const PostComment = ({ post }) => {
  return (
    <>
      <ViewAllComment post={post}></ViewAllComment>

      <div className="">
        {post.comments.length > 0 &&
          post.comments
            .slice(post.comments.length - 2, post.comments.length)
            .reverse()
            .map((comment, index) => {
              return (
                !post.hideComment && (
                  <div key={index} className="flex items-center gap-x-1">
                    <Link
                      to={`/${comment.user?._id}`}
                      className="font-normal text-slate-600 text-[14px] dark:text-white"
                    >
                      {comment?.user?.fullname}
                    </Link>
                    <p className="font-normal text-[13px]">{comment.content}</p>

                    {/* <ItemComment shortView comment={comment}></ItemComment> */}
                  </div>
                )
              );
            })}
      </div>

      <div>
        <p className="text-slate-400 text-[9px] p-1 uppercase ">
          {format(post.createdAt)}
        </p>
      </div>
    </>
  );
};

export default PostComment;

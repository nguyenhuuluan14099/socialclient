import axios from "axios";
import { format } from "timeago.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

const PostComment = ({ post }) => {
  const [commentList, setCommentList] = useState([]);
  const { isComment } = useSelector((state) => state.global);
  useEffect(() => {
    async function getComments() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/comments/${post._id}`
        );
        setCommentList(res.data.reverse());
      } catch (error) {
        console.log(error);
      }
    }
    getComments();
  }, [post._id, isComment]);
  return (
    <>
      {commentList.length > 1 && !post.hideComment && (
        <div className="cursor-pointer ">
          <Link
            to={`/post/${post._id}`}
            className="text-slate-400 hover:text-slate-600 text-[14px]  transition-all"
          >
            {`View all ${commentList.length} comments`}
          </Link>
        </div>
      )}
      <div className="here">
        {commentList.length > 0 &&
          commentList
            .slice(0, 2)
            .reverse()
            .map(
              (comment) =>
                !post.hideComment && (
                  <div
                    key={v4()}
                    className="flex items-center text-[14px] gap-x-1"
                  >
                    <Link
                      to={`/${comment?.user.username}`}
                      className="font-semibold text-slate-600 dark:text-white"
                    >
                      {comment?.user.username}
                    </Link>
                    <p>{comment?.content}</p>

                    {/* <ItemComment
                          shortDesc
                          commentData={comment}
                        ></ItemComment> */}
                  </div>
                )
            )}
      </div>
      <div>
        <p className="text-slate-400 text-[9px] uppercase ">
          {format(post.createdAt)}
        </p>
      </div>
    </>
  );
};

export default PostComment;

import React, { useEffect, useState } from "react";
import ItemComment from "./ItemComment";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import Loading from "components/loading/Loading";
import SendComment from "./SendComment";

const CommentBlock = ({ post, dataPostProfile }) => {
  const [comments, setComments] = useState([]);
  const [replyCmt, setReplyCmt] = useState([]);
  const { posts } = useSelector((state) => state);

  //get comments
  useEffect(() => {
    if (post.comments) {
      const cmt = post.comments.filter((cmt) => cmt.reply.length === 0);
      setComments(cmt.reverse());
      const replyCmt = post.comments.filter((cmt) => cmt.reply.length > 0);
      setReplyCmt(replyCmt.reverse());
    }
  }, [post.comments]);

  return (
    <>
      {posts.loading && <Loading></Loading>}
      {!posts.loading && post.hideComment === false && (
        <>
          {comments &&
            comments.map((comment, index) => (
              <div key={index}>
                <ItemComment
                  comment={comment}
                  cmtReply={replyCmt}
                  post={post}
                ></ItemComment>
              </div>
            ))}
          <div className="block laptop:hidden absolute bottom-5 w-full left-0">
            {post.hideComment === false && (
              <SendComment
                dataPostProfile={dataPostProfile}
                post={post}
              ></SendComment>
            )}
          </div>
        </>
      )}
      <>
        {!posts.loading && post.hideComment && (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl font-semibold text-slate-400">
              This creator have been turn off comment.
            </p>
          </div>
        )}
      </>
    </>
  );
};

export default CommentBlock;

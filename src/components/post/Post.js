import React from "react";

import SendComment from "components/comment/SendComment";

import ImageLazy from "components/image/ImageLazy";
import PostInfo from "./postDetail/PostInfo";
import PostLike from "./postDetail/PostLike";
import PostSave from "./postDetail/PostSave";
import PostDescView from "./postDetail/PostDescView";
import PostComment from "./postDetail/PostComment";
const Post = ({ post, socket }) => {
  const user = post.user;
  if (!user) return;
  // console.log("re-renderPost");
  return (
    <>
      <div className="post border max-w-full w-[450px] md:w-[600px] dark:bg-black flex flex-col border-slate-300 dark:border-[#363636] rounded-lg my-4">
        {/* here */}
        <PostInfo
          user={user}
          postLocation={post.location}
          isAdmin={user.isAdmin}
          post={post}
        ></PostInfo>
        <div className="imagePost w-full h-full ">
          <ImageLazy
            height="h-full"
            width="w-full"
            className="w-full imagePost max-h-[600px] object-cover"
            url={post?.img.url || post?.img}
          ></ImageLazy>
        </div>

        <div className="p-3 flex flex-col gap-y-1">
          <div className="flex  justify-between  ">
            {/* like block */}
            <PostLike socket={socket} post={post} user={user}></PostLike>
            {/* save */}
            <PostSave post={post}></PostSave>
          </div>

          {/* more */}
          <PostDescView
            username={post.username}
            postDesc={post.desc}
          ></PostDescView>
          {/* comment block */}
          <PostComment post={post}></PostComment>
        </div>
        {!post.hideComment && (
          <SendComment
            socket={socket}
            receiverName={user}
            post={post}
          ></SendComment>
        )}
      </div>
    </>
  );
};

export default Post;

import ModalBase from "components/modal/ModalBase";
import DetailPostModalContent from "components/modal/ModalContent/DetailPostModalContent";
import React, { useState } from "react";
import IconHeart from "components/icons/IconHeart";
import { Link } from "react-router-dom";
import IconCommentFill from "components/icons/IconCommentFill";

const ItemPost = ({ post, isPostPage = false }) => {
  const [show, setShow] = useState(false);
  const handleShowPost = () => {
    if (isPostPage) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }
    setShow(true);
  };

  return (
    <>
      <div className="w-full max-w-[300px]  h-[120px] tablet:h-[200px]  laptop:h-[250px] relative group">
        <img
          width="100%"
          height="100%"
          className="w-full top-0 h-[120px] tablet:h-[200px]  laptop:h-[250px] object-cover z-5 absolute"
          src={
            post?.img[0]?.imageUrl || "https://i.ibb.co/1dSwFqY/download-1.png"
          }
          alt="image1"
        />

        <Link
          to={isPostPage ? `/post/${post._id}` : ``}
          className="absolute inset-0 flex items-center justify-center  overlay  bg-black invisible bg-opacity-20  group-hover:visible   transition duration-75 cursor-pointer"
          onClick={handleShowPost}
        >
          <div className="flex items-center gap-x-7 text-white">
            <div className="flex items-center gap-x-1">
              <p>
                <IconHeart className="!w-6 !h-6"></IconHeart>
              </p>
              <p className="font-semibold">{post?.likes.length}</p>
            </div>
            <div className="flex items-center gap-x-1">
              <p>
                <IconCommentFill></IconCommentFill>
              </p>
              <p className="font-semibold">{post?.comments.length}</p>
            </div>
          </div>
        </Link>
        {show && (
          <ModalBase
            visible={show}
            type="detailPost"
            onClose={() => setShow(false)}
          >
            <div className="mt-0 h-full">
              <DetailPostModalContent
                onClose={() => setShow(false)}
                dataPostProfile={post}
                morePost
              ></DetailPostModalContent>
            </div>
          </ModalBase>
        )}
      </div>
    </>
  );
};

export default ItemPost;

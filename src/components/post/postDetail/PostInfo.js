import { useAuth } from "components/context/Auth-Context";
import IconAdmin from "components/icons/IconAdmin";
import IconBtnDots from "components/icons/IconBtnDots";
import ImageLazy from "components/image/ImageLazy";
import ModalBase from "components/modal/ModalBase";
import PostModalContent from "components/modal/ModalContent/PostModalContent";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostInfo = ({ user, isAdmin = false, postLocation = "", post }) => {
  const { user: currentUser } = useAuth();
  const onClickShowModal = () => {
    setShowModal(true);
  };
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showModal]);
  // console.log("post", post);
  return (
    <div className="flex items-center justify-between p-3 dark:bg-black rounded-t-lg">
      <Link
        to={`/${user.username}`}
        className="flex items-center gap-x-3 cursor-pointer"
      >
        <ImageLazy
          className="object-cover h-[35px] w-[35px] rounded-full  border-[2px] border-orange-600"
          url={
            user?.profilePicture?.thumb ||
            "https://i.ibb.co/1dSwFqY/download-1.png"
          }
        ></ImageLazy>
        <div className="flex flex-col">
          <div className="text-slate-700 text-[14px] flex items-center gap-x-1  font-semibold dark:text-white">
            {user.username}

            {isAdmin && <IconAdmin></IconAdmin>}
          </div>
          <p className="text-[13px] text-slate-700 italic dark:text-white">
            {postLocation}
          </p>
        </div>
      </Link>
      <div
        className="p-2 cursor-pointer btnDots dark:text-white"
        onClick={onClickShowModal}
      >
        <IconBtnDots></IconBtnDots>
      </div>

      {showModal && (
        <ModalBase
          animationRoot="primary"
          visible={showModal}
          onClose={() => setShowModal(false)}
        >
          <PostModalContent
            postId={post?._id}
            userId={post?.userId}
            currentUserId={currentUser._id}
            onClose={() => setShowModal(false)}
          ></PostModalContent>
        </ModalBase>
      )}
    </div>
  );
};

export default PostInfo;

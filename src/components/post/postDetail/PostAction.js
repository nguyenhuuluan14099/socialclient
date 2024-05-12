import IconBtnDots from "components/icons/IconBtnDots";
import ModalBase from "components/modal/ModalBase";
import PostModalContent from "components/modal/ModalContent/PostModalContent";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PostAction = ({ user, post }) => {
  const { auth } = useSelector((state) => state);
  const { slug } = useParams();
  const onClickShowModal = () => {
    setShowModal(true);
  };
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className={`p-2 cursor-pointer btnDots dark:text-white ${
          slug ? "hidden" : "block"
        }`}
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
            currentUserId={auth.user._id}
            onClose={() => setShowModal(false)}
          ></PostModalContent>
        </ModalBase>
      )}
    </>
  );
};

export default PostAction;

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModalBase from "../ModalBase";
import EditModalContent from "./EditModalContent";
import { deletePost } from "components/redux/actions/postAction";

const PostModalContent = ({ onClose = () => {}, ...rest }) => {
  const { userId, currentUserId, postId } = rest;
  const [demoHide, setDemoHide] = useState(false);
  const [permission, setPermission] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [modalValid, setModalValid] = useState(false);
  const { socket, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const cancelRef = useRef();

  const handleDeletePost = async () => {
    dispatch(deletePost({ postId, socket, token: auth.token }));
  };

  let style = `last:border-none last:rounded-lg first:rounded-lg text-[15px] active:bg-slate-200 transition-all  border-transparent border border-b-gray-300 ]`;

  // useEffect(() => {
  //   if (showModalEdit) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "visible";
  //   }
  // }, [showModalEdit]);
  return (
    <div className="text-center cursor-pointer w-full laptop:w-full">
      {userId === currentUserId ? (
        <>
          <div
            onClick={() => setModalValid(true)}
            className={`${style} text-red-500 font-bold cursor-pointer`}
          >
            <p className="py-3">Delete</p>
          </div>
          <div
            onClick={() => setShowModalEdit(true)}
            className={`${style} text-slate-600 dark:text-white`}
          >
            <p className="py-3">Edit</p>
          </div>
        </>
      ) : (
        <>{/* update later */}</>
      )}

      <Link to={`/post/${postId}`}>
        <div
          className={` text-slate-600 border border-transparent dark:text-white  border-b-slate-300 dark:border-[#262626`}
        >
          <p className="py-3">Go to post</p>
        </div>
      </Link>
      <div
        ref={cancelRef}
        onClick={onClose}
        className={`${style} text-slate-600 dark:text-white border border-t-slate-300`}
      >
        <p className="py-3">Cancel</p>
      </div>

      {showModalEdit && (
        <ModalBase
          type="share"
          visible={showModalEdit}
          onClose={() => setShowModalEdit(false)}
        >
          <EditModalContent
            onClose={() => setShowModalEdit(false)}
            hideModalEdit={onClose}
            showModal={showModalEdit}
            postId={postId}
          ></EditModalContent>
        </ModalBase>
      )}
      {modalValid && (
        <ModalBase visible={modalValid} onClose={() => setModalValid(false)}>
          <div className="flex flex-col items-center w-full text-center">
            <p className="w-full p-3 text-lg font-bold border border-transparent border-b-slate-300">
              Confirm delete post?
            </p>
            <p
              onClick={handleDeletePost}
              className="w-full p-3 font-semibold text-red-500 border border-transparent cursor-pointer border-b-slate-300"
            >
              Delete
            </p>
            <p
              onClick={() => setModalValid(false)}
              className="w-full p-3 cursor-pointer"
            >
              Cancel
            </p>
          </div>
        </ModalBase>
      )}
    </div>
  );
};

export default PostModalContent;

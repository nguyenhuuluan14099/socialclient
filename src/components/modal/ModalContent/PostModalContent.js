import axios from "axios";
import { setIsReload } from "components/redux/globalSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ModalBase from "../ModalBase";
import EditModalContent from "./EditModalContent";

const PostModalContent = ({ onClose = () => {}, ...rest }) => {
  const { userId, currentUserId, postId } = rest;
  // console.log("postId", postId);
  // console.log("userId", userId);
  const [demoHide, setDemoHide] = useState(false);
  const [permission, setPermission] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [modalValid, setModalValid] = useState(false);

  const dispatch = useDispatch();
  const handleClick = () => {
    onClose();
    // dispatch(toggleUpdate(!isUpdate));
  };

  const cancelRef = useRef();
  const hideModalEdit = () => {
    setTimeout(() => {
      setShowModalEdit(false);
      setDemoHide(true);
    }, 500);
  };
  useEffect(() => {
    if (userId === currentUserId) {
      setPermission(true);
    } else {
      setPermission(false);
    }
    if (demoHide) {
      cancelRef.current.click();
    }
  }, [currentUserId, userId, demoHide]);

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts/${postId}`);
      toast.success("Delete post successfully!");
      setModalValid(false);
      dispatch(setIsReload(true));
    } catch (error) {
      console.log(error);
    }
  };

  let style = `last:border-none last:rounded-lg first:rounded-lg text-[15px] active:bg-slate-200 transition-all  border-transparent border border-b-gray-300 ]`;

  useEffect(() => {
    if (showModalEdit) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showModalEdit]);
  return (
    <div className="text-center cursor-pointer ">
      {permission ? (
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
        onClick={handleClick}
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
            hideModalEdit={hideModalEdit}
            showModal={showModalEdit}
            postId={postId}
          ></EditModalContent>
        </ModalBase>
      )}
      {modalValid && (
        <ModalBase visible={modalValid} onClose={() => setModalValid(false)}>
          <div className="flex items-center text-center flex-col w-full">
            <p className="p-3 border w-full  border-transparent border-b-slate-300 text-lg font-bold">
              Confirm delete post?
            </p>
            <p
              onClick={handleDeletePost}
              className="p-3  w-full  border cursor-pointer border-transparent border-b-slate-300 text-red-500 font-semibold"
            >
              Delete
            </p>
            <p
              onClick={() => setModalValid(false)}
              className="p-3 w-full   cursor-pointer"
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

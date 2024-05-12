import IconBtnDots from "components/icons/IconBtnDots";
import ModalBase from "components/modal/ModalBase";
import { deleteComment } from "components/redux/actions/commentAction";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CommentAction = ({ post, comment }) => {
  const [showValid, setShowValid] = useState(false);
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeleteComment = async () => {
    if (!comment) return;
    dispatch(
      deleteComment({
        post,
        commentId: comment._id,
        comment,
        socket,
        token: auth.token,
      })
    );
    setShowValid(false);
  };
  return (
    <div>
      {(auth.user.isAdmin === true ||
        auth.user?.fullname === comment.user?.fullname) && (
        <p className="cursor-pointer " onClick={() => setShowValid(true)}>
          <IconBtnDots></IconBtnDots>
        </p>
      )}

      {showValid &&
        (auth.user?.fullname === comment.user?.fullname ||
          auth.user.isAdmin) && (
          <ModalBase visible={showValid} onClose={() => setShowValid(false)}>
            <div className="flex flex-col w-full text-center cursor-pointer">
              <p
                onClick={() => handleDeleteComment()}
                className="text-red-500 font-semibold w-full border border-transparent  border-b-[#363636] p-3"
              >
                Delete
              </p>

              <p className="p-3" onClick={() => setShowValid(false)}>
                Cancel
              </p>
            </div>
          </ModalBase>
        )}
    </div>
  );
};

export default CommentAction;

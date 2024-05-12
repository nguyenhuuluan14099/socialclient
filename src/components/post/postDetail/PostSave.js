import IconSave from "components/icons/IconSave";
import IconSaved from "components/icons/IconSaved";
import { savedPost, unSavedPost } from "components/redux/actions/postAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PostSave = ({ post }) => {
  const { auth } = useSelector((state) => state);
  const [saved, setSaved] = useState(false);
  const [savedPosts, setSavedPosts] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [post._id, auth.user.saved]);

  const handleSavedPost = async () => {
    if (savedPosts) return;
    setSavedPosts(true);
    dispatch(savedPost({ post, auth }));
    setSavedPosts(false);
  };

  const handleUnSavedPost = async () => {
    if (savedPosts) return;
    setSavedPosts(true);
    dispatch(unSavedPost({ post, auth }));
    setSavedPosts(false);
  };

  return (
    <div>
      {saved ? (
        <IconSaved
          className="text-blue-600"
          onClick={handleUnSavedPost}
        ></IconSaved>
      ) : (
        <IconSave onClick={handleSavedPost} className=""></IconSave>
      )}
    </div>
  );
};

export default PostSave;

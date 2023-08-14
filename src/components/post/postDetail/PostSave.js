import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import IconSave from "components/icons/IconSave";
import IconSaved from "components/icons/IconSaved";
import React, { useEffect, useState } from "react";

const PostSave = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    setSaved(currentUser?.saved?.includes(post._id));
  }, [currentUser.saved, post._id]);
  const handleSavedPost = async () => {
    try {
      setLoading(true);
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/posts/saved/${post._id}`,
        {
          userId: currentUser._id,
        }
      );

      setSaved(!saved);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading === true && (
        <div className="w-6    h-6   rounded-full  border-blue-500 border-2 border-t-transparent  animate-spin"></div>
      )}
      {!saved && (
        <>
          {loading === false && (
            <IconSaved onClick={handleSavedPost}></IconSaved>
          )}
        </>
      )}
      {saved && (
        <>
          {loading === false && (
            <IconSave
              onClick={handleSavedPost}
              className="dark:text-white"
            ></IconSave>
          )}
        </>
      )}
    </div>
  );
};

export default PostSave;

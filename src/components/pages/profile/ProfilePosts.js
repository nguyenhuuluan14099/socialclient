import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import Loading from "components/loading/Loading";
import ItemPost from "components/post/ItemPost";
import { setIsReload, setShowLoading } from "components/redux/globalSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import NotPost from "./NotPost";

const ProfilePosts = ({ socket }) => {
  const dispatch01 = useDispatch();
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [myUser, setMyUser] = useState([]);
  const { user: currentUser, dispatch } = useAuth();
  const [numberItem, setNumberItem] = useState(6);

  const { isLoading, isUpdate, isReload } = useSelector(
    (state) => state.global
  );
  useEffect(() => {
    async function getPostsOfUser() {
      try {
        dispatch01(setShowLoading(true));
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/posts/profile/` + slug
        );
        dispatch01(setShowLoading(false));
        dispatch01(setIsReload(false));

        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPostsOfUser();
    // here
  }, [dispatch01, isUpdate, slug, isReload]);

  useEffect(() => {
    async function getUser() {
      try {
        const userBig = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users?userId=${currentUser._id}`
        );
        setMyUser(userBig.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [currentUser]);
  const handleLoadMore = () => {
    setNumberItem(numberItem + 6);
  };
  return (
    <>
      {isLoading && (
        <div className="w-full  h-full flex">
          <Loading className="w-[50px] h-[50px] mx-auto"></Loading>
        </div>
      )}

      <div className="content mt-auto outlet  w-full h-full">
        <div className="w-full  flex  my-10  pb-12">
          {!isLoading &&
            posts.length === 0 &&
            (myUser._id !== currentUser._id ? (
              <>
                <NotPost notPhoto></NotPost>
              </>
            ) : (
              <NotPost></NotPost>
            ))}

          <div className="w-full grid grid-cols-3 gap-5 ">
            {posts.length > 0 &&
              posts
                .slice(0, numberItem)
                .map((post) => (
                  <ItemPost
                    key={post._id}
                    socket={socket}
                    post={post}
                  ></ItemPost>
                ))}
            {/* <ItemPost></ItemPost>
            <ItemPost></ItemPost>
            <ItemPost></ItemPost>
            <ItemPost></ItemPost>
            <ItemPost></ItemPost>
            <ItemPost></ItemPost> */}
          </div>
        </div>
        <div className="w-full flex mb-7">
          {posts.length > 6 && numberItem < posts.length && (
            <button
              onClick={handleLoadMore}
              className="p-3 inline-block rounded-lg text-white bg-blue-500 mx-auto "
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePosts;

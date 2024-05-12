import ButtonLoadMore from "components/button/ButtonLoadMore";
import ItemPost from "components/post/ItemPost";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getDataApi } from "utils/fetchData";

const ProfileSaved = ({ socket }) => {
  const [result, setResult] = useState();
  const [savedPosts, setSavedPosts] = useState([]);
  const [page, setPage] = useState(2);
  const [load, setLoad] = useState(false);
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    setLoad(true);
    getDataApi("getSavedPosts", auth.token)
      .then(({ data }) => {
        setSavedPosts(data.savedPosts);
        setResult(data.result);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => setSavedPosts([]);
  }, [auth.token]);

  const handleLoadMore = () => {
    getDataApi(`getSavedPosts?limit=${page * 9}`, auth.token).then(
      ({ data }) => {
        setSavedPosts(data.savedPosts);
        setResult(data.result);
        setPage(page + 1);
        setLoad(false);
      }
    );
  };
  return (
    <div className="">
      {result === 0 && (
        <div className="text-2xl text-slate-600 font-semibold flex h-[300px] justify-center w-full">
          <p className="my-auto ">No post saved</p>
        </div>
      )}
      {load && (
        <img
          src="/logoHome.png"
          className="w-[35px] m-auto  h-[35px] object-cover animate-spin"
          alt="/logoHome.png"
        ></img>
      )}
      <div className=" py-5 grid w-full grid-cols-3 gap-5">
        {result > 0 &&
          savedPosts.map((post) => (
            <ItemPost key={post._id} socket={socket} post={post}></ItemPost>
          ))}
      </div>
      <ButtonLoadMore
        page={page}
        result={result}
        load={load}
        handleLoadMore={handleLoadMore}
      ></ButtonLoadMore>
    </div>
  );
};

export default ProfileSaved;

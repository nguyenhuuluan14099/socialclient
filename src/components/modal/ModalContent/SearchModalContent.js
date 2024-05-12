import FriendItem from "components/friend/FriendItem";
import IconClose from "components/icons/IconClose";
import SuggestFriend from "components/suggestFriend/SuggestFriend";
import { debounce } from "lodash";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDataApi } from "utils/fetchData";

const SearchModalContent = ({ onClose = () => {} }) => {
  const [value, setValue] = useState("");
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  const { loading, auth } = useSelector((state) => state);
  const handleInput = debounce((e) => {
    setValue(e.target.value);
  }, 1000);
  useEffect(() => {
    if (!value) return;
    const newValue = value.toLowerCase().replace(/ /g, "");

    getDataApi(`search?username=${newValue}`, auth.token)
      .then((res) => setUserList(res.data.users))
      .catch((err) => console.log(err));
  }, [value, dispatch, auth.token]);

  return (
    <div className="flex flex-col h-full dark:bg-black dark:text-white">
      <div className="p-5 py-5 h-[150px] shrink-0 justify-between  flex flex-col ">
        <div className="text-[24px] font-bold flex items-center justify-between">
          Search
          <p onClick={onClose}>
            <IconClose></IconClose>
          </p>
        </div>
        <div className="relative">
          <form>
            <input
              onChange={handleInput}
              type="text"
              placeholder="Search"
              className=" w-full  p-2 rounded-lg outline-none bg-[#ccc] bg-opacity-40 "
            ></input>
            <label className="bg-[#ccc] cursor-pointer bg-opacity-80 text-slate-700 absolute right-2 w-[15px] rounded-full  h-[15px] top-3  flex items-center justify-center">
              <p>&times;</p>
              <input type="reset" hidden />
            </label>
          </form>
        </div>
      </div>
      {loading.payload && (
        <div className="w-10 h-10 mx-auto border-4 border-blue-500 rounded-full border-t-transparent animate-spin "></div>
      )}
      {userList.length !== 0 ? (
        <>
          <div className="flex flex-col gap-y-2 p-5 h-[200px] overflow-y-auto">
            {userList.length > 0 &&
              userList.map((user) => (
                <div key={user._id}>
                  <FriendItem info={user.username} story data={user}>
                    View Profile
                  </FriendItem>
                </div>
              ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col h-full p-3 overflow-y-auto gap-y-2">
            <div className="flex items-center justify-between">
              <p>Suggest for you</p>
              <Link className="" to={`/explore/people`}>
                See All
              </Link>
            </div>
            <SuggestFriend totalView={10}></SuggestFriend>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchModalContent;

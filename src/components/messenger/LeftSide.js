import Conversation from "components/conversation/Conversation";
import {
  addUser,
  getConversations,
} from "components/redux/actions/messageAction";
import { MESSAGE_TYPES } from "components/redux/reducer/messageReducer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDataApi } from "utils/fetchData";
import { v4 } from "uuid";

const LeftSide = ({ setMobileShow = () => {}, mobileShow }) => {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);
  const { auth, message, online } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddUser = (user) => {
    setValue("");
    setUsers([]);
    dispatch(addUser({ user, message }));
    setMobileShow(true);
    return navigate(`/messenger/${user._id}`);
  };

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth }));
  }, [auth, dispatch, message.firstLoad]);

  useEffect(() => {
    if (!value) return setUsers([]);
    const newValue = value.toLowerCase().replace(/ /g, "");

    getDataApi(`search?username=${newValue}`, auth.token)
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err));
  }, [value, auth.token]);

  //check online offline
  useEffect(() => {
    if (message.firstLoad) {
      dispatch({ type: MESSAGE_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
    }
  }, [message.firstLoad, online, dispatch]);
  return (
    <div
      className={`${
        mobileShow ? "hidden laptop:block" : "flex-2"
      } laptop:flex-2  h-[700px]`}
    >
      <div
        className={`border border-transparent flex items-center justify-between border-b-slate-300 dark:border-[#262626] py-5 px-3 sticky z-30`}
      >
        <div className="">
          <span className="font-medium text-2xl ">{auth.user.fullname}</span>{" "}
        </div>
        <div className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </div>
      </div>
      <div className={`h-[90%] overflow-y-auto laptop:block `}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Search user..."
          className="p-2 bg-transparent w-full outline-none border-transparent border border-b-slate-300 dark:border-[#262626]"
        />

        {users.length !== 0 ? (
          <>
            {users.map((user) => {
              return (
                <div
                  className={`laptop:block`}
                  key={v4()}
                  onClick={() => {
                    handleAddUser(user);
                  }}
                >
                  <Conversation isListSearch user={user}></Conversation>
                </div>
              );
            })}
          </>
        ) : (
          <>
            {message.users.length > 0 &&
              message.users.map((user) => {
                return (
                  <div
                    onClick={() => {
                      handleAddUser(user);
                    }}
                    className={`laptop:block`}
                    key={v4()}
                  >
                    <Conversation user={user}></Conversation>
                  </div>
                );
              })}
          </>
        )}
      </div>
      {/* {showModal && (
        <ModalBase visible={showModal} onClose={() => setShowModal(false)}>
          
          <div className={`h-[90%] overflow-y-auto xl:block `}>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Search user..."
              className="p-2 bg-transparent w-full outline-none border-transparent border border-b-slate-300 dark:border-[#262626]"
            />

            {users.length !== 0 ? (
              <>
                {users.map((user) => {
                  return (
                    <div
                      className={`xl:block`}
                      key={v4()}
                      onClick={() => {
                        handleAddUser(user);
                      }}
                    >
                      <Conversation isListSearch user={user}></Conversation>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {message.users.length > 0 &&
                  message.users.map((user) => {
                    return (
                      <div
                        onClick={() => {
                          handleAddUser(user);
                        }}
                        className={`xl:block`}
                        key={v4()}
                      >
                        <Conversation user={user}></Conversation>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </ModalBase>
      )} */}
    </div>
  );
};

export default LeftSide;

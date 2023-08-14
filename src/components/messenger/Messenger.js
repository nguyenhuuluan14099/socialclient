/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import React, { useEffect, useRef, useState } from "react";

import Message from "../message/Message";
import { v4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import NotMessenger from "./NotMessenger";
import { useSelector } from "react-redux";

import Header from "components/header/Header";
import SendMessage from "./SendMessage";
import ConversationBlock from "./ConversationBlock";

const Messenger = ({ socketMes }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const scrollRef = useRef();
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [arrivalMessages, setArrivalMessages] = useState(null);

  const socket = useRef();
  const currentMes = useRef();
  const [friendCurrent, setFriendCurrent] = useState({});

  const { reloadMes } = useSelector((state) => state.global);
  const [displayMessage, setDisplayMessage] = useState(false);

  useEffect(() => {
    async function getMessage() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/messages/${currentChat?._id}`
        );

        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMessage();
  }, [currentChat, reloadMes]);

  useEffect(() => {
    arrivalMessages &&
      currentChat?.members.includes(arrivalMessages.sender) &&
      setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages, currentChat]);

  useEffect(() => {
    const node = currentMes.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const friendId = currentChat?.members?.find((m) => m !== user._id);
    // console.log("friendId", friendId);
    if (!friendId) return;
    async function getFriend() {
      try {
        const res = await axios(
          `${process.env.REACT_APP_SERVER_URL}/users?userId=` + friendId
        );
        setFriendCurrent(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getFriend();
  }, [currentChat?.members]);

  // console.log("friendsOnline", friendsOnline);
  console.log("Message Rerender");
  if (!user) return;

  return (
    <div className="my-16 mb-24 xl:mt-2 border border-slate-300 dark:bg-black dark:border-[#262626] rounded-lg w-full pb-10   h-[750px] max-w-[1100px]">
      <Header socket={socketMes}></Header>
      <div className="flex flex-col xl:flex-row ">
        {/* conversations */}
        <ConversationBlock
          setCurrentChat={setCurrentChat}
          socket={socket}
          setDisplayMessage={setDisplayMessage}
          user={user}
          displayMessage={displayMessage}
        ></ConversationBlock>
        <div
          className={`xl:block ${
            displayMessage ? "block" : "hidden"
          } flex-4 h-[680px] w-full  border-transparent border  dark:border-[#262626]  border-x-slate-300`}
        >
          {currentChat && currentChat?.length !== 0 ? (
            <div className="h-[680px] flex flex-col w-full ">
              <div
                ref={currentMes}
                className="h-[600px] w-full overflow-y-scroll relative"
              >
                <div className="border border-transparent w-full  flex items-center justify-between border-b-slate-300 dark:border-[#262626] py-4 px-5 sticky z-10 bg-white dark:bg-black dark:text-white -top-2 left-0">
                  <div className="flex items-center w-full justify-between ">
                    <Link to={`/${friendCurrent.username}`}>
                      <div className="flex gap-x-2 items-center">
                        <img
                          src={
                            friendCurrent?.profilePicture?.thumb ||
                            "https://i.ibb.co/1dSwFqY/download-1.png"
                          }
                          className="w-[30px] h-[30px] object-cover rounded-full"
                          alt=""
                        />
                        <p className="cursor-pointer hover:text-slate-400 transition-0.7s text-[15px] font-semibold">
                          {friendCurrent.username}
                        </p>
                      </div>
                    </Link>
                    <div></div>
                  </div>
                </div>

                {messages?.length > 0 &&
                  messages.map((m) => (
                    <div key={v4()} ref={scrollRef} className="">
                      <Message
                        myUser={user}
                        yourFriend={friendCurrent}
                        message={m}
                        own={m.sender === user._id}
                      ></Message>
                    </div>
                  ))}
              </div>
              <div className=" mt-auto  justify-between mx-3 rounded-[40px] p-3 flex items-center mb-3  gap-x-2  border border-gray-300">
                <SendMessage
                  setArrivalMessages={setArrivalMessages}
                  messages={messages}
                  setMessages={setMessages}
                  friendCurrent={friendCurrent}
                  myUser={user}
                  socketMes={socketMes}
                  socket={socket}
                  currentChat={currentChat}
                  user={user}
                ></SendMessage>
              </div>
            </div>
          ) : (
            <NotMessenger></NotMessenger>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messenger;

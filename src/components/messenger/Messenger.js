/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ChatOnline from "../chatOnline/ChatOnline";
import Conversation from "../conversation/Conversation";
import Message from "../message/Message";
import { io } from "socket.io-client";
import { v4 } from "uuid";
import useSound from "use-sound";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotMessenger from "./NotMessenger";
import { useDispatch, useSelector } from "react-redux";
import soundSend from "components/sounds/soundSend.mp3";
import { setShowLoading } from "components/redux/globalSlice";
import Loading from "components/loading/Loading";
import { toast } from "react-toastify";
import { imageUpload } from "components/image/imageUploadMes";
import Header from "components/header/Header";
const Messenger = ({ socketMes }) => {
  const [show, setShow] = useState(false);
  const inputClickKey = useRef();
  const [textHeight, setTextHeight] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const scrollRef = useRef();
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [conversations, setConversations] = useState([]);
  const socket = useRef();
  const consRef = useRef();
  const currentMes = useRef();
  const [friendCurrent, setFriendCurrent] = useState({});
  const [friendsOnline, setFriendsOnline] = useState([]);
  const [myUser, setMyUser] = useState([]);
  const [currentChatClick, setCurrentChatClick] = useState(null);
  const [reviewImage, setReviewImage] = useState({});
  const [arrImage, setArrImage] = useState({});
  // const [conversationItem, setConversationItem] = useState({});
  const { reloadMes, isLoading, isReload } = useSelector(
    (state) => state.global
  );
  const [slugId, setSlugId] = useState("");
  const [media, setMedia] = useState([]);
  const [displayMessage, setDisplayMessage] = useState(false);
  const dispatch = useDispatch();
  const [friend, setFriend] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [play] = useSound(soundSend, { volume: 0.75 });

  useEffect(() => {
    // console.log(
    //   "here",
    //   conversations.some((cov) => cov._id === currentChatClick._id)
    // );
    // if (currentChatClick?.members.includes(slugId)) {
    //   consRef?.current?.click();
    // }
    // console.log("here", );
    // if () {
    //   consRef?.current.click();
  }, [isReload]);

  // console.log("setValue", setValue);
  // console.log("currentChatClick", currentChatClick);
  useEffect(() => {
    async function getUser() {
      try {
        const userBig = await axios.get(
          `https://serversocial.vercel.app/users?userId=${user._id}`
        );
        setMyUser(userBig.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [user]);
  const handleDisplayMessage = () => {
    setDisplayMessage(false);
  };
  // console.log("displayMessage", displayMessage);

  const slug = useParams();
  useEffect(() => {
    setSlugId(slug["*"]);
    if (slugId) {
      setDisplayMessage(true);
    }
  }, [slug]);

  useEffect(() => {
    const getFriend = async () => {
      try {
        const res = await axios.get(
          `https://serversocial.vercel.app/users/friend/${user._id}`
        );
        setFriend(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriend();
  }, [user._id]);
  useEffect(() => {
    setOnlineFriends(friend.filter((f) => friendsOnline.includes(f._id)));
  }, [friend, friendsOnline]);

  useEffect(() => {
    if (!slugId) return;
    // consRef?.current?.click();

    async function getCons() {
      try {
        const res = await axios.get(
          `https://serversocial.vercel.app/conversations/find/${user?._id}/${slugId}`
        );
        setCurrentChatClick(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCons();
  }, [slugId]);

  // console.log("currentChatClick", currentChatClick);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessages", (data) => {
      setArrivalMessages({
        sender: data.senderId,
        text: data.text,
        imageMes: arrImage,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessages &&
      currentChat?.members.includes(arrivalMessages.sender) &&
      setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users) => {
      // console.log("usersOnline", users);
      setFriendsOnline(
        user.followings.filter((u) => users.some((b) => b.userId === u))
      );
    });
  }, [user]);

  useEffect(() => {
    const node = currentMes.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    async function getConversations() {
      try {
        // dispatch(setShowLoading(true));

        const res = await axios.get(
          "https://serversocial.vercel.app/conversations/" + user._id
        );
        // dispatch(setShowLoading(false));

        setConversations(res.data.reverse());
      } catch (error) {
        console.log(error);
      }
    }
    getConversations();

    // hererekjfhdjsfd
    setCurrentChat(currentChatClick);
  }, [user?._id, currentChatClick, slugId]);
  useEffect(() => {
    consRef?.current?.click();
    setCurrentChat(currentChatClick);

    // if (currentChat?._id === currentChatClick?._id) {
    //   consRef?.current?.click();
    //   console.log("abc");
    // }
  }, [slugId, isReload]);

  useEffect(() => {
    const friendId = currentChat?.members?.find((m) => m !== user._id);
    // console.log("friendId", friendId);
    if (!friendId) return;
    async function getFriend() {
      try {
        const res = await axios(
          "https://serversocial.vercel.app/users?userId=" + friendId
        );
        setFriendCurrent(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getFriend();
  }, [currentChat?.members]);
  const handleChangeBlock = (e) => {
    setNewMessage(e.target.value);

    setTextHeight("");
  };
  useLayoutEffect(() => {
    setTextHeight(`${inputClickKey?.current?.scrollHeight}px`);
    if (inputClickKey?.current?.scrollHeight >= 85) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [newMessage]);

  useEffect(() => {
    async function getMessage() {
      try {
        dispatch(setShowLoading(true));

        const res = await axios.get(
          `https://serversocial.vercel.app/messages/${currentChat?._id}`
        );
        dispatch(setShowLoading(false));

        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMessage();
  }, [currentChat, slugId, reloadMes]);

  if (!user) return navigate("/login");

  const handleSendMessage = async (type) => {
    play();
    let newArr = {};
    if (media.length > 0) newArr = await imageUpload(media);
    setArrImage(newArr);
    // console.log("newArr", newArr);
    const message = {
      conversationId: currentChat._id,
      sender: user._id,
      text: newMessage,
      imageMes: newArr,
    };
    const receiverId = currentChat?.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
      imageMes: newArr,
    });

    try {
      // dispatch(setShowLoading(true));
      const res = await axios.post("https://serversocial.vercel.app/messages/", message);
      // dispatch(setShowLoading(false));

      setMessages([...messages, res.data]);
      setNewMessage("");
      setArrImage({});
      setMedia([]);
    } catch (error) {
      console.log(error);
    }

    const dataNots = {
      senderName: myUser.username,
      receiverName:
        friendCurrent.username === myUser.username
          ? null
          : friendCurrent.username,
      type,
      senderImg: myUser.profilePicture.thumb,
      senderId: myUser._id,
      imageMes: newArr,
    };
    socketMes?.emit("sendNotification", dataNots);
    try {
      await axios.post("https://serversocial.vercel.app/notifications/", dataNots);
      // dispatch(setReloadMes(!reloadMes));
      setReviewImage({});
      setMedia([]);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("currentCHat", currentChat);
  // console.log("friendCurrent", friendCurrent);

  //textarea
  // console.log("currentChat ", currentChat);

  const handleImageMess = (e) => {
    setReviewImage({ [e.target.name]: URL.createObjectURL(e.target.files[0]) });

    const files = [...e.target.files];

    const arrImg = [];
    files.forEach((file) => {
      if (!file) return toast.error("File does not exist.");
      if (file.size > 1024 * 1024 * 5)
        return toast.error("Image/video largest is 5mb.");

      arrImg.push(file);
    });
    setMedia([...media, ...arrImg]);
  };
  // console.log("media", media);
  // console.log("reviewImage", reviewImage);

  const handleDeleteImageReview = () => {
    setMedia([]);
    setReviewImage({});
  };

  // console.log("friendsOnline", friendsOnline);
  return (
    <div className="my-16 mb-24 xl:mt-2 border border-slate-300 dark:bg-black dark:border-[#262626] rounded-lg w-full pb-10   h-[750px] max-w-[1100px]">
      <Header socket={socketMes}></Header>
      <div className="flex flex-col xl:flex-row ">
        <div className="flex-2 ">
          <div className="border border-transparent flex items-center justify-between border-b-slate-300 dark:border-[#262626] py-5 px-3">
            <span
              onClick={handleDisplayMessage}
              className={`cursor-pointer  ${
                displayMessage ? "visible" : "invisible"
              }`}
            >
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
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </span>

            <div className="flex items-center gap-x-2 cursor-pointer">
              <span className="font-semibold ">{myUser.username}</span>{" "}
            </div>
            <div className="cursor-pointer">
              <span>
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
              </span>
            </div>
          </div>
          {/* <input
            placeholder="search your friend..."
            type="text"
            className="p-3 border-b-2 border-slate-300 w-[90%] outline-none"
          /> */}
          {isLoading && (
            <div className="mt-[50px]">
              <Loading className="mt-10"></Loading>
            </div>
          )}
          <div
            className={`h-[600px]  overflow-y-auto xl:block ${
              displayMessage ? "hidden" : ""
            } `}
          >
            {!isLoading &&
              conversations.map((c) => (
                <div
                  ref={consRef}
                  className={`xl:block ${displayMessage ? "hidden" : ""} `}
                  key={v4()}
                  onClick={() => {
                    setCurrentChat(c);
                    setDisplayMessage(true);
                  }}
                >
                  <Conversation
                    onlineFriends={onlineFriends}
                    setSlugId={setSlugId}
                    currentUser={user}
                    conversations={c}
                  ></Conversation>
                </div>
              ))}
          </div>
        </div>
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
                    <div>
                      <span>
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
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                {isLoading && <Loading className="w-[60] h-[60]"></Loading>}
                {!isLoading &&
                  messages?.length > 0 &&
                  messages.map((m) => (
                    <div key={v4()} ref={scrollRef} className="">
                      <Message
                        myUser={myUser}
                        yourFriend={friendCurrent}
                        message={m}
                        own={m.sender === user._id}
                      ></Message>
                    </div>
                  ))}
              </div>
              <div className=" mt-auto  justify-between mx-3 rounded-[40px] p-3 flex items-center mb-3  gap-x-2  border border-gray-300">
                <textarea
                  ref={inputClickKey}
                  onChange={handleChangeBlock}
                  value={newMessage}
                  style={{
                    height: textHeight,
                  }}
                  placeholder="Message"
                  className={`w-full px-2 pt-3 text-[14px] dark:bg-black dark:text-white   h-[40px] max-h-[80px]  outline-none resize-none    b   mx-2 ${
                    show ? "overflow-y-scroll" : "overflow-hidden"
                  }`}
                ></textarea>
                <div className="flex items-center gap-x-2  w-full max-w-[80px] justify-between ">
                  {reviewImage.imageMes && (
                    <div className="imgReview relative flex-1">
                      <img
                        src={reviewImage.imageMes}
                        className="w-[35px] h-[35px] object-cover rounded-xs"
                        alt=""
                      />
                      <p
                        onClick={handleDeleteImageReview}
                        className="absolute cursor-pointer -top-2 -right-2 w-[5px] h-[5px] bg-slate-400  rounded-full flex items-center justify-center p-2 text-white"
                      >
                        &times;
                      </p>
                    </div>
                  )}
                  <label className="cursor-pointer w-[40px] shrink-0 ml-auto">
                    <p>
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
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                    </p>
                    <input
                      type="file"
                      id="file"
                      name="imageMes"
                      hidden
                      multiple
                      accept="image/*,video/*"
                      onChange={handleImageMess}
                    />
                  </label>
                </div>
                {/* <ImageUpload onChange={setValue} name="imageMes"></ImageUpload> */}
                {newMessage || reviewImage.imageMes ? (
                  <>
                    {isLoading ? (
                      <Loading></Loading>
                    ) : (
                      <button
                        onClick={() => handleSendMessage(4)}
                        className={`  p-3 px-2  text-[15px] ${
                          newMessage || reviewImage.imageMes
                            ? "font-semibold text-blue-500"
                            : "text-blue-300"
                        }`}
                      >
                        Send
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <p className="none-focus cursor-pointer px-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <NotMessenger></NotMessenger>
          )}
        </div>
        <div className="flex-1 hidden xl:block  h-[680px]">
          <ChatOnline
            conversations={conversations}
            friendsOnline={friendsOnline}
            currentId={user._id}
            setCurrentChat={setCurrentChat}
          ></ChatOnline>
        </div>
      </div>
    </div>
  );
};

export default Messenger;

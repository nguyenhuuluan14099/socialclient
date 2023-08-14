import axios from "axios";
import Conversation from "components/conversation/Conversation";
import IconBack from "components/icons/IconBack";
import UserLoading from "components/loading/UserLoading";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";

const ConversationBlock = ({
  user,
  //   socket,
  displayMessage,
  setCurrentChat = () => {},
  setDisplayMessage = () => {},
}) => {
  const consRef = useRef();
  const socket = useRef();
  const [conversations, setConversations] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [friend, setFriend] = useState([]);
  const [friendsOnline, setFriendsOnline] = useState([]);
  const [slugId, setSlugId] = useState("");
  const [loading, setLoading] = useState(false);
  const handleDisplayMessage = () => {
    setDisplayMessage(false);
  };
  //get friend
  useEffect(() => {
    const getFriend = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users/friend/${user._id}`
        );
        setFriend(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriend();
  }, [user._id]);
  //get conversation
  useEffect(() => {
    async function getConversations() {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/conversations/` + user._id
        );

        setConversations(res.data.reverse());
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getConversations();
  }, [user?._id]);
  useEffect(() => {
    setOnlineFriends(friend.filter((f) => friendsOnline.includes(f._id)));
  }, [friend, friendsOnline]);

  //
  useEffect(() => {
    socket.current?.emit("addUser", user?._id);
    socket.current?.on("getUsers", (users) => {
      // console.log("usersOnline", users);
      setFriendsOnline(
        user.followings.filter((u) => users.some((b) => b.userId === u))
      );
    });
    return () => {
      //   socket.current.disconnect();
    };
  }, [socket, user]);
  const slug = useParams();
  useEffect(() => {
    setSlugId(slug["*"]);
    if (slugId) {
      setDisplayMessage(true);
    }
  }, [setDisplayMessage, slug, slugId]);

  return (
    <div className="flex-2 ">
      <div className="border border-transparent flex items-center justify-between border-b-slate-300 dark:border-[#262626] py-5 px-3">
        <span
          onClick={handleDisplayMessage}
          className={`cursor-pointer  ${
            displayMessage ? "visible" : "invisible"
          }`}
        >
          <IconBack className="xl:hidden"></IconBack>
        </span>

        <div className="flex items-center gap-x-2 cursor-pointer">
          <span className="font-semibold ">{user.username}</span>{" "}
        </div>
        <div className="cursor-pointer">{/* <IconEdit></IconEdit> */}</div>
      </div>
      {/* <input
            placeholder="search your friend..."
            type="text"
            className="p-3 border-b-2 border-slate-300 w-[90%] outline-none"
          /> */}

      <div
        className={`h-[600px]  overflow-y-auto xl:block ${
          displayMessage ? "hidden" : ""
        } `}
      >
        {loading &&
          Array(conversations.length)
            .fill(0)
            .map((item) => <UserLoading key={item}></UserLoading>)}
        {conversations.map((c) => (
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
              consTotal={conversations.length}
              onlineFriends={onlineFriends}
              setSlugId={setSlugId}
              currentUser={user}
              conversations={c}
            ></Conversation>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationBlock;

import React, { useEffect, useRef } from "react";
import { POST_TYPES } from "components/redux/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import { PROFILE_TYPES } from "components/redux/actions/profileAction";
import { NOTIFY_TYPES } from "components/redux/reducer/notifyReducer";
import { toast } from "react-toastify";
import { toastContent } from "components/toast/toast";
import soundNotify from "./components/sounds/soundNotification.mp3";
import { GLOBAL_TYPES } from "components/redux/actions/globalAction";
import { MESSAGE_TYPES } from "components/redux/reducer/messageReducer";
const SocketClient = () => {
  const { auth, socket, notify, online } = useSelector((state) => state);
  const dispatch = useDispatch();
  const soundNotifyRef = useRef();

  const spawnNotifications = (body, icon, url, title) => {
    const options = {
      body,
      icon,
    };
    const n = new Notification(title, options);
    n.onclick = (e) => {
      e.preventDefault();
      window.open(url, "_blank");
    };
  };

  //join user
  useEffect(() => {
    if (socket) {
      socket.emit("joinUser", auth.user);
    }
  }, [auth.user, socket]);

  //like
  useEffect(() => {
    socket?.on("likeToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });

    return () => socket?.off("likeToClient");
  }, [socket, dispatch]);

  //unLike
  useEffect(() => {
    socket?.on("unLikeToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket?.off("unLikeToClient");
  }, [socket, dispatch]);

  //comment
  useEffect(() => {
    socket?.on("createCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });

    return () => socket?.off("createCommentToClient");
  }, [socket, dispatch]);

  //like and unLike comment
  useEffect(() => {
    socket?.on("likeCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });

    return () => socket?.off("likeCommentToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("unLikeCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });

    return () => socket?.off("unLikeCommentToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("deleteCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket?.off("deleteCommentToClient");
  }, [socket, dispatch]);

  //follow
  useEffect(() => {
    socket?.on("followToClient", (newUser) => {
      dispatch({
        type: PROFILE_TYPES.FOLLOW,
        payload: { ...auth.user, ...newUser },
      });
      dispatch({
        type: GLOBAL_TYPES.AUTH,
        payload: { ...auth, user: { ...auth.user, ...newUser } },
      });
    });

    return () => socket?.off("followToClient");
  }, [socket, dispatch, auth]);

  useEffect(() => {
    socket?.on("unFollowToClient", (newUser) => {
      dispatch({
        type: PROFILE_TYPES.UNFOLLOW,
        payload: { ...auth.user, ...newUser },
      });
      dispatch({
        type: GLOBAL_TYPES.AUTH,
        payload: { ...auth, user: { ...auth.user, ...newUser } },
      });
    });
    return () => socket?.off("unFollowToClient");
  }, [socket, dispatch, auth]);

  //notification
  useEffect(() => {
    socket?.on("createNotifyToClient", (msg) => {
      dispatch({ type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg });
      if (notify.sound) soundNotifyRef.current.play();
      spawnNotifications(
        msg.user.fullname + " " + msg.text,
        msg.user.profilePicture[0].imageThumb,
        msg.url,
        "HLSOCIAL"
      );
    });
    return () => socket?.off("createNotifyToClient");
  }, [socket, dispatch, notify.sound]);

  useEffect(() => {
    socket?.on("removeNotifyToClient", (msg) => {
      dispatch({ type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg });
    });
    return () => socket?.off("removeNotifyToClient");
  }, [socket, dispatch]);

  //message
  useEffect(() => {
    socket?.on("addMessageToClient", (msg) => {
      dispatch({ type: MESSAGE_TYPES.ADD_MESSAGE, payload: msg });

      dispatch({
        type: MESSAGE_TYPES.ADD_USER,
        payload: { ...msg.user, text: msg.text, media: msg.media },
      });
    });
    return () => socket?.off("addMessageToClient");
  }, [socket, dispatch]);

  //online && offline
  useEffect(() => {
    socket.emit("checkUserOnline", auth.user);
  }, [auth.user, socket]);

  useEffect(() => {
    socket?.on("checkUserOnlineToMe", (data) => {
      data.forEach((item) => {
        if (!online.includes(item.id)) {
          dispatch({ type: GLOBAL_TYPES.ONLINE, payload: item.id });
        }
      });
    });
    return () => socket?.off("checkUserOnlineToMe");
  }, [socket, dispatch, online]);

  useEffect(() => {
    socket?.on("checkUserOnlineToClient", (id) => {
      if (!online.includes(id)) {
        dispatch({ type: GLOBAL_TYPES.ONLINE, payload: id });
      }
    });

    return () => socket?.off("checkUserOnlineToClient");
  }, [socket, dispatch, online]);

  useEffect(() => {
    socket?.on("checkUserOfflineToClient", (id) => {
      dispatch({ type: GLOBAL_TYPES.OFFLINE, payload: id });
    });

    return () => socket?.off("checkUserOfflineToClient");
  }, [socket, dispatch]);

  return (
    <div className="hidden">
      <audio controls ref={soundNotifyRef}>
        <source src={soundNotify} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default SocketClient;

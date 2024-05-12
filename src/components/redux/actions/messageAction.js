import { deleteDataApi, getDataApi, postDataApi } from "utils/fetchData";
import { MESSAGE_TYPES } from "../reducer/messageReducer";
import { DeleteData } from "./globalAction";
import { createNotify, deleteNotify } from "./notifyAction";

export const addUser =
  ({ user, message }) =>
  async (dispatch) => {
    if (message.users.every((item) => item._id !== user._id)) {
      dispatch({
        type: MESSAGE_TYPES.ADD_USER,
        payload: { ...user, text: "", media: [] },
      });
    }
  };

export const addMessage =
  ({ msg, auth, socket, id }) =>
  async (dispatch) => {
    const { _id, profilePicture, fullname, username } = auth.user;
    socket.emit("addMessage", {
      ...msg,
      user: { _id, profilePicture, fullname, username },
    });
    try {
      const res = await postDataApi("message", msg, auth.token);
      // console.log("res", res);
      dispatch({
        type: MESSAGE_TYPES.ADD_MESSAGE,
        payload: { ...msg, _id: res.data.messId },
      });

      const msgNoti = {
        id: auth.user._id,
        recipients: [id],
        url: `/messenger/${auth.user._id}`,
        text: `✉ ${msg.text}`,
      };

      dispatch(createNotify({ msg: msgNoti, auth, socket }));
    } catch (error) {
      console.log(error);
    }
  };

export const getConversations =
  ({ auth, page = 1 }) =>
  async (dispatch) => {
    try {
      const res = await getDataApi(
        `conversations?limit=${page * 9}`,
        auth.token
      );
      let newArr = [];
      res.data.conversations.forEach((item) => {
        item.recipients.forEach((user) => {
          if (user._id !== auth.user._id) {
            newArr.push({
              ...user,
              text: item.text,
              media: item.media,
              createdAt: item.createdAt,
            });
          }
        });
      });
      dispatch({
        type: MESSAGE_TYPES.GET_CONVERSATION,
        payload: { newArr, result: res.data.result },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getMessages =
  ({ auth, id, page = 1 }) =>
  async (dispatch) => {
    try {
      const res = await getDataApi(
        `message/${id}?limit=${page * 9}`,
        auth.token
      );
      const newData = { ...res.data, messages: res.data.messages.reverse() };
      dispatch({
        type: MESSAGE_TYPES.GET_MESSAGES,
        payload: { ...newData, _id: id, page },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const loadMoreMessage =
  ({ id, auth, page }) =>
  async (dispatch) => {
    try {
      const res = await getDataApi(
        `message/${id}?limit=${page * 9}`,
        auth.token
      );
      const newData = { ...res.data, messages: res.data.messages.reverse() };

      dispatch({
        type: MESSAGE_TYPES.UPDATE_MESSAGES,
        payload: { ...newData, _id: id, page },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const deleteMessage =
  ({ data, msg, auth, socket, id }) =>
  async (dispatch) => {
    const newData = DeleteData(data, msg._id);
    dispatch({
      type: MESSAGE_TYPES.DELETE_MESSAGE,
      payload: { newData, _id: msg.recipient },
    });
    try {
      await deleteDataApi(`message/${msg._id}`, auth.token);
      const msgNoti = {
        id: auth.user._id,
        recipients: [id],
        url: `/messenger/${auth.user._id}`,
        text: `✉ ${msg.text}`,
      };

      dispatch(deleteNotify({ msg: msgNoti, socket, token: auth.token }));
    } catch (error) {
      console.log(error);
    }
  };
export const deleteConversation =
  ({ id, auth }) =>
  async (dispatch) => {
    dispatch({ type: MESSAGE_TYPES.DELETE_CONVERSATION, payload: id });
    try {
      await deleteDataApi(`conversation/${id}`, auth.token);
    } catch (error) {
      console.log(error);
    }
  };

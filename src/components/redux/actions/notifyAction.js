import {
  deleteDataApi,
  getDataApi,
  postDataApi,
  putDataApi,
} from "utils/fetchData";
import { NOTIFY_TYPES } from "../reducer/notifyReducer";

export const createNotify =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      const res = await postDataApi("notify", msg, auth.token);
      socket.emit("createNotify", {
        ...res.data.notify,
        user: {
          username: auth.user.username,
          fullname: auth.user.fullname,
          profilePicture: auth.user.profilePicture,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const deleteNotify =
  ({ msg, socket, token }) =>
  async (dispatch) => {
    try {
      //   console.log("msg", msg);
      await deleteDataApi(`notify/${msg.id}?url=${msg.url}`, token);
      socket.emit("removeNotify", msg);
    } catch (error) {
      console.log(error);
    }
  };

export const getNotifies = (token) => async (dispatch) => {
  try {
    const res = await getDataApi(`notifies`, token);
    dispatch({
      type: NOTIFY_TYPES.GET_NOTIFIES,
      payload: res.data.notifies,
    });
  } catch (error) {
    console.log(error);
  }
};

export const isReadNotify =
  ({ msg, auth }) =>
  async (dispatch) => {
    dispatch({
      type: NOTIFY_TYPES.UPDATE_NOTIFY,
      payload: { ...msg, isRead: true },
    });
    try {
      await putDataApi(`isReadNotify/${msg._id}`, null, auth.token);
    } catch (error) {
      console.log(error);
    }
  };
export const deleteAllNotify = (token) => async (dispatch) => {
  dispatch({ type: NOTIFY_TYPES.DELETE_ALL_NOTIFY, payload: [] });
  try {
    await deleteDataApi(`deleteAllNotify`, token);
  } catch (error) {
    console.log(error);
  }
};

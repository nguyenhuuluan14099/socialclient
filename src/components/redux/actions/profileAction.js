import { DeleteData, GLOBAL_TYPES } from "./globalAction";
import { createNotify, deleteNotify } from "./notifyAction";

const { getDataApi, putDataApi } = require("utils/fetchData");
export const PROFILE_TYPES = {
  GET_IDS: "GET_PROFILE_IDS",
  SET_LOADING: "SET_LOADING",
  GET_USER: "GET_PROFILE_USER",
  GET_POSTS: "GET_PROFILE_POSTS",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
};

export const getProfileUser =
  ({ slug, token }) =>
  async (dispatch) => {
    dispatch({ type: PROFILE_TYPES.GET_IDS, payload: slug });

    try {
      dispatch({ type: PROFILE_TYPES.SET_LOADING, payload: true });

      const users = await getDataApi(`user/${slug}`, token);
      const posts = await getDataApi(`users_post/${slug}`, token);

      dispatch({ type: PROFILE_TYPES.GET_USER, payload: users.data.user });
      dispatch({
        type: PROFILE_TYPES.GET_POSTS,
        payload: { ...posts.data, _id: slug, page: 2 },
      });

      dispatch({ type: PROFILE_TYPES.SET_LOADING, payload: false });
    } catch (error) {
      console.log(error);
    }
  };

export const updateProfileUser = () => (dispatch) => {};

export const follow =
  ({ users, user, auth, socket }) =>
  async (dispatch) => {
    let newUser;
    if (users.every((item) => item._id !== user._id)) {
      newUser = { ...user, followers: [...user.followers, auth.user] };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = { ...item, followers: [...item.followers, auth.user] };
        }
      });
    }
    // const newAuth = auth.user.followings.some((id) => id === auth._id);

    dispatch({ type: PROFILE_TYPES.FOLLOW, payload: newUser });
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        ...auth,
        user: { ...auth.user, followings: [...auth.user.followings, newUser] },
      },
    });

    try {
      const res = await putDataApi(`user/follow/${user._id}`, null, auth.token);

      socket.emit("follow", res.data.newUser);

      const msg = {
        id: auth.user._id,
        text: "has started to follow you.",
        recipients: [newUser._id],
        url: `${auth.user._id}`,
      };
      dispatch(createNotify({ msg, auth, socket }));
    } catch (error) {
      console.log(error);
    }
  };

export const unFollow =
  ({ users, user, auth, socket }) =>
  async (dispatch) => {
    let newUser;
    if (users.every((item) => item._id !== user._id)) {
      newUser = {
        ...user,
        followers: user.followers.filter((data) => data._id !== auth.user._id),
      };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = {
            ...item,
            followers: user.followers.filter(
              (data) => data._id !== auth.user._id
            ),
          };
        }
      });
    }
    dispatch({ type: PROFILE_TYPES.UNFOLLOW, payload: newUser });
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          followings: DeleteData(auth.user.followings, newUser._id),
        },
      },
    });

    try {
      const res = await putDataApi(
        `user/unfollow/${user._id}`,
        null,
        auth.token
      );
      socket.emit("unFollow", res.data.newUser);

      const msg = {
        id: auth.user._id,
        text: "has started to follow you.",
        recipients: [newUser._id],
        url: `${auth.user._id}`,
      };
      dispatch(deleteNotify({ msg, socket, token: auth.token }));
    } catch (error) {
      console.log(error);
    }
  };

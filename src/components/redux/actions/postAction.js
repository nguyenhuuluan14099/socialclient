import { deleteDataApi, getDataApi, putDataApi } from "utils/fetchData";
import { toast } from "react-toastify";
import { toastContent } from "components/toast/toast";
import { createNotify, deleteNotify } from "./notifyAction";
import { GLOBAL_TYPES } from "./globalAction";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  UPDATE_POST: "UPDATE_POST",
  GET_POST: "GET_POST",
  DELETE_POST: "DELETE_POST",
  GET_POSTS: "GET_POSTS",
  LOADING_POST: "LOADING_POST",
};

export const createPost =
  (values, media, currentUser, content, onClose = () => {}) =>
  async (dispatch) => {
    let arrayImage = [];
    try {
    } catch (error) {}
  };

export const getPost = (detailPost, id, token) => async (dispatch) => {
  if (detailPost.every((post) => post._id !== id)) {
    try {
      const res = await getDataApi(`post/${id}`, token);
      dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post });
    } catch (error) {
      toast.error(error.response.data.msg, toastContent());
    }
  }
};

export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
    const res = await getDataApi(`posts`, token);
    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { posts: res.data.posts, result: res.data.result, page: 2 },
    });
    dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.msg, toastContent());
  }
};

export const updatePost =
  ({ newValues, postId, token }) =>
  async (dispatch) => {
    try {
      const res = await putDataApi(`post/${postId}`, newValues, token);
      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: res.data.newPost,
      });
      toast.success(res.data.msg, toastContent());
    } catch (error) {
      toast.error(error.response.data.msg, toastContent());
    }
  };
export const deletePost =
  ({ postId, socket, token }) =>
  async (dispatch) => {
    dispatch({ type: POST_TYPES.DELETE_POST, payload: postId });
    try {
      const res = await deleteDataApi(`post/${postId}`, token);

      const msg = {
        id: postId,
        text: "Add a new post.",
        recipients: res.data.newPost.user.followers,
        url: `/post/${postId}`,
      };
      dispatch(deleteNotify({ msg, socket, token }));
      toast.success(res.data.msg, toastContent());
    } catch (error) {
      toast.error(error.response.data.msg, toastContent());
    }
  };

export const likePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    socket.emit("likePost", newPost);
    try {
      await putDataApi(`post/${post._id}/like`, null, auth.token);

      const msg = {
        id: auth.user._id,
        recipients: [post.user._id],
        url: `/post/${post._id}`,
        text: "Liked your post.",
        content: post.desc,
        image: post.img[0].imageThumb,
      };
      dispatch(createNotify({ msg, auth, socket }));
    } catch (error) {
      toast.error(error.response.data.msg, toastContent());
    }
  };
export const unLikePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = {
      ...post,
      likes: post.likes.filter((item) => item._id !== auth.user._id),
    };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    socket.emit("unLikePost", newPost);

    try {
      await putDataApi(`post/${post._id}/unLike`, null, auth.token);
      const msg = {
        id: auth.user._id,
        recipients: [post.user._id],
        url: `/post/${post._id}`,
        text: "Liked your post.",
      };
      dispatch(deleteNotify({ msg, socket, token: auth.token }));
    } catch (error) {
      toast.error(error.response.data.msg, toastContent());
    }
  };

export const savedPost =
  ({ post, auth }) =>
  async (dispatch) => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, post._id] };
    dispatch({ type: GLOBAL_TYPES.AUTH, payload: { ...auth, user: newUser } });
    try {
      await putDataApi(`post/saved/${post._id}`, null, auth.token);
    } catch (error) {
      console.log(error);
    }
  };

export const unSavedPost =
  ({ post, auth }) =>
  async (dispatch) => {
    const newUser = {
      ...auth.user,
      saved: auth.user.saved.filter((item) => item !== post._id),
    };
    dispatch({ type: GLOBAL_TYPES.AUTH, payload: { ...auth, user: newUser } });
    try {
      await putDataApi(`post/unSaved/${post._id}`, null, auth.token);
    } catch (error) {
      console.log(error);
    }
  };

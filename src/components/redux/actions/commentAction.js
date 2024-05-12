import { deleteDataApi, postDataApi, putDataApi } from "utils/fetchData";
import { POST_TYPES } from "./postAction";
import { DeleteData, EditData } from "./globalAction";
import { createNotify, deleteNotify } from "./notifyAction";

export const createComment =
  ({ post, comment, auth, socket }) =>
  async (dispatch) => {
    const newPost = { ...post, comments: [...post.comments, comment] };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      const res = await postDataApi("comments", comment, auth.token);
      const newData = { ...res.data.newComment, user: auth.user };
      const newPost = { ...post, comments: [...post.comments, newData] };
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

      //socket
      socket.emit("createComment", newPost);

      //notify
      const msg = {
        id: res.data.newComment._id,
        text:
          comment.reply.length > 0
            ? "replied you in a comment."
            : "has commented on your post.",
        recipients:
          comment.reply.length > 0 ? [comment.tag._id] : [post.user._id],
        url: `/post/${post._id}`,
        content: post.desc,
        image: post.img[0].imageThumb,
      };
      dispatch(createNotify({ msg, auth, socket }));
    } catch (error) {
      console.log(error);
    }
  };

export const deleteComment =
  ({ post, commentId, comment, socket, token }) =>
  async (dispatch) => {
    const newComment = DeleteData(post.comments, commentId);
    const newData = { ...post, comments: newComment };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newData });

    socket.emit("deleteComment", newData);
    try {
      await deleteDataApi(`/comment/${commentId}`, token);
      const msg = {
        id: commentId,
        text:
          comment.reply.length > 0
            ? "replied you in a comment."
            : "has commented on your post.",
        recipients:
          comment.reply.length > 0 ? [comment.tag._id] : [post.user._id],
        url: `/post/${post._id}`,
      };
      dispatch(deleteNotify({ msg, socket, token }));
    } catch (error) {
      console.log(error);
    }
  };

export const likeComment =
  ({ comment, post, auth, socket }) =>
  async (dispatch) => {
    const newComment = { ...comment, like: [...comment.like, auth.user] };

    const newComments = EditData(post.comments, comment._id, newComment);
    const newPost = {
      ...post,
      comments: newComments,
    };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    socket.emit("likeComment", newPost);
    try {
      await putDataApi(`comments/${comment._id}/like`, null, auth.token);
    } catch (error) {
      console.log(error);
    }
  };

export const unLikeComment =
  ({ comment, post, auth, socket }) =>
  async (dispatch) => {
    const newComment = {
      ...comment,
      like: comment.like.filter((item) => item._id !== auth.user._id),
    };
    const newComments = EditData(post.comments, comment._id, newComment);
    const newPost = { ...post, comments: newComments };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    socket.emit("unLikeComment", newPost);

    try {
      await putDataApi(`comments/${comment._id}/unLike`, null, auth.token);
    } catch (error) {
      console.log(error);
    }
  };

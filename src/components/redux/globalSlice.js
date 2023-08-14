import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    // sideBar: false,
    isUpdate: false,
    isComment: false,
    isLiked: false,
    notification: false,
    message: {},
    markNot: false,
    removeTag: true,
    replyComment: {},
    isReload: false,
    viewCmt: false,
    reloadMes: false,
    reloadOnlineFriend: false,
    isLoading: false,
    toastMes: false,
    totalSaved: 0,
  },
  reducers: {
    // toggleSideBar: (state, { payload }) => ({
    //   ...state,
    //   sideBar: payload,
    // }),
    toggleUpdate: (state, { payload }) => ({
      ...state,
      isUpdate: payload,
    }),
    addComment: (state, { payload }) => ({
      ...state,
      isComment: payload,
    }),
    toggleLike: (state, { payload }) => ({
      ...state,
      isLiked: payload,
    }),
    toggleNotification: (state, { payload }) => ({
      ...state,
      notification: payload,
    }),
    setMessage: (state, { payload }) => ({
      ...state,
      message: payload,
    }),
    setMarkNot: (state, { payload }) => ({
      ...state,
      markNot: payload,
    }),
    toggleRemoveTag: (state, { payload }) => ({
      ...state,
      removeTag: payload,
    }),
    setReplyComment: (state, { payload }) => ({
      ...state,
      replyComment: payload,
    }),
    setIsReload: (state, { payload }) => ({
      ...state,
      isReload: payload,
    }),
    toggleViewCmt: (state, { payload }) => ({
      ...state,
      viewCmt: payload,
    }),
    setReloadMes: (state, { payload }) => ({
      ...state,
      reloadMes: payload,
    }),
    setReloadOnLineFriend: (state, { payload }) => ({
      ...state,
      reloadOnlineFriend: payload,
    }),
    setShowLoading: (state, { payload }) => ({
      ...state,
      isLoading: payload,
    }),
    setToastMes: (state, { payload }) => ({
      ...state,
      toastMes: payload,
    }),
    setTotalSaved: (state, { payload }) => ({
      ...state,
      totalSaved: payload,
    }),
  },
});
export const {
  setTotalSaved,
  setToastMes,
  toggleViewCmt,
  setReloadOnLineFriend,
  setReloadMes,
  setReplyComment,
  // toggleSideBar,
  toggleUpdate,
  setIsReload,
  addComment,
  toggleLike,
  toggleNotification,
  setMessage,
  setMarkNot,
  toggleRemoveTag,
  setShowLoading,
} = globalSlice.actions;
export default globalSlice.reducer;

import { combineReducers } from "@reduxjs/toolkit";
import posts from "./postReducer";
import detailPost from "./detailPostReducer";
import profile from "./profileReducer";
import loading from "./loadingReducer";
import modal from "./modalReducer";
import error from "./errorReducer";
import auth from "./authReducer";
import socket from "./socketReducer";
import reply from "./replyCmtReducer";
import notify from "./notifyReducer";
import explore from "./exploreReducer";
import message from "./messageReducer";
import online from "./onlineReducer";

const reducer = combineReducers({
  loading,
  error,
  profile,
  modal,
  posts,
  detailPost,
  auth,
  socket,
  reply,
  notify,
  explore,
  message,
  online,
});

export default reducer;

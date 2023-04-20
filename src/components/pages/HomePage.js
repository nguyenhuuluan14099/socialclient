import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import Feed from "components/feed/Feed";
import Friend from "components/friend/Friend";
import Header from "components/header/Header";
import IconHeart from "components/icons/IconHeart";
import IconHeartNone from "components/icons/IconHeartNone";
import {
  setToastMes,
  toggleNotification,
  toggleSideBar,
} from "components/redux/globalSlice";
import { listIcons } from "dataSideBar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HomePage = ({ socket }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user === null) {
      navigate("/login");
    }
  }, [navigate, user]);
  useEffect(() => {
    document.title = "HLSocial";
  }, []);
  //${
  //   sideBar ? "animation-home-logo" : ""
  // }

  // console.log("notification", notifications);
  // useEffect(() => {
  //   if (modalShare) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "visible";
  //   }
  // }, [modalShare]);

  return (
    <div className="">
      <Header socket={socket}></Header>
      <div className={`flex w-full dark:bg-[#121212] none-focus`}>
        <Feed socket={socket}></Feed>
        <Friend></Friend>
      </div>
    </div>
  );
};

export default HomePage;

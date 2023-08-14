import { useAuth } from "components/context/Auth-Context";
import Feed from "components/feed/Feed";
import Friend from "components/friend/Friend";
import Header from "components/header/Header";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

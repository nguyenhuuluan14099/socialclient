import React, { useEffect, useState } from "react";
import DetailPostModalContent from "components/modal/ModalContent/DetailPostModalContent";
import Header from "components/header/Header";
const DetailPostPage = ({ socket }) => {
  // console.log("socketDetail", socket);
  return (
    <div className="">
      <Header socket={socket}></Header>
      <div className="w-full max-w-[900px] mt-16">
        <DetailPostModalContent
          socket={socket}
          morePost
        ></DetailPostModalContent>
      </div>
    </div>
  );
};

export default DetailPostPage;

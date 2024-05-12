import React from "react";
import DetailPostModalContent from "components/modal/ModalContent/DetailPostModalContent";
import Header from "components/feed/Header";

const DetailPostPage = () => {
  return (
    <div className="">
      <Header></Header>

      <div className="laptop:w-full laptop:max-w-[900px] laptop:ml-[130px] mt-5 laptop:mt-1">
        <DetailPostModalContent hiddenIcon morePost></DetailPostModalContent>
      </div>
    </div>
  );
};

export default DetailPostPage;

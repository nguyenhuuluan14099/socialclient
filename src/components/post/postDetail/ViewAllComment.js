import CommentBlock from "components/comment/CommentBlock";
import IconBack from "components/icons/IconBack";
import ImageUser from "components/image/ImageUser";
import ModalBase from "components/modal/ModalBase";
import DetailPostModalContent from "components/modal/ModalContent/DetailPostModalContent";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ViewAllComment = ({ post }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      {post.comments.length > 2 && !post.hideComment && (
        <div
          onClick={() => setShow(true)}
          className="cursor-pointer text-slate-400 hover:text-slate-600 text-[14px]  transition-all"
        >
          <p>{`View all ${post.comments.length} comments`}</p>
        </div>
      )}

      {show && (
        <ModalBase
          visible={show}
          type="detailPost"
          onClose={() => setShow(false)}
        >
          <div className="mt-0 h-full">
            <div className="hidden laptop:block">
              <DetailPostModalContent
                onClose={() => setShow(false)}
                dataPostProfile={post}
              ></DetailPostModalContent>
            </div>
            <div className="top-0 h-[700px] laptop:hidden">
              <div
                className={` commentBlock w-full px-4 py-2 pt-4  h-full     laptop:flex flex-col   overflow-hidden overflow-y-scroll  absolute top-0 z-10 left-0 dark:bg-black bg-white  `}
              >
                <div className="flex items-center justify-between py-2">
                  <p onClick={() => setShow(false)}>
                    <IconBack></IconBack>
                  </p>
                  <p>Comment</p>
                  <p></p>
                </div>
                <div className="sticky left-0 z-10 flex mb-2 bg-white -top-5 dark:bg-black gap-x-3">
                  <div className="w-full  max-w-[35px] h-[35px]">
                    <ImageUser
                      smallImg
                      data={post.user}
                      story
                      classNameImg="w-full h-full"
                    ></ImageUser>
                  </div>
                  <div className=" text-[14px] mt-1 bg-white dark:bg-black">
                    <Link to={`/${post.user._id}`} className="">
                      <span className="hover:text-slate-500 cursor-pointer hover:underline hover:underline-offset-2 text-slate-700 dark:text-white font-[600] text-[14px] mr-2">
                        {post.user.fullname}
                      </span>
                    </Link>
                    <div className="w-full font-semibold ">{post.desc}</div>
                  </div>
                </div>

                <CommentBlock post={post}></CommentBlock>
              </div>
            </div>
          </div>
        </ModalBase>
      )}
    </div>
  );
};

export default ViewAllComment;

import ModalBase from "components/modal/ModalBase";
import DetailPostModalContent from "components/modal/ModalContent/DetailPostModalContent";
import React, { useEffect, useState } from "react";
import IconHeart from "components/icons/IconHeart";

const ItemPost = ({ post, socket }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [show]);
  return (
    <>
      <div className="w-full max-w-[300px]  h-[120px] md:h-[200px]  xl:h-[250px] relative group">
        <img
          src={post?.img?.url || "https://i.ibb.co/1dSwFqY/download-1.png"}
          alt=""
          className="w-full top-0 h-[120px] md:h-[200px]  xl:h-[250px] object-cover z-5 absolute"
        />
        <div
          className="absolute inset-0 flex items-center justify-center  overlay  bg-black invisible bg-opacity-20  group-hover:visible   transition duration-75 cursor-pointer"
          onClick={() => setShow(true)}
        >
          <div className="flex items-center gap-x-7 text-white">
            <div className="flex items-center gap-x-1">
              <p>
                <IconHeart className="!w-6 !h-6"></IconHeart>
              </p>
              <p className="font-semibold">{post?.likes.length}</p>
            </div>
            <div className="flex items-center gap-x-1">
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z"
                    clipRule="evenodd"
                  />
                </svg>
              </p>
              <p className="font-semibold">{post?.comments.length}</p>
            </div>
          </div>
        </div>
        {show && (
          <ModalBase
            visible={show}
            type="detailPost"
            onClose={() => setShow(false)}
          >
            <div className="mt-0 h-full">
              <DetailPostModalContent
                onClose={() => setShow(false)}
                socket={socket}
                dataPostProfile={post}
              ></DetailPostModalContent>
            </div>
          </ModalBase>
        )}
      </div>
    </>
  );
};

export default ItemPost;

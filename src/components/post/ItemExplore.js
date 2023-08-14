import React from "react";
import IconHeart from "components/icons/IconHeart";
import { Link } from "react-router-dom";
import ImageLazy from "components/image/ImageLazy";
const ItemExplore = ({ post }) => {
  if (!post) return;
  return (
    <div className="w-full h-full relative group">
      <ImageLazy
        url={post.img.url}
        alt="image_post"
        className="w-[300px] h-[300px] object-cover"
      />
      <Link
        to={`/post/${post._id}`}
        className="absolute group-hover:visible invisible  inset-0 bg-black bg-opacity-30 cursor-pointer flex items-center justify-center"
      >
        <div className="flex items-center gap-x-7 text-white">
          <div className="flex items-center gap-x-1">
            <p>
              <IconHeart className="!w-6 !h-6"></IconHeart>
            </p>
            <p className="font-semibold">{post.likes.length}</p>
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
            <p className="font-semibold">{post.comments.length}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ItemExplore;

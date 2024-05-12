import EyeOpen from "components/icons/EyeOpen";
import IconDelete from "components/icons/IconDelete";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ModalBase from "components/modal/ModalBase";
import axios from "axios";
import { toast } from "react-toastify";
import ImageLazy from "components/image/ImageLazy";

const TablePost = ({ currentItems }) => {
  const [showModal, setShowModal] = useState(false);
  const [idPost, setIdPost] = useState("");
  if (!currentItems) return;

  const handleGetId = (id) => {
    setIdPost(id);
    setShowModal(true);
  };
  // console.log("idPost", idPost);
  const handleDeletePost = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts/${idPost}`);
      toast.success("You have been deleted post", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mb-16 overflow-x-auto overflow-y-auto">
      <table>
        <thead>
          <tr className="py-3">
            <th>No</th>
            <th>Avatar</th>
            <th>Name</th>
            <th className="w-[200px]">Content</th>
            <th>Image</th>
            <th>Likes</th>
            <th>Comments</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        {currentItems.length > 0 &&
          currentItems.map((item, index) => (
            <tbody
              className={`h-[30px] ${
                index % 2 === 0 ? "bg-slate-200 dark:bg-[#262626]" : ""
              }`}
              key={index}
            >
              <tr>
                <td>{index}</td>
                <td>
                  <ImageLazy
                    url={
                      item.user.profilePicture[0]?.imageThumb ||
                      "https://i.ibb.co/1dSwFqY/download-1.png"
                    }
                    className="w-[40px] h-[40px] rounded-full object-cover"
                    alt=""
                  />
                </td>
                <td>{`${item.user.fullname}`}</td>
                <td title={item.desc} className="w-[200px]">
                  {item.desc.slice(0, 20)}
                </td>
                <td>
                  <img
                    className="w-[40px] h-[40px] rounded-xs object-cover"
                    src={
                      item.img[0].imageThumb ||
                      "https://i.ibb.co/1dSwFqY/download-1.png"
                    }
                    alt=""
                  />
                </td>
                <td>{item.likes.length}</td>
                <td>{item.comments.length}</td>
                <td>{format(new Date(item.createdAt), "dd/MM/yyyy")}</td>
                <td className="flex items-center gap-x-2 ">
                  <Link to={`/post/${item._id}`}>
                    <EyeOpen admin></EyeOpen>
                  </Link>

                  <IconDelete
                    onClick={() => handleGetId(item._id)}
                  ></IconDelete>
                </td>
              </tr>
            </tbody>
          ))}
      </table>

      {showModal && (
        <ModalBase
          animationRoot="primary"
          visible={showModal}
          onClose={() => setShowModal(false)}
        >
          <div className="flex flex-col cursor-pointer">
            <p
              onClick={handleDeletePost}
              className="w-full p-3 font-semibold text-center text-red-500 border border-b-slate-300"
            >
              Delete
            </p>
            <p
              onClick={() => setShowModal(false)}
              className="w-full p-3 text-center"
            >
              Cancel
            </p>
          </div>
        </ModalBase>
      )}
    </div>
  );
};

export default TablePost;

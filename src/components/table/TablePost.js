import EyeOpen from "components/icons/EyeOpen";
import IconDelete from "components/icons/IconDelete";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ModalBase from "components/modal/ModalBase";
import PostModalContent from "components/modal/ModalContent/PostModalContent";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setIsReload } from "components/redux/globalSlice";

const TablePost = ({ currentItems }) => {
  const [showModal, setShowModal] = useState(false);
  const { isReload } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const [idPost, setIdPost] = useState("");
  if (!currentItems) return;

  const handleGetId = (id) => {
    setIdPost(id);
    setShowModal(true);
  };
  // console.log("idPost", idPost);
  const handleDeletePost = async () => {
    try {
      await axios.delete(`http://localhost:5000/posts/${idPost}`);
      toast.success("You have been deleted post");
      dispatch(setIsReload(!isReload));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="overflow-x-auto overflow-y-auto mb-16">
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
                  <img
                    src={
                      item.user.userImg ||
                      "https://i.ibb.co/1dSwFqY/download-1.png"
                    }
                    className="w-[40px] h-[40px] rounded-full object-cover"
                    alt=""
                  />
                </td>
                <td>{`${item.user.userName}`}</td>
                <td title={item.desc} className="w-[200px]">
                  {item.desc.slice(0, 20)}
                </td>
                <td>
                  <img
                    className="w-[40px] h-[40px] rounded-xs object-cover"
                    src={
                      item.img.thumb ||
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
              className="w-full text-center p-3 border border-b-slate-300  text-red-500 font-semibold"
            >
              Delete
            </p>
            <p
              onClick={() => setShowModal(false)}
              className="w-full text-center p-3"
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

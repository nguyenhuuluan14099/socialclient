import EyeOpen from "components/icons/EyeOpen";
import IconDelete from "components/icons/IconDelete";
import IconEdit from "components/icons/IconEdit";
import React from "react";
import { Link } from "react-router-dom";
// import { format } from "timeago.js";
import { v4 } from "uuid";
import { format } from "date-fns";
import ImageLazy from "components/image/ImageLazy";
const Table = ({ currentItems }) => {
  if (!currentItems) return;
  return (
    <div className="overflow-x-auto overflow-y-auto mb-10">
      <table>
        <thead>
          <tr className="py-3">
            <th>No</th>
            <th>Avatar</th>
            <th>Name</th>
            <th className="w-[200px]">Email</th>
            <th>Followers</th>
            <th>Followings</th>
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
                      item.profilePicture.thumb ||
                      "https://i.ibb.co/1dSwFqY/download-1.png"
                    }
                    className="w-[40px] h-[40px] rounded-full object-cover"
                    alt=""
                  />
                </td>
                <td>{`${item.username}`}</td>
                <td className="w-[200px]">{item.email}</td>
                <td>{item.followers.length}</td>
                <td>{item.followings.length}</td>
                <td>{format(new Date(item.createdAt), "dd/MM/yyyy")}</td>
                <td className="flex items-center gap-x-2 ">
                  <Link to={`/${item.username}`}>
                    <EyeOpen admin></EyeOpen>
                  </Link>

                  <IconDelete></IconDelete>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
};

export default Table;

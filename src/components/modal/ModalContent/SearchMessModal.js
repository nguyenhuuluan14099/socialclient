import React, { useEffect, useState } from "react";
import { getDataApi } from "utils/fetchData";
import ModalBase from "../ModalBase";
import Conversation from "components/conversation/Conversation";
import { addUser } from "components/redux/actions/messageAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

const SearchMessModal = ({ showModal, setShowModal = () => {} }) => {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);
  const { message } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //     if (!value) return setUsers([]);
  //     const newValue = value.toLowerCase().replace(/ /g, "");

  //     getDataApi(`search?username=${newValue}`, auth.token)
  //       .then((res) => setUsers(res.data.users))
  //       .catch((err) => console.log(err));
  //   }, [value, auth.token]);
  const handleAddUser = (user) => {
    setValue("");
    setUsers([]);
    dispatch(addUser({ user, message }));
    return navigate(`/messenger/${user._id}`);
  };
  return (
    <div>
      {showModal && (
        <ModalBase visible={showModal} onClose={() => setShowModal(false)}>
          <div className={`h-[90%] overflow-y-auto xl:block `}>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Search user..."
              className="p-2 bg-transparent w-full outline-none border-transparent border border-b-slate-300 dark:border-[#262626]"
            />

            {users.length !== 0 ? (
              <>
                {users.map((user) => {
                  return (
                    <div
                      className={`xl:block`}
                      key={v4()}
                      onClick={() => {
                        handleAddUser(user);
                      }}
                    >
                      <Conversation isListSearch user={user}></Conversation>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {message.users.length > 0 &&
                  message.users.map((user) => {
                    return (
                      <div
                        onClick={() => {
                          handleAddUser(user);
                        }}
                        className={`xl:block`}
                        key={v4()}
                      >
                        <Conversation user={user}></Conversation>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </ModalBase>
      )}
    </div>
  );
};

export default SearchMessModal;

import IconClose from "components/icons/IconClose";
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import ModalBase from "../ModalBase";
import StatusNotification from "components/Notification/StatusNotification";
import { deleteAllNotify } from "components/redux/actions/notifyAction";
import { useDispatch, useSelector } from "react-redux";

const NotificationModalContent = ({ notifies, onClose = () => {} }) => {
  const [showModal, setShowModal] = useState(false);
  const [notifiesUnRead, setNotifiesUnRead] = useState(0);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const newArr = notifies.filter((not) => not.isRead === false);
    setNotifiesUnRead(newArr.length);
  }, [notifies]);

  const handleDeleteALlNotifies = () => {
    dispatch(deleteAllNotify(auth.token));
    setShowModal(false);
  };

  return (
    <div>
      <div className="w-full dark:bg-black">
        <div className="flex items-center justify-between w-full p-5 mb-5 text-xl font-semibold border border-transparent border-b-slate-300">
          Notifications
          <p onClick={onClose} className="cursor-pointer">
            <IconClose></IconClose>
          </p>
        </div>

        <div className="w-full  flex flex-col dark:bg-black h-full max-h-[550px] overflow-y-auto">
          {notifies.length > 0 &&
            notifies.map((not) => (
              <div
                onClick={onClose}
                key={v4()}
                className="hover:bg-blue-100 dark:hover:bg-[#262626] transition-all cursor-pointer px-3"
              >
                <StatusNotification not={not}></StatusNotification>
              </div>
            ))}
        </div>
        {notifies.length !== 0 ? (
          <button
            onClick={() => setShowModal(true)}
            className="top-0 my-3 left-0 w-full p-3 text-white bg-blue-500 rounded-lg"
          >
            Delete All Notifications
          </button>
        ) : (
          <p className="p-3 text-xl font-bold text-slate-300 ">
            Don't have any notifications
          </p>
        )}
      </div>
      {showModal && (
        <ModalBase visible={showModal} onClose={() => setShowModal(false)}>
          <div className="w-full text-center cursor-pointer">
            {notifiesUnRead > 0 && (
              <div className="p-2 bg-blue-500">
                <p>{`You have ${notifiesUnRead} notifications unRead.
             `}</p>
              </div>
            )}

            <p
              onClick={handleDeleteALlNotifies}
              className="w-full p-3 font-semibold text-red-500 border border-transparent border-b-slate-300"
            >
              DELETE ALL
            </p>
            <p onClick={() => setShowModal(false)} className="w-full p-3 ">
              Cancel
            </p>
          </div>
        </ModalBase>
      )}
    </div>
  );
};

export default NotificationModalContent;

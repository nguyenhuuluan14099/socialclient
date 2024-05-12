import IconHeartNone from "components/icons/IconHeartNone";
import ModalBase from "components/modal/ModalBase";
import NotificationModalContent from "components/modal/ModalContent/NotificationModalContent";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Notifications = () => {
  const { notify } = useSelector((state) => state);
  const [showNot, setShowNot] = useState(false);
  const [notifies, setNotifies] = useState([]);
  useEffect(() => {
    const notifyUnRead = notify.data.filter((not) => not.isRead === false);
    setNotifies(notifyUnRead);
  }, [notify]);

  return (
    <>
      {showNot && (
        <ModalBase
          type="sideBar"
          animationRoot="primary"
          visible={showNot}
          onClose={() => setShowNot(false)}
        >
          <NotificationModalContent
            onClose={() => setShowNot(false)}
            notifies={notify.data}
          ></NotificationModalContent>
        </ModalBase>
      )}

      <div
        onClick={() => setShowNot(true)}
        className=" cursor-pointer flex  dark:hover:bg-[#111] hover:bg-[#ccc]  hover:font-bold  group transition-all rounded-lg p-2 pl-4 items-center gap-x-3"
      >
        <div className="relative ">
          <IconHeartNone></IconHeartNone>
          {notifies && notifies.length > 0 && (
            <p className="absolute top-0 right-0 border rounded-full bg-red-500 text-white w-3 h-3 flex items-center justify-center text-[8px] p-[3px]">
              {notifies.length}
            </p>
          )}
        </div>
        <p className={` hidden laptop:block`}>Notifications</p>
      </div>
    </>
  );
};

export default Notifications;

import IconSetting from "components/icons/IconSetting";
import ModalBase from "components/modal/ModalBase";
import MoreModalContent from "components/modal/ModalContent/MoreModalContent";
import React, { useRef, useState } from "react";

const Setting = () => {
  const [showSetting, setShowSetting] = useState(false);
  const [coords, setCoords] = useState({});
  const moreRef = useRef();

  const handleClickShow = () => {
    setCoords(moreRef.current.getBoundingClientRect());
    setShowSetting(true);
  };

  return (
    <>
      <div
        ref={moreRef}
        onClick={handleClickShow}
        className="flex cursor-pointer dark:hover:bg-[#111] hover:bg-[#ccc] hover:font-bold  group transition-all rounded-lg p-2 pl-4 items-center gap-x-3"
      >
        <p>
          <IconSetting></IconSetting>
        </p>
        <p className={` }`}>More</p>
      </div>

      {showSetting && (
        <ModalBase
          type="secondary"
          coords={coords}
          animationRoot="primary"
          visible={showSetting}
          onClose={() => setShowSetting(false)}
        >
          <MoreModalContent
            onClose={() => setShowSetting(true)}
          ></MoreModalContent>
        </ModalBase>
      )}
    </>
  );
};

export default Setting;

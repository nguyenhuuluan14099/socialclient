import IconCreate from "components/icons/IconCreate";
import IconCreateFill from "components/icons/IconCreateFill";
import ModalBase from "components/modal/ModalBase";
import ShareModalContent from "components/modal/ModalContent/ShareModalContent";
import React, { useEffect, useState } from "react";

const CreatePost = () => {
  const [toggleCreate, setToggleCreate] = useState(false);
  useEffect(() => {
    if (toggleCreate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [toggleCreate]);
  return (
    <>
      {toggleCreate && (
        <ModalBase
          type="share"
          visible={toggleCreate}
          onClose={() => setToggleCreate(false)}
        >
          <ShareModalContent
            onClose={() => setToggleCreate(false)}
          ></ShareModalContent>
        </ModalBase>
      )}

      <div
        onClick={() => setToggleCreate(!toggleCreate)}
        className="flex cursor-pointer dark:hover:bg-[#111] hover:bg-[#ccc] hover:font-bold  group transition-all rounded-lg p-2 pl-4 items-center gap-x-3"
      >
        <p>
          {toggleCreate ? (
            <IconCreateFill></IconCreateFill>
          ) : (
            <IconCreate></IconCreate>
          )}
        </p>
        <p className={` ${toggleCreate ? "font-bold" : ""}`}>Create</p>
      </div>
    </>
  );
};

export default CreatePost;

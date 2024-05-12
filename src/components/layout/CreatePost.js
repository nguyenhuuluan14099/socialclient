import IconCreate from "components/icons/IconCreate";
import IconCreateFill from "components/icons/IconCreateFill";
import ModalBase from "components/modal/ModalBase";
import ShareModalContent from "components/modal/ModalContent/ShareModalContent";
import React, { useEffect, useState } from "react";

const CreatePost = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "visible";
  }, [show]);

  return (
    <>
      {show && (
        <ModalBase type="share" visible={show} onClose={() => setShow(false)}>
          <ShareModalContent onClose={() => setShow(false)}></ShareModalContent>
        </ModalBase>
      )}

      <div
        onClick={() => setShow(!show)}
        className="flex cursor-pointer dark:hover:bg-[#111] hover:bg-[#ccc] hover:font-bold  group transition-all rounded-lg p-2 laptop:pl-4 items-center gap-x-3"
      >
        <p>
          {show ? <IconCreateFill></IconCreateFill> : <IconCreate></IconCreate>}
        </p>
        <p className={`hidden laptop:block ${show ? "font-bold" : ""}`}>
          Create
        </p>
      </div>
    </>
  );
};

export default CreatePost;

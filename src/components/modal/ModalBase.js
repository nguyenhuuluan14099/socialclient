import React from "react";
import Modal from "./Modal";
const ModalBase = ({
  coords,
  type = "",
  visible,
  animationRoot = "",
  children,
  onClose = () => {},
  styleModalContent = "",
}) => {
  let bodyClassNameStyle = "";
  switch (type) {
    case "sideBar":
      bodyClassNameStyle =
        "fixed  transition duration-150 sideBar tablet:w-[400px] mx-auto  border border-slate-300 dark:border-[#262626] dark:bg-black  top-0 bg-white rounded-r-xl h-full max-w-full w-full";
      break;
    case "share":
      bodyClassNameStyle =
        "w-full max-w-[850px] laptop:h-[500px] inset-0   top-0 laptop:top-2/4 laptop:-translate-y-2/4 laptop:left-2/4 laptop:-translate-x-2/4 fixed laptop:block dark:bg-black  bg-white z-50 rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,rgba(0,_0,_0,_0.05)0px_1px_1px_0px] transition-all";
      break;
    case "detailPost":
      bodyClassNameStyle =
        "w-full dark:border-[#262626] max-w-[950px] h-full laptop:h-[700px]  laptop:top-2/4 laptop:-translate-y-2/4 laptop:left-2/4 laptop:-translate-x-2/4 inset-0 tablet:block tablet:h-[700px]  tablet:top-2/4 tablet:-translate-y-2/4 tablet:left-2/4 tablet:-translate-x-2/4 fixed max-h-[1500px] laptop:block  overflow-y-auto dark:bg-black";
      break;

    default:
      bodyClassNameStyle = " w-full  max-w-[400px] ";
      break;
  }
  let animationModal = "";
  switch (animationRoot) {
    case "primary":
      animationModal = "animateModal";
      break;
    case "secondary":
      animationModal = "secondaryAnimate";
      break;
    default:
      animationModal = "";
      break;
  }
  return (
    <>
      <Modal
        type={type}
        visible={visible}
        onClose={onClose}
        containerClassName="fixed transition-all inset-0  z-[9999] "
        bodyStyle={
          coords && {
            left: coords.left / 5,
            // right: coords.right,
            top: coords.top - 250,
            // width: coords.width + coords.height,
            width: "300px",
          }
        }
        bodyClassName={`${bodyClassNameStyle} ${styleModalContent} ${animationModal}  z-50 rounded-[6px]  border dark:border-[#262626]  bg-white shadowModal dark:text-white dark:bg-[#262626]  transition-all `}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalBase;

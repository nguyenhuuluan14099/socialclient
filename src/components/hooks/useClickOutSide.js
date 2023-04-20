import { useEffect, useRef, useState } from "react";

export default function useClickOutSide(dom) {
  const [show, setShow] = useState(false);
  const showRef = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      // console.log("here", showRef.current.contains(e.target));
      // //&&

      if (
        showRef.current &&
        !showRef.current.contains(e.target) &&
        !e.target.matches(dom)
      ) {
        setShow(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [dom]);
  return {
    show,
    setShow,
    showRef,
  };
}

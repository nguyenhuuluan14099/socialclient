import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import SettingContentDropdown from "./SettingContentDropdown";
const Dropdown = ({
  className = "",
  title = "Advanced settings",
  children,
}) => {
  const nodeRef = useRef();
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <div
      ref={nodeRef}
      className={` w-full cursor-pointer  ${className} border border-slate-300`}
    >
      <div
        onClick={handleClick}
        className="flex items-center justify-between px-4 py-2"
      >
        <p>{title}</p>
        <p>
          {show ? (
            <>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </span>
            </>
          ) : (
            <>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </>
          )}
        </p>
      </div>
      {show && (
        <div onClick={() => setShow(true)}>
          <DropdownChild>{children}</DropdownChild>
        </div>
      )}
    </div>
  );
};

const DropdownChild = ({ children }) => {
  return (
    <div className=" top-full mt-[1px] left-0    w-full absolute bg-white">
      {children}
    </div>
  );
};
export default Dropdown;

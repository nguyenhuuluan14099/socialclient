import React, { useState } from "react";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import SettingContentDropdown from "./SettingContentDropdown";

const SettingPost = ({ title = "Advanced settings" }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  const header = (
    <div
      style={{
        width: "335px",
      }}
      onClick={handleClick}
      className="flex items-center  justify-between w-full  px-4 py-2 "
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
  );
  return (
    <div>
      <Accordion className="w-full max-w-[400px]">
        <AccordionItem
          header={header}
          className="w-full cursor-pointer max-w-[400px]  border border-slate-300"
        >
          <SettingContentDropdown></SettingContentDropdown>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SettingPost;

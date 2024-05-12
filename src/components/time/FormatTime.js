import React from "react";
import { format } from "timeago.js";

const FormatTime = ({ inputTime }) => {
  const time = format(inputTime);
  let result = "";
  const arrTime = time.split(" ");
  if (arrTime[0] >= 10) {
    result = arrTime.join("").slice(0, 3);
  } else if (arrTime[1] === "now") {
    result = "now";
  } else if (arrTime[1] === "months") {
    result = arrTime.join("").slice(0, 3);
  } else {
    result = arrTime.join("").slice(0, 2);
  }

  return <div>{result}</div>;
};

export default FormatTime;

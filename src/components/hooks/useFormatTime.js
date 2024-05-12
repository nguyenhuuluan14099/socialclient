import { format } from "timeago.js";

export default function useFormatTime(inputTime) {
  const time = format(inputTime);
  let result = "";
  const arrTime = time.split(" ");
  if (arrTime[0] > 10) {
    result = arrTime.join("").slice(0, 3);
  } else if (arrTime[1] === "now") {
    result = "now";
  } else if (arrTime[1] === "months") {
    result = arrTime.join("").slice(0, 3);
  } else {
    result = arrTime.join("").slice(0, 2);
  }
  return result;
}

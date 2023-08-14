import axios from "axios";
import { toast } from "react-toastify";

export const loginCall = async (
  userCurrent,
  dispatch,
  handleReset = () => {}
) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/login`,
      userCurrent
    );
    dispatch({
      type: "LOGIN",
      payload: res.data,
    });
  } catch (error) {
    if (error.message === "Network Error" || error.message === "ERR_NETWORK") {
      toast.error("Email or Password is not correct!");
    }
    console.log("error", error);
  }
};

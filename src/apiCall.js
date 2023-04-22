import axios from "axios";
import { toast } from "react-toastify";

export const loginCall = async (
  userCurrent,
  dispatch,
  handleReset = () => {}
) => {
  try {
    const res = await axios.post(
      "https://serversocial.vercel.app/users/login",
      userCurrent
    );
    dispatch({
      type: "LOGIN",
      payload: res.data,
    });
  } catch (error) {
    // if (error.response.status === 404) {
    //   toast.error("Email does not exist !");
    // }
    if (error.message === "Network Error" || error.message === "ERR_NETWORK") {
      toast.error("Email or Password is not correct!");
    }
    // if (error.response.status === 400) {
    //   toast.error("Password is not correct !");
    // }
    // if (error.response.status === 200) {
    //   toast.success("Login successfully!");
    //   handleReset();
    // }
    console.log("error", error);
  }
};

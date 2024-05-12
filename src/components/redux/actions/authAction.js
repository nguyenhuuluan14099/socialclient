import { toastContent } from "components/toast/toast";
import { toast } from "react-toastify";
import { postDataApi } from "utils/fetchData";
import { GLOBAL_TYPES } from "./globalAction";
import { getToken, saveToken } from "utils/auth";

export const login =
  ({ data, navigate }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBAL_TYPES.LOADING, payload: true });
      const res = await postDataApi("login", data);

      dispatch({
        type: GLOBAL_TYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });

      window.localStorage.setItem("firstLogin", true);
      saveToken(res.data.refresh_token);

      navigate("/");
      toast.success(res.data.msg, toastContent());
      dispatch({ type: GLOBAL_TYPES.LOADING, payload: false });
    } catch (err) {
      toast.error(err.response.data.msg, toastContent());
      dispatch({ type: GLOBAL_TYPES.LOADING, payload: false });
    }
  };
export const register =
  ({ values, reset, navigate, auth }) =>
  async (dispatch) => {
    const user = {
      fullname: values.fullname,
      username: values.username.toLowerCase().replace(/ /g, ""),
      email: values.email,
      password: values.password,
      desc: "welcome to my life",
      city: "hcm",
      relationship: 1,
    };
    try {
      dispatch({ type: GLOBAL_TYPES.LOADING, payload: true });

      const res = await postDataApi("register", user, auth.token);
      navigate("/login");
      toast.success(res.data.msg, toastContent());
      dispatch({ type: GLOBAL_TYPES.LOADING, payload: false });
    } catch (error) {
      toast.error(error.response.data.msg, toastContent());
      dispatch({ type: GLOBAL_TYPES.LOADING, payload: false });
    }
  };
export const refreshToken = () => async (dispatch) => {
  const firstLogin = window.localStorage.getItem("firstLogin");
  const refresh_token = getToken();
  if (firstLogin && refresh_token) {
    try {
      const res = await postDataApi(`refresh_token/${refresh_token}`);
      dispatch({
        type: GLOBAL_TYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};

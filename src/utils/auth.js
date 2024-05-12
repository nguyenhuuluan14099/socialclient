import Cookies from "js-cookie";

const refresh_token_key = "REFRESH_TOKEN_KEY";
const obj = {
  expires: 30,
  domain: process.env.COOKIE_DOMAIN,
};
export const saveToken = (refresh_token) => {
  if (refresh_token) {
    Cookies.set(refresh_token_key, refresh_token, {
      ...obj,
    });
  } else {
    Cookies.remove(refresh_token_key, {
      ...obj,
      path: "/",
      domain: process.env.COOKIE_DOMAIN,
    });
  }
};

export const getToken = () => {
  const refresh_token = Cookies.get(refresh_token_key);
  return refresh_token;
};

export const Logout = () => {
  window.localStorage.removeItem("firstLogin");
  Cookies.remove(refresh_token_key, {
    ...obj,
    path: "/",
    domain: process.env.COOKIE_DOMAIN,
  });
};

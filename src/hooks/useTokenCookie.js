import { useCookies } from "react-cookie";

export const useTokenCookie = () => {
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);

  const cookieOption = {
    path: "/",
    secure: true,
    sameSite: "strict",
  };

  const setTokenCookie = (token) => {
    setCookies("token", token, cookieOption);
  };

  const removeTokenCookie = () => {
    removeCookies("token", cookieOption);
  };

  const getTokenCookie = () => {
    return cookies.token;
  };

  return {
    getTokenCookie,
    setTokenCookie,
    removeTokenCookie,
  };
};

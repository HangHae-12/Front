import Cookies from "universal-cookie";

const cookie = new Cookies();
const cookiesOption = {
  path: "/",
  secure: true,
  sameSite: "strict",
};

const tokenCookie = {
  get: () => {
    return cookie.get("token");
  },
  set: (token) => cookie.set("token", token, cookiesOption),
  remove: () => cookie.remove("token", cookiesOption),
};

export default tokenCookie;

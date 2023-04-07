import { useEffect } from "react";
import tokenCookie from "../utils/tokenCookie";

const useRemoveToken = () => {
  useEffect(() => {
    !!tokenCookie.get() && tokenCookie.remove();
  }, []);

  return tokenCookie;
};

export default useRemoveToken;

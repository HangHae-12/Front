import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const useKakaoAPI = (onSuccess, onError, api) => {
  const location = useLocation();
  const [code, setCode] = useState("");

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    setCode(code);
  }, [location]);

  useEffect(() => {
    if (!code) return;
    const source = axios.CancelToken.source();
    const request = api(code, source.token);

    request
      .then((res) => {
        onSuccess && onSuccess(res);
      })
      .catch((error) => {
        onError && onError(error);
      });

    return () => {
      source.cancel("인증 요청이 취소되었습니다.");
    };
  }, [code]);
};

export default useKakaoAPI;

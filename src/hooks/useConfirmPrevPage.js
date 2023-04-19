import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useConfirmPrevPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.history.pushState(null, "", "");

    const handlePopState = (e) => {
      e.preventDefault();
      if (window.confirm("모든 정보가 사라집니다. 정말 나가시겠습니까 ?")) {
        navigate("/login");
      } else {
        window.history.pushState(null, "", "");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);
};

export default useConfirmPrevPage;
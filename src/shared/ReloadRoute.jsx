import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReloadRoute = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isReloaded = localStorage.getItem("isReloaded");
        if (isReloaded) {
            localStorage.removeItem("isReloaded");
            navigate("/classes");
        }

        const setReloadFlag = () => {
            localStorage.setItem("isReloaded", "true");
        };

        window.addEventListener("beforeunload", setReloadFlag);

        return () => {
            window.removeEventListener("beforeunload", setReloadFlag);
        };
    }, []);

    return null;
};

export default ReloadRoute;

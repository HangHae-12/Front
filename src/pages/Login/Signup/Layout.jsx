import StyledLogin from "../styled";
import SignupRouteGuard from "./SignupRouteGuard";
import Modal from "../../../components/Modal";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const requiredKeys = {
    "/signup": ["name", "profileImageUrl"],
    "/signup/search": ["name", "profileImageUrl", "role"],
    "/signup/teacher": ["name", "profileImageUrl", "role"],
    "/signup/parent": ["name", "profileImageUrl", "role"],
    "/signup/success": [
      "name",
      "profileImageUrl",
      "kindergartenName",
      "logoImageUrl",
      "role",
    ],
  };

  const modalOption = {
    isCloseButton: false,
    width: "500px",
    height: "300px",
  };

  return (
    <>
      <StyledLogin.Background>
        <StyledLogin.Container>
          <SignupRouteGuard requiredKeys={requiredKeys} />
        </StyledLogin.Container>
      </StyledLogin.Background>
      <Modal modalOption={modalOption} />
    </>
  );
};

export default Layout;

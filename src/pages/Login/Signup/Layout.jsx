import StyledLogin from "../styled";
import SignupRouteGuard from "./SignupRouteGuard";

const Layout = () => {
  const requiredKeys = {
    "/signup": ["name", "profileImageUrl"],
    "/signup/search": ["name", "profileImageUrl", "role"],
    "/signup/teacher": ["name", "profileImageUrl", "role"],
    "/signup/parent": ["name", "profileImageUrl", "role"],
    // "/signup/success": [
    //   "name",
    //   "profileImageUrl",
    //   "kindergartenName",
    //   "logoImageUrl",
    // ],
  };
  return (
    <StyledLogin.Background>
      <StyledLogin.Container>
        <SignupRouteGuard requiredKeys={requiredKeys} />
      </StyledLogin.Container>
    </StyledLogin.Background>
  );
};

export default Layout;

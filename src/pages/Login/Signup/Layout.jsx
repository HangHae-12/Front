import { Outlet } from "react-router-dom";
import StyledLogin from "../styled";

const Layout = () => {
  return (
    <StyledLogin.Background>
      <StyledLogin.Container>
        <Outlet />
      </StyledLogin.Container>
    </StyledLogin.Background>
  );
};

export default Layout;

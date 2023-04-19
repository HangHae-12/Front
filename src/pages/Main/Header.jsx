import { useNavigate } from "react-router-dom";
import ASSETS from "../../helpers/assets";
import styled from "styled-components";
import buttonVariants from "../../styles/variants/buttonVariants";

const Header = () => {
  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <StyledLogo bg={ASSETS.test2}></StyledLogo>
      <StyledHeaderBtnWrapper>
        <StyledHeaderBtn onClick={handleNavigateLogin}>
          킨더그루 이용하기
        </StyledHeaderBtn>
      </StyledHeaderBtnWrapper>
    </>
  );
};

export default Header;

const StyledLogo = styled.div`
  margin-top: 20px;
  width: 250px;
  height: 130px;
  background: url(${(props) => props.bg}) no-repeat center center/contain;
  flex: 0 0 auto;
`;

const StyledHeaderBtnWrapper = styled.div`
  padding: 20px 30px;
`;

const StyledHeaderBtn = styled.button`
  ${buttonVariants.AB_Button}
  display: flex;
  width: min-content;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.primary};
  background: ${({ theme }) => theme.color.green_darker};
  border: none;
  border-radius: 8px;
  white-space: nowrap;
  cursor: pointer;
`;

import styled from "styled-components";
import Buttons from "../Buttons";
import { Link } from "react-router-dom";

const ParentSideBar = () => {

    return (
        <StyledSideBarBtnWrapper>
            <Buttons.NB colorTypes="primary" width="160px">
                <Link to="/classes">학급 관리</Link>
            </Buttons.NB>
            <Buttons.NB colorTypes="primary" width="160px">
                <Link to="/childmanage">아이 관리</Link>
            </Buttons.NB>
        </StyledSideBarBtnWrapper>

    );
};

export default ParentSideBar;

const StyledSideBarBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 80px;
  gap: 12px;
`;

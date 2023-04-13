import { useState } from "react";
import styled from "styled-components";
import Buttons from "../Buttons";
import { Link } from "react-router-dom";
import textVariants from "../../styles/variants/textVariants";

const TeacherSideBar = () => {
    const [showAttendanceMenu, setShowAttendanceMenu] = useState(false);

    const toggleAttendanceMenu = () => {
        setShowAttendanceMenu(!showAttendanceMenu);
    };
    return (
        <StyledSideBarBtnWrapper>
            <Buttons.NB>
                <Link to="/kindergrew/host">등/하원 관리</Link>
            </Buttons.NB>
            <div>
                <Buttons.NB onClick={toggleAttendanceMenu}>출석부 관리</Buttons.NB>
                {showAttendanceMenu && (
                    <StyledSubMenu>
                        <Link to="/kindergrew/monthAttendance">월별 출석부</Link>
                        <Link to="/kindergrew/dayAttendance">일별 출석부</Link>
                    </StyledSubMenu>
                )}
            </div>
            <Buttons.NB colorTypes="primary" width="160px">
                <Link to="/kindergrew/classes">학급 관리</Link>
            </Buttons.NB>
        </StyledSideBarBtnWrapper>

    );
};

export default TeacherSideBar;


const StyledSideBarBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 80px;
  gap: 12px;
`;
const StyledSubMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 12px;
  gap: 14px;

  a {
    ${textVariants.Body1_SemiBold}
    color: ${({ theme }) => theme.color.grayScale[400]};
    padding: 8px 0px;
    width: 100%;
    text-align: center;
    border-radius: 8px;

    &:hover {
      color: ${({ theme }) => theme.color.primary};
    }
  }
`;

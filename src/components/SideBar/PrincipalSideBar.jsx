import { useState } from "react";
import styled from "styled-components";
import Buttons from "../Buttons";
import { CustomButton } from "../../components/Buttons";
import { Link } from "react-router-dom";
import textVariants from "../../styles/variants/textVariants";

const PrincipalSideBar = () => {
    const [showAttendanceMenu, setShowAttendanceMenu] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleSideMenu = (id) => {
        if (id !== 2) {
            setSelectedIndex(id);
            setShowAttendanceMenu(false);
        }
        else
            setShowAttendanceMenu(true);
    }
    return (
        <StyledSideBarBtnWrapper>
            <CustomButton
                colorTypes={selectedIndex === 0 ? "primary" : undefined}
                buttonsTypes="NB_Button"
                onClick={() => handleSideMenu(0)}
            >
                <Link to="/kindergrew/membermanage">멤버 관리</Link>
            </CustomButton>
            <CustomButton
                colorTypes={selectedIndex === 1 ? "primary" : undefined}
                buttonsTypes="NB_Button"
                onClick={() => handleSideMenu(1)}
            >
                <Link to="/kindergrew/host">등/하원 관리</Link>
            </CustomButton>
            <div>
                <CustomButton
                    colorTypes={selectedIndex === 2 ? "primary" : undefined}
                    buttonsTypes="NB_Button"
                    onClick={() => handleSideMenu(2)}
                >
                    출석부 관리
                </CustomButton>
                {showAttendanceMenu && (
                    <StyledSubMenu>
                        <Link to="/kindergrew/monthAttendance">월별 출석부</Link>
                        <Link to="/kindergrew/dayAttendance">일별 출석부</Link>
                    </StyledSubMenu>
                )}
            </div>
            <CustomButton
                colorTypes={selectedIndex === 3 ? "primary" : undefined}
                buttonsTypes="NB_Button"
                onClick={() => handleSideMenu(3)}
            >
                <Link to="/kindergrew/classes">학급 관리</Link>
            </CustomButton>
        </StyledSideBarBtnWrapper>
    );
};


export default PrincipalSideBar;


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

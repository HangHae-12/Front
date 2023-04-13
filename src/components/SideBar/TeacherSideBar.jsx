import { useState } from "react";
import styled from "styled-components";
import { CustomButton } from "../../components/Buttons";
import { Link } from "react-router-dom";
import textVariants from "../../styles/variants/textVariants";

const TeacherSideBar = () => {
    const [showAttendanceMenu, setShowAttendanceMenu] = useState(false);
    const [subMenuSelectedIndex, setSubMenuSelectedIndex] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const handleSideMenu = (id) => {
        if (id !== 2) {
            setSelectedIndex(id);
            setShowAttendanceMenu(false);
            setSubMenuSelectedIndex(null);
        }
        else {
            setSelectedIndex(id);
            setShowAttendanceMenu(true);
            setSubMenuSelectedIndex(null);
        }

    }

    return (
        <StyledSideBarBtnWrapper>
            <CustomButton
                colorTypes={selectedIndex === 1 ? "primary" : undefined}
                buttonsTypes="NB_Button"
                onClick={() => handleSideMenu(1)}
            >
                <Link to="/host">등/하원 관리</Link>
            </CustomButton>
            <StyledMenuWrapper showBorder={selectedIndex === 2}>
                <CustomButton
                    colorTypes={selectedIndex === 2 ? "primary" : undefined}
                    buttonsTypes="NB_Button"
                    onClick={() => handleSideMenu(2)}
                >
                    출석부 관리
                </CustomButton>

                {showAttendanceMenu && (
                    <StyledSubMenu>
                        <Link
                            to="/monthAttendance"
                            onClick={() => setSubMenuSelectedIndex(0)}
                            className={subMenuSelectedIndex === 0 ? "active" : ""}
                        >
                            월별 출석부
                        </Link>
                        <Link
                            to="/dayAttendance"
                            onClick={() => setSubMenuSelectedIndex(1)}
                            className={subMenuSelectedIndex === 1 ? "active" : ""}
                        >
                            일별 출석부
                        </Link>
                    </StyledSubMenu>
                )}


            </StyledMenuWrapper>
            <CustomButton
                colorTypes={selectedIndex === 3 ? "primary" : undefined}
                buttonsTypes="NB_Button"
                onClick={() => handleSideMenu(3)}
            >
                <Link to="/classes">학급 관리</Link>
            </CustomButton>
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
const StyledMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${({ showBorder, theme }) => showBorder ? `1px solid ${theme.color.primary}` : 'none'};
  border-radius: 4px;
`

const StyledSubMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 12px auto;
  gap: 14px;

  a {
    ${textVariants.Body1_SemiBold}
    color: ${({ theme }) => theme.color.grayScale[400]};
    padding: 8px 0px;
    width: 100%;
    text-align: center;
    border-radius: 8px;

    &:hover,
    &.active {
      color: ${({ theme }) => theme.color.primary};
    }
  }
`;
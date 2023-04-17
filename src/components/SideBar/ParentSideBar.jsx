import { useState } from "react";
import styled from "styled-components";
import { CustomButton } from "../../components/Buttons";
import { Link } from "react-router-dom";

const ParentSideBar = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleSideMenu = (id) => {

        setSelectedIndex(id);
    }


    return (
        <StyledSideBarBtnWrapper>
            <Link to="/classes">
                <CustomButton
                    colorTypes={selectedIndex === 0 ? "primary" : undefined}
                    buttonsTypes="NB_Button"
                    onClick={() => handleSideMenu(0)}
                >
                    학급 관리
                </CustomButton>
            </Link>
            <Link to="/childmanage">
                <CustomButton
                    colorTypes={selectedIndex === 1 ? "primary" : undefined}
                    buttonsTypes="NB_Button"
                    onClick={() => handleSideMenu(1)}
                >
                    아이 관리
                </CustomButton>
            </Link>
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
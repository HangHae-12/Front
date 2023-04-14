import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";


const InviteMemberButton = ({ onPageReset }) => {

    const [selectedButton, setSelectedButton] = useState("학부모");
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const handleButtonClick = async (selected, id) => {
        setSelectedButton(selected);
        onPageReset();
        navigate(`/memberManage/${id}`);
        queryClient.invalidateQueries(["getMemberManage"]);
    };
    return (
        <StyledButtonWrapper>
            <Button.ClassButton
                selected={"학부모"}
                selectedButton={selectedButton}
                onClick={() => handleButtonClick("학부모", 1)}
            />
            <Button.ClassButton
                selected={"선생님"}
                selectedButton={selectedButton}
                onClick={() => handleButtonClick("선생님", 2)}
            />
        </StyledButtonWrapper>
    );
};

export default InviteMemberButton;

const StyledButtonWrapper = styled.div`
  padding-bottom: 24px;
`;
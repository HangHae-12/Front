import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";


const InviteMemberButton = ({ onPageReset }) => {

    const navigate = useNavigate();
    const { id = "1" } = useParams();
    const queryClient = useQueryClient();
    const handleButtonClick = async (id) => {
        onPageReset();
        navigate(`/memberManage/${id}`);
        queryClient.invalidateQueries(["getMemberManage"]);
    };
    return (
        <StyledButtonWrapper>
            <Button.ClassButton
                selected={"학부모"}
                isSelected={"1" === id}
                onClick={() => handleButtonClick("1")}
            />
            <Button.ClassButton
                selected={"선생님"}
                isSelected={"2" === id}
                onClick={() => handleButtonClick("2")}
            />
        </StyledButtonWrapper>
    );
};

export default InviteMemberButton;

const StyledButtonWrapper = styled.div`
  padding-bottom: 24px;
`;
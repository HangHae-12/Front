import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";


const ClassButton = () => {

    const navigate = useNavigate();
    const [selectedButton, setSelectedButton] = useState("새빛반");



    const loadClassroom = (selected, id) => {
        setSelectedButton(selected)
        navigate(`/attendance/${id}`)
    };

    return (
        <StyledClassButtonGroup>
            <Button.ClassButton
                selected={"새빛반"}
                selectedButton={selectedButton}
                onClick={() => loadClassroom("새빛반", 1)}
            />
            <Button.ClassButton
                selected={"동동반"}
                selectedButton={selectedButton}
                onClick={() => loadClassroom("동동반", 2)}
            />
            <Button.ClassButton
                selected={"빗살반"}
                selectedButton={selectedButton}
                onClick={() => loadClassroom("빗살반", 3)}
            />
        </StyledClassButtonGroup>
    );
};

export default ClassButton;

const StyledClassButtonGroup = styled.div`
padding-bottom: 10px;
`;
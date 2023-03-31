import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";

const ClassButton = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { classroomId } = useParams();
    const [selectedButton, setSelectedButton] = useState("모든반");

    const [classId, setClassId] = useState(0);

    const loadClassroom = (selected, id) => {
        setSelectedButton(selected);
        setClassId(id);
        navigate(`/host/${classId}`, { replace: true }, () => {
            queryClient.invalidateQueries(["getManageClass", classroomId]);
        });
    };

    return (
        <StyledClassButtonGroup>
            <Button.ClassButton
                selected={"모든반"}
                selectedButton={selectedButton}
                onClick={() => loadClassroom("모든반", 0)}
            />
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

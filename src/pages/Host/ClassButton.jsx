import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { scheduledIdAtom, classIdAtom, timeAtom } from "../../atom/hostButtonAtom";

const ClassButton = () => {
    const setClassId = useSetRecoilState(classIdAtom);
    const setScheduleId = useSetRecoilState(scheduledIdAtom);
    const setTime = useSetRecoilState(timeAtom);
    const navigate = useNavigate();
    const [selectedButton, setSelectedButton] = useState("모든반");
    const queryClient = useQueryClient();


    const loadClassroom = (selected, id) => {
        setSelectedButton(selected);
        setClassId(id);
        setScheduleId("ENTER");
        setTime("전체시간");
        navigate(`/host/${id}/ENTER/전체시간`)

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
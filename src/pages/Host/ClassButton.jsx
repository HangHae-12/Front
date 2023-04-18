import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { useSetRecoilState } from "recoil";
import { scheduledIdAtom, timeAtom, paginationAtom } from "../../atom/hostButtonAtom";

const ClassButton = ({ hostParams, everyClass }) => {
    const { classroomId = "0" } = useParams();
    const setPage = useSetRecoilState(paginationAtom);
    const setScheduleId = useSetRecoilState(scheduledIdAtom);
    const setTime = useSetRecoilState(timeAtom);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [selectedButton, setSelectedButton] = useState(classroomId);


    useEffect(() => {
        setSelectedButton(classroomId);
    }, [classroomId]);


    const loadClassroom = (id) => {
        setSelectedButton(id);
        setScheduleId("ENTER");
        setTime(0);
        setPage(1);
        navigate(`/host/${id}/ENTER/0`, () => {
            queryClient.invalidateQueries(["getManageTimeSchedule", hostParams]);
        });
    };

    return (
        <StyledClassButtonGroup>
            <Button.ClassButton
                key={0}
                selected="모든반"
                isSelected={classroomId === '0'}
                onClick={() => loadClassroom('0')}
            />
            {everyClass.map((classroom) => (
                <Button.ClassButton
                    key={classroom.id}
                    selected={classroom.name}
                    isSelected={classroomId === classroom.id.toString()}
                    onClick={() => loadClassroom(classroom.id.toString())}
                />
            ))}
        </StyledClassButtonGroup>
    );
};

export default ClassButton;

const StyledClassButtonGroup = styled.div`
  padding-bottom: 10px;
`;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import Buttons from "../../components/Buttons";


const Schedule = (hostParams) => {

    const queryClient = useQueryClient();
    const { classroomId, scheduleId, timeId } = useParams();
    const navigate = useNavigate();
    const [scheduledId, setScheduleId] = useState("ENTER");

    const handleAttendanceButton = (ScheduleId) => {
        setScheduleId(ScheduleId);
        navigate(`/host/${classroomId}/${ScheduleId}/전체시간`, { replace: true }, () => {
            queryClient.invalidateQueries(["getManageTimeSchedule", hostParams]);
        });
    };

    return (
        <StyledAttendanceButtonGroup>
            {scheduledId === "ENTER" ? (
                <StyledABBtn
                    onClick={() => handleAttendanceButton("ENTER")}>등원인원</StyledABBtn>
            ) : (
                <Buttons.AB
                    onClick={() => handleAttendanceButton("ENTER")}>등원인원</Buttons.AB>
            )}
            {scheduledId === "EXIT" ? (
                <StyledABBtn
                    onClick={() => handleAttendanceButton("EXIT")}>하원인원</StyledABBtn>
            ) : (
                <Buttons.AB
                    onClick={() => handleAttendanceButton("EXIT")}>하원인원</Buttons.AB>
            )}
        </StyledAttendanceButtonGroup>
    );
};

export default Schedule;

const StyledAttendanceButtonGroup = styled.div`
    padding-top: 64px;
    gap: 10px;
`;
const StyledABBtn = styled(Buttons.AB)`
  color: ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.green_darker};
`;
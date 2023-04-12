import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Buttons from "../../components/Buttons";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { scheduledIdAtom, timeAtom, paginationAtom } from "../../atom/hostButtonAtom";

const Schedule = ({ hostParams }) => {
    //param,전역상태 모두 사용하는 이유는 전체시간,반을 눌렀을때 defalt값을 설정하기 위해서
    const setScheduleId = useSetRecoilState(scheduledIdAtom);
    const scheduledId = useRecoilValue(scheduledIdAtom);
    const setTime = useSetRecoilState(timeAtom);
    const setPage = useSetRecoilState(paginationAtom);
    const queryClient = useQueryClient();
    const { classroomId = 0 } = useParams();
    const navigate = useNavigate();

    //도메인과 reponse값 매칭해서 리팩토링 필요
    const handleAttendanceButton = (id) => {
        setScheduleId(id);
        setTime("전체시간");
        setPage(1);
        navigate(`/host/${classroomId}/${id}/전체시간`, () => {
            queryClient.invalidateQueries(["getManageTimeSchedule", hostParams]);
        });
    };

    return (
        <StyledAttendanceButtonGroup>
            {
                scheduledId === "ENTER"
                    ? <StyledABBtn onClick={() => handleAttendanceButton("ENTER")}>등원인원</StyledABBtn>
                    : <Buttons.AB onClick={() => handleAttendanceButton("ENTER")}>등원인원</Buttons.AB>
            }
            {
                scheduledId === "EXIT"
                    ? <StyledABBtn onClick={() => handleAttendanceButton("EXIT")}>하원인원</StyledABBtn>
                    : <Buttons.AB onClick={() => handleAttendanceButton("EXIT")}>하원인원</Buttons.AB>}
        </StyledAttendanceButtonGroup>
    );
};

export default Schedule;

const StyledAttendanceButtonGroup = styled.div`
    display: flex;
    padding-top: 20px;
    margin-left: 30px;
    gap: 10px;
    
`;
const StyledABBtn = styled(Buttons.AB)`
  color: ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.green_darker};
  
  
`;
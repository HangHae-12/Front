import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Buttons from "../../components/Buttons";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { timeAtom, paginationAtom } from "../../atom/hostButtonAtom";
const ExitTime = () => {
    const setTime = useSetRecoilState(timeAtom);
    const time = useRecoilValue(timeAtom);
    const setPage = useSetRecoilState(paginationAtom);
    const { classroomId = 0, scheduleId = "ENTER" } = useParams();
    const navigate = useNavigate();



    const handleTimeButton = (timeId) => {
        setTime(timeId);
        setPage(1);
        navigate(`/host/${classroomId}/${scheduleId}/${timeId}`)
    };
    return (
        <StyledTimeButtonGroup>

            {time === 0 ? (
                <Buttons.Time
                    colorTypes="primary"
                    onClick={() => { handleTimeButton(0) }}>전체시간</Buttons.Time>
            ) : (
                <Buttons.Time
                    onClick={() => { handleTimeButton(0) }}>전체시간</Buttons.Time>
            )}
            {time === 4 ? (
                <Buttons.Time
                    colorTypes="primary"
                    onClick={() => { handleTimeButton(4) }}>16시~17시</Buttons.Time>
            ) : (
                <Buttons.Time
                    onClick={() => { handleTimeButton(4) }}>16시~17시</Buttons.Time>
            )}
            {time === 5 ? (
                <Buttons.Time
                    colorTypes="primary"
                    onClick={() => { handleTimeButton(5) }}>17시~18시</Buttons.Time>
            ) : (
                <Buttons.Time
                    onClick={() => { handleTimeButton(5) }}>17시~18시</Buttons.Time>
            )}
            {time === 6 ? (
                <Buttons.Time
                    colorTypes="primary"
                    onClick={() => { handleTimeButton(6) }}>18시~19시</Buttons.Time>
            ) : (
                <Buttons.Time
                    onClick={() => { handleTimeButton(6) }}>18시~19시</Buttons.Time>
            )}
        </StyledTimeButtonGroup>
    );
};

export default ExitTime;

const StyledTimeButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap:12px;
`;
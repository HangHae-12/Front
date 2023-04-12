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

            {time === "전체시간" ? (
                <Buttons.Time
                    colorTypes="primary"
                    onClick={() => { handleTimeButton("전체시간") }}>전체시간</Buttons.Time>
            ) : (
                <Buttons.Time
                    onClick={() => { handleTimeButton("전체시간") }}>전체시간</Buttons.Time>
            )}
            {time === "16시~17시" ? (
                <Buttons.Time
                    colorTypes="primary"
                    onClick={() => { handleTimeButton("16시~17시") }}>16시~17시</Buttons.Time>
            ) : (
                <Buttons.Time
                    onClick={() => { handleTimeButton("16시~17시") }}>16시~17시</Buttons.Time>
            )}
            {time === "17시~18시" ? (
                <Buttons.Time
                    colorTypes="primary"
                    onClick={() => { handleTimeButton("17시~18시") }}>17시~18시</Buttons.Time>
            ) : (
                <Buttons.Time
                    onClick={() => { handleTimeButton("17시~18시") }}>17시~18시</Buttons.Time>
            )}
            {time === "18시~19시" ? (
                <Buttons.Time
                    colorTypes="primary"
                    onClick={() => { handleTimeButton("18시~19시") }}>18시~19시</Buttons.Time>
            ) : (
                <Buttons.Time
                    onClick={() => { handleTimeButton("18시~19시") }}>18시~19시</Buttons.Time>
            )}
        </StyledTimeButtonGroup>
    );
};

export default ExitTime;

const StyledTimeButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`;
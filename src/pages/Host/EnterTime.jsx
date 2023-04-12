import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Buttons from "../../components/Buttons";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { timeAtom, paginationAtom } from "../../atom/hostButtonAtom";

const EnterTime = () => {
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
            {time === 1 ? (
                <Buttons.Time
                    colorTypes="primary"
                    onClick={() => { handleTimeButton(1) }}>07시 ~ 08시</Buttons.Time>
            ) : (
                <Buttons.Time
                    onClick={() => { handleTimeButton(1) }}>07시 ~ 08시</Buttons.Time>
            )}
            {time === 2 ? (
                <Buttons.Time
                    colorTypes="primary"
                    onClick={() => { handleTimeButton(2) }}>08시~09시</Buttons.Time>
            ) : (
                <Buttons.Time
                    onClick={() => { handleTimeButton(2) }}>08시~09시</Buttons.Time>
            )}
            {time === 3 ? (
                <Buttons.Time
                    colorTypes="primary"
                    onClick={() => { handleTimeButton(3) }}>09시~10시</Buttons.Time>
            ) : (
                <Buttons.Time
                    onClick={() => { handleTimeButton(3) }}>09시~10시</Buttons.Time>
            )}
        </StyledTimeButtonGroup>
    );
};

export default EnterTime;

const StyledTimeButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap:12px;
`;
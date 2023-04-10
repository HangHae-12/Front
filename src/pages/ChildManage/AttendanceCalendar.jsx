import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import textVariants from "../../styles/variants/textVariants";
import DUMMY from "./DUMMY";

const AttendanceCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const goToPrevMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, "month"));
  };

  const renderDays = () => {
    const days = [];
    const startOfMonth = currentMonth.clone().startOf("month");
    const endOfMonth = currentMonth.clone().endOf("month");
    const today = moment();
    let currentDay = startOfMonth.clone().startOf("isoWeek");

    while (currentDay.isSameOrBefore(endOfMonth)) {
      if (currentDay.isoWeekday() <= 5) {
        days.push(
          <Day key={currentDay.format("YYYY-MM-DD")}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "37px",
              }}
            >
              {currentDay.month() === currentMonth.month() ? (
                <Date>{currentDay.date()}</Date>
              ) : null}
              {currentDay.isSameOrBefore(today, "day") &&
              currentDay.month() === currentMonth.month() ? (
                <AttendanceLabel isAttendance={true} />
              ) : null}
            </div>
            {currentDay.isSameOrBefore(today, "day") &&
            currentDay.month() === currentMonth.month() ? (
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>등원</div>
                  <div>07:30분</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>하원</div>
                  <div>16:30분</div>
                </div>
              </div>
            ) : currentDay.month() === currentMonth.month() &&
              currentDay.isAfter(today, "day") ? (
              <div>아직이요</div>
            ) : null}
          </Day>
        );
      }
      currentDay = currentDay.add(1, "day");
    }

    return days;
  };

  return (
    <>
      <CalendarWrapper>
        <CalendarHeader>
          <div>
            <h2>출석 기록</h2>
            <div className="toolbar-controls">
              <button onClick={goToPrevMonth}>&lt;</button>
              <span>
                {currentMonth.format("YYYY")}년 {currentMonth.format("M")}월
              </span>
              <button onClick={goToNextMonth}>&gt;</button>
            </div>
          </div>
          <div>
            <span>출석 {0}</span>
            <span>결석 {0}</span>
          </div>
        </CalendarHeader>
        <WeekdayWrapper>
          {["월", "화", "수", "목", "금"].map((weekday) => (
            <Weekday key={weekday}>{weekday}</Weekday>
          ))}
        </WeekdayWrapper>
        <CalendarBody>{renderDays()}</CalendarBody>
      </CalendarWrapper>
    </>
  );
};

export default AttendanceCalendar;

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .toolbar-controls {
    display: flex;
    align-items: center;

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      font-size: 1.5rem;
      padding: 0 0.5rem;
    }
  }
`;

const CalendarBody = styled.div`
  display: grid;
  width: 100%;
  max-width: 1000px;
  grid-template-columns: repeat(5, 1fr);
`;

const Day = styled.span`
  position: relative;
  width: 200px;
  height: 160px;
  padding: 17px 17px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
`;

const Date = styled.div`
  position: relative;
  ${textVariants.H3_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  padding: 1rem;
`;

const WeekdayWrapper = styled.div`
  ${textVariants.Body1_Bold}
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  max-width: 1000px;
  color: ${({ theme }) => theme.color.grayScale[500]};
  background: ${({ theme }) => theme.color.grayScale[50]};
`;

const Weekday = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  border-bottom: none;
`;

const AttendanceLabel = styled.div`
  position: relative;

  width: 42px;
  height: 42px;
  border-radius: 50%;
  transform: rotate(-30deg);
  border: 2px solid
    ${({ theme, isAttendance }) =>
      isAttendance ? theme.color.primary : theme.color.perple};

  &::before {
    ${textVariants.Body2_SemiBold}
    content: ${({ isAttendance }) => (isAttendance ? `"출석"` : `"결석"`)};
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme, isAttendance }) =>
      isAttendance ? theme.color.primary : theme.color.perple};
    white-space: nowrap;
  }
`;

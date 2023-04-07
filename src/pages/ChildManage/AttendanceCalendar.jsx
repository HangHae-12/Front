import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";

const AttendanceCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const startOfMonth = currentMonth.clone().startOf("month");
  const endOfMonth = currentMonth.clone().endOf("month");
  const weekdays = ["월", "화", "수", "목", "금"];

  let days = [];
  let currentDay = startOfMonth;

  while (currentDay <= endOfMonth) {
    if (currentDay.isoWeekday() <= 5) {
      days.push(currentDay.clone());
    }
    currentDay = currentDay.add(1, "day");
  }

  const goToPrevMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, "month"));
  };

  return (
    <>
      <CalendarHeader>
        <div>
          <h2>출석 기록</h2>
          <div className="toolbar-controls">
            <button onClick={() => goToPrevMonth()}>&lt;</button>
            <span>
              {currentMonth.format("YYYY")}년 {currentMonth.format("M")}월
            </span>
            <button onClick={() => goToNextMonth()}>&gt;</button>
          </div>
        </div>
        <div>
          <span>출석 {0}</span>
          <span>결석 {0}</span>
        </div>
      </CalendarHeader>
      <StyledAttendanceCalendar>
        {weekdays.map((weekday) => (
          <div key={weekday}>{weekday}</div>
        ))}
        {days.map((day) => (
          <div key={day.format("YYYY-MM-DD")}>{day.format("D")}</div>
        ))}
      </StyledAttendanceCalendar>
    </>
  );
};

export default AttendanceCalendar;

const StyledAttendanceCalendar = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  h2 {
    margin: 0;
    margin-bottom: 0.5rem;
  }

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

  span {
    margin: 0 1rem;
  }
`;

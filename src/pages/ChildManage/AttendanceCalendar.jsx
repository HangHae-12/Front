import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";

const AttendanceCalendar = () => {
  const currentMonth = moment();
  const startOfMonth = currentMonth.clone().startOf("month");
  const endOfMonth = currentMonth.clone().endOf("month");
  const weekdays = ["월", "화", "수", "목", "금"];

  let days = [];
  let currentDay = startOfMonth;

  while (currentDay <= endOfMonth) {
    if (currentDay.isoWeekday() <= 5) {
      // 월요일부터 금요일까지만 추가
      days.push(currentDay.clone());
    }
    currentDay = currentDay.add(1, "day");
  }

  return (
    <StyledAttendanceCalendar>
      {weekdays.map((weekday) => (
        <div key={weekday}>{weekday}</div>
      ))}
      {days.map((day) => (
        <div key={day.format("YYYY-MM-DD")}>{day.format("D")}</div>
      ))}
    </StyledAttendanceCalendar>
  );
};

export default AttendanceCalendar;

const StyledAttendanceCalendar = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
`;

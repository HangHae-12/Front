import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styled from "styled-components";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Event 1",
    start: new Date(),
    end: new Date(),
  },
  {
    title: "Event 2",
    start: new Date(),
    end: new Date(),
  },
];

const AttendanceCalendar = () => {
  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        view={["month"]}
        onView={() => {}}
        defaultView={["month"]}
        events={events}
        startAccessor="start"
        endAccessor="end"
        components={{ toolbar: CalendarHeader }}
      />
    </div>
  );
};

export default AttendanceCalendar;

const CalendarHeader = (toolbar) => {
  const goToPrevMonth = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate("prev");
  };

  const goToNextMonth = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate("next");
  };

  const currentYear = toolbar.date.getFullYear();
  const currentMonth = toolbar.date.getMonth() + 1;

  return (
    <ToolbarWrapper>
      <div>
        <h2>출석 기록</h2>
        <div className="toolbar-controls">
          <button onClick={() => goToPrevMonth()}>&lt;</button>
          <span>
            {currentYear}년 {currentMonth}월
          </span>
          <button onClick={() => goToNextMonth()}>&gt;</button>
        </div>
      </div>
      <div>
        <span>출석 {0}</span>
        <span>결석 {0}</span>
      </div>
    </ToolbarWrapper>
  );
};

const ToolbarWrapper = styled.div`
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

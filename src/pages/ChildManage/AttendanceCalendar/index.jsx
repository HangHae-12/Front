import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ko";
import "./AttendanceCalendar.css";
import styled, { css } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  contentSelector,
  infoSelector,
} from "../../../atom/attendanceManageAtom";
import textVariants from "../../../styles/variants/textVariants";
import StyledChildmanage from "../styled";
import { dateAtom } from "../../../atom/dateAtom";
import CalendarToolbar from "./CalendarToolbar";

const AttendanceCalendar = () => {
  moment.locale("ko");
  const localizer = momentLocalizer(moment);
  const content = useRecoilValue(contentSelector);
  console.log(content);

  const myEventsList = content.map(({ date, enterTime, exitTime, status }) => {
    return {
      start: new Date(moment().year(), moment().month(), date),
      end: new Date(moment().year(), moment().month(), date),
      enterTime,
      exitTime,
      status,
    };
  });

  const MyMonthHeader = ({ label }) => {
    const headerDate = label;
    return <MonthHeaderWrapper>{headerDate}</MonthHeaderWrapper>;
  };

  const MonthHeaderWrapper = styled.div`
    ${textVariants.Body1_Bold}
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.color.grayScale[500]};
  `;

  const MyMonthDateHeader = ({ date }) => {
    const headerDate = moment(date).format("D");
    return (
      <StyledMyMonthDateHeader>
        <div>{headerDate}</div>
      </StyledMyMonthDateHeader>
    );
  };

  const StyledMyMonthDateHeader = styled.div`
    display: flex;
    width: 120px;

    & > div {
      padding: 14px 0 0 14px;
    }
  `;

  const MyMonthEvent = ({ event }) => {
    const { enterTime, exitTime, status } = event;

    return (
      <EventWrapper>
        <div>Enter: {enterTime}</div>
        <div>Exit: {exitTime}</div>
        <AttendanceLabel isAttendance={status === "출석"} />
      </EventWrapper>
    );
  };

  const EventWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 142px;
    height: 142px;
  `;

  return (
    <Calendar
      views={{
        month: true,
      }}
      localizer={localizer}
      events={myEventsList}
      style={{ width: 1000, height: 800 }}
      components={{
        toolbar: CalendarToolbar,
        month: {
          header: MyMonthHeader,
          dateHeader: MyMonthDateHeader,
        },
        event: MyMonthEvent,
      }}
    />
  );
};

export default AttendanceCalendar;

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

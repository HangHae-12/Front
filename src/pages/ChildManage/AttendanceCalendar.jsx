import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ko";
import "./AttendanceCalendar.css";
import styled, { css } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useRecoilState, useRecoilValue } from "recoil";
import { contentSelector, infoSelector } from "../../atom/attendanceManageAtom";
import textVariants from "../../styles/variants/textVariants";
import StyledChildmanage from "./styled";
import { dateAtom } from "../../atom/dateAtom";

const views = {
  month: true,
};

const AttendanceCalendar = () => {
  moment.locale("ko");
  const localizer = momentLocalizer(moment);
  const content = useRecoilValue(contentSelector);
  const info = useRecoilValue(infoSelector);
  console.log(content, info);
  const [date, setDate] = useRecoilState(dateAtom);

  const myEventsList = content.map(({ date, enterTime, exitTime, status }) => {
    return {
      start: new Date(moment().year(), moment().month(), date),
      end: new Date(moment().year(), moment().month(), date),
      enterTime,
      exitTime,
      status,
    };
  });

  const handlePrevMonth = (onNavigate) => {
    onNavigate("PREV");
    const prevMonth = date.month - 1;
    const year = prevMonth === 0 ? date.year - 1 : date.year;
    const month = prevMonth === 0 ? 12 : prevMonth;
    setDate({ year, month });
    console.log(date);
  };
  
  const handleNextMonth = (onNavigate) => {
    onNavigate("NEXT");
    const nextMonth = date.month + 1;
    const year = nextMonth === 13 ? date.year + 1 : date.year;
    const month = nextMonth === 13 ? 1 : nextMonth;
    setDate({ year, month });
    console.log(date);
  };

  const HeaderComponent = ({ label, onNavigate }) => (
    <HeaderContainer>
      <StyledChildmanage.Title>출결관리</StyledChildmanage.Title>
      <NavigationContainer>
        <PrevButton onClick={() => handlePrevMonth(onNavigate)} />
        <NavigationTitle>{label}</NavigationTitle>
        <NextButton onClick={() => handleNextMonth(onNavigate)} />
      </NavigationContainer>
      <AttendanceContainer>
        <AttendanceCalendarInfoBox boxColor="primary">
          <h3>출석</h3>
          <span>{info?.absentCount}</span>
        </AttendanceCalendarInfoBox>
        <AttendanceCalendarInfoBox boxColor="perple">
          <h3>결석</h3>
          <span>{info.attendanceCount}</span>
        </AttendanceCalendarInfoBox>
      </AttendanceContainer>
    </HeaderContainer>
  );

  const MyMonthHeader = ({ label }) => {
    const headerDate = label;
    return <MonthHeaderWrapper>{headerDate}</MonthHeaderWrapper>;
  };

  const MyMonthDateHeader = ({ date }) => {
    const headerDate = moment(date).format("D");
    return (
      <StyledMyMonthDateHeader>
        <div>{headerDate}</div>
      </StyledMyMonthDateHeader>
    );
  };

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

  return (
    <Calendar
      views={views}
      events={myEventsList}
      localizer={localizer}
      style={{ width: 1000, height: 800 }}
      components={{
        toolbar: HeaderComponent,
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

const AttendanceCalendarInfoBox = styled.div`
  display: flex;
  width: 115px;
  height: 44px;
  padding: 0px 8px;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  ${({ boxColor, theme }) => {
    const colors = {
      primary: {
        background: theme.color.green_darker,
        h3Color: theme.color.primary,
      },
      perple: {
        background: theme.color.perple_lighter,
        h3Color: theme.color.perple,
      },
    };

    return css`
      background-color: ${colors[boxColor].background};
      h3 {
        color: ${colors[boxColor].h3Color};
      }
    `;
  }}
  span {
    ${textVariants.H3_SemiBold}
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 50px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.color.grayScale[500]};
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 22px;
`;

const PrevButton = styled(AiOutlineLeft)`
  font-size: 20px;
`;
const NextButton = styled(AiOutlineRight)`
  font-size: 20px;
`;

const NavigationTitle = styled.div`
  ${textVariants.H3_SemiBold}
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.grayScale[500]};
`;

const AttendanceContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const MonthHeaderWrapper = styled.div`
  ${textVariants.Body1_Bold}
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.grayScale[500]};
`;

const StyledMyMonthDateHeader = styled.div`
  display: flex;
  width: 120px;

  & > div {
    padding: 14px 0 0 14px;
    /* font-weight: bold; */
  }
`;

const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 142px;
  height: 142px;
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

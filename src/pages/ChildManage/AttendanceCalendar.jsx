import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ko";
import "./AttendanceCalendar.css";
import styled from "styled-components";

const myEventsList = [
  {
    start: new Date(2023, 3, 14),
    end: new Date(2023, 3, 14),
    enteredTime: "07:30",
  },
  {
    start: new Date(2023, 3, 14),
    end: new Date(2023, 3, 14),
    leaveTime: "07:30",
  },
];

const views = {
  month: true,
};

const AttendanceCalendar = (props) => {
  moment.locale("ko"); // moment 라이브러리를 한국어로 설정
  const localizer = momentLocalizer(moment);

  const HeaderComponent = ({ label, onNavigate }) => (
    <HeaderContainer>
      <Title>출결관리</Title>
      <NavigationContainer>
        <NavigationButton onClick={() => onNavigate("PREV")}>
          &lt;
        </NavigationButton>
        <NavigationTitle>{label}</NavigationTitle>
        <NavigationButton onClick={() => onNavigate("NEXT")}>
          &gt;
        </NavigationButton>
      </NavigationContainer>
      <AttendanceContainer>
        <AttendanceItem
          backgroundColor="rgb(192, 255, 192)"
          color="rgb(30, 138, 30)"
        >
          출석 16
        </AttendanceItem>
        <AttendanceItem
          backgroundColor="rgb(228, 205, 255)"
          color="rgb(109, 52, 255)"
        >
          결석 3
        </AttendanceItem>
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

  const MyMonthEvent = ({ date }) => {
    return (
      <EventWrapper>
        {myEventsList.map((event) => {
          return <div> {event.leaveTime} </div>;
        })}
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
          event: MyMonthEvent,
        },
      }}
    />
  );
};

export default AttendanceCalendar;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 30%;
  font-size: 16px;
  font-weight: bold;
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 20px;
`;

const NavigationButton = styled.button`
  background-color: transparent;
`;

const NavigationTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  font-size: 20px;
  font-weight: bold;
`;

const AttendanceContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 30%;
  font-size: 16px;
  font-weight: bold;
  gap: 10px;
`;

const AttendanceItem = styled.div`
  width: 90px;
  padding: 5px 10px;
  border-radius: 6px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
`;

const MonthHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: bold;
`;

const StyledMyMonthDateHeader = styled.div`
  display: flex;
  width: 120px;

  & > div {
    padding: 14px 0 0 14px;
    font-weight: bold;
  }
`;

const EventWrapper = styled.div`
  display: flex;
  width: 120px;
  font-weight: bold;
`;

import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ko";
import "./AttendanceCalendar.css";
import { useRecoilValue } from "recoil";
import { contentSelector } from "../../../atom/attendanceManageAtom";

import CalendarToolbar from "./CalendarToolbar";
import CalandarDay from "./CalendarDay";
import CalendarDate from "./CalendarDate";
import CalendarEvent from "./CalendarEvent";

const AttendanceCalendar = () => {
  moment.locale("ko");
  const localizer = momentLocalizer(moment);
  const content = useRecoilValue(contentSelector);

  const AttendanceEvent = content.map(
    ({ date, enterTime, exitTime, status }) => {
      return {
        start: new Date(moment().year(), moment().month(), date),
        end: new Date(moment().year(), moment().month(), date),
        enterTime,
        exitTime,
        status,
      };
    }
  );

  return (
    <Calendar
      views={{
        month: true,
      }}
      localizer={localizer}
      events={AttendanceEvent}
      style={{ width: 1000, height: 800 }}
      components={{
        toolbar: CalendarToolbar,
        month: {
          header: CalandarDay,
          dateHeader: CalendarDate,
        },
        event: CalendarEvent,
      }}
    />
  );
};

export default AttendanceCalendar;

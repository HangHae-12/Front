import { useRecoilState, useSetRecoilState } from "recoil";
import AbsenceRequestForm from "./AbsenceRequestForm";
import { childListAtom } from "../../atom/sideBarAtom";
import { useQuery } from "@tanstack/react-query";
import ChildManageAPI from "../../api/ChildManageAPI";
import { attendanceManageAtom } from "../../atom/attendanceManageAtom";
import AttendanceCalendar from "./AttendanceCalendar";
import { useEffect } from "react";
import { dateAtom } from "../../atom/dateAtom";

const AttendanceManage = () => {
  const childId = useRecoilState(childListAtom)[0][0]?.childId;
  const setAttendanceManageData = useSetRecoilState(attendanceManageAtom);
  const [date, setDate] = useRecoilState(dateAtom);

  const getCurrentYearAndMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    return { year, month };
  };

  useEffect(() => {
    setDate(getCurrentYearAndMonth());
  }, []);

  useQuery(
    ["AttendanceManage"],
    () => ChildManageAPI.getChildAttendance({ childId: childId, date: date }),
    {
      refetchOnWindowFocus: false,
      enabled: !!childId && !!date,
      onSuccess: (res) => {
        setAttendanceManageData(res);
      },
    }
  );

  return (
    <>
      <AttendanceCalendar />
      <AbsenceRequestForm />
    </>
  );
};

export default AttendanceManage;

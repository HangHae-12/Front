import { useRecoilState, useSetRecoilState } from "recoil";
import AbsenceRequestForm from "./AbsenceRequestForm";
import ChildProfile from "./ChildProfile";
import { childListAtom } from "../../atom/sideBarAtom";
import { useQuery } from "@tanstack/react-query";
import ChildManageAPI from "../../api/ChildManageAPI";
import { useState } from "react";
import { attendanceManageAtom } from "../../atom/attendanceManageAtom";
import AttendanceCalendar from "./AttendanceCalendar";

const AttendanceManage = () => {
  const childId = useRecoilState(childListAtom)[0][0]?.childId;
  const setAttendanceManageData = useSetRecoilState(attendanceManageAtom);
  const [date, setDate] = useState({ year: 2023, month: 4 });

  useQuery(
    ["AttendanceManage"],
    () => ChildManageAPI.getChildAttendance({ childId: childId, date: date }),
    {
      refetchOnWindowFocus: false,
      enabled: !!childId,
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

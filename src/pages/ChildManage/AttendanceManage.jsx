import { useRecoilState } from "recoil";
import AbsenceRequestForm from "./AbsenceRequestForm";
import ChildProfile from "./ChildProfile";
import { childListAtom } from "../../atom/sideBarAtom";
import { useQuery } from "@tanstack/react-query";
import ChildManageAPI from "../../api/ChildManageAPI";
import { useState } from "react";

const AttendanceManage = () => {
  const childId = useRecoilState(childListAtom)[0][0]?.childId;
  const [date, setDate] = useState({ year: 2023, month: 4 });

  const { data } = useQuery(
    ["AttendanceManage"],
    () => ChildManageAPI.getChildAttendance({ childId: childId, date: date }),
    {
      refetchOnWindowFocus: false,
      enabled: !!childId,
    }
  );

  return (
    <>
      <ChildProfile />
      <AbsenceRequestForm absentData={data?.absent} />
    </>
  );
};

export default AttendanceManage;

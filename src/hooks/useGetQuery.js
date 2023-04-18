import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AttendanceAPI } from "../api/AttendanceAPI";
import formattedDate from "../utils/formattedDate";
import { kindergartenAtom } from "../atom/sideBarAtom";

const useGetQuery = (type) => {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { id = 1 } = useParams();
  const kindergartenId = useRecoilValue(kindergartenAtom);

  //리팩토링 떄 모든 get api 추가 해도 좋을것 같다
  const getQueryKey = () => {
    return type === "month" ? "getMonthAttendance" : "getDayAttendance";
  };

  const getQueryFunction = () => {
    return type === "month"
      ? () =>
          AttendanceAPI.getMonthAttendance({
            kindergartenId: kindergartenId.id,
            classroomId: id,
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
          })
      : () =>
          AttendanceAPI.getDayAttendance({
            kindergartenId: kindergartenId.id,
            classroomId: id,
            date: formattedDate(selectedDate),
          });
  };

  const { data } = useQuery(
    [getQueryKey(), selectedDate, id],
    getQueryFunction(),
    {
      onError: (error) => {
        console.log(`${getQueryKey()} error:`, error);
      },
    }
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    queryClient.invalidateQueries([getQueryKey()]);
  };

  useEffect(() => {
    queryClient.invalidateQueries([getQueryKey()]);
  }, [selectedDate]);

  return {
    selectedDate,
    setSelectedDate,
    handleDateChange,
    data,
  };
};

export default useGetQuery;

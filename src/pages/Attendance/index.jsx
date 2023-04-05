import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([
    { No: 1, name: "백주원", status: "출석", entertime: "오전 9:00", exittime: "오후 4:30", etc: "" },
    { No: 2, name: "김주원", status: "인정결석", entertime: "오전 9:00", exittime: "오후 7:30", etc: "코로나" },

  ]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(attendanceData, {
      header: ["No", "name", "status", "entertime", "exittime", "etc"],
    });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "월별 출석부");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    XLSX.writeFile(wb, `출석부.xlsx`);
  };

  const filteredAttendanceData = attendanceData.filter(
    (data) =>
      new Date(data.date).toLocaleDateString() ===
      selectedDate.toLocaleDateString()
  );

  return (
    <div>
      <h1>일별 출석부</h1>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
      />
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>이름</th>
            <th>출결상태</th>
            <th>등원시간</th>
            <th>하원시간</th>
            <th>결석사유</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendanceData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{row.No}</td>
              <td>{row.name}</td>
              <td>{row.status}</td>
              <td>{row.entertime}</td>
              <td>{row.exittime}</td>
              <td>{row.etc}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={exportToExcel}>월별 출석부 엑셀로 내보내기</button>
    </div>
  );
};

export default Attendance;

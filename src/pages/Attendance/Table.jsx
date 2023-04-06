import React, { useState } from "react";
import styled from "styled-components";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import ko from "date-fns/locale/ko";
import { FiChevronLeft, FiChevronRight, FiCalendar } from "react-icons/fi";
import SideBar from "../../components/SideBar";
import textVariants from '../../styles/variants/textVariants';

registerLocale("ko", ko);

const Table = () => {
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
        XLSX.utils.book_append_sheet(wb, ws, "일별 출석부");
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

    const decreaseDate = () => {
        setSelectedDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() - 1);
            return newDate;
        });
    };

    const increaseDate = () => {
        setSelectedDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + 1);
            return newDate;
        });
    };


    return (
        <div>
            <StyledTableTitle>일별 출석부</StyledTableTitle>
            <StyledHeader>

                <button onClick={decreaseDate}>
                    <FiChevronLeft />
                </button>
                <StyledMonthYear>
                    {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일
                </StyledMonthYear>
                <button onClick={increaseDate}>
                    <FiChevronRight />
                </button>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    customInput={<CustomInput />}
                    dateFormat="yyyy년 MM월 dd일"
                    locale="ko"
                    wrapperClassName="hidden"
                />
            </StyledHeader>


            <StyledTable>
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
                    {attendanceData.map((row, rowIndex) => (
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
            </StyledTable>
            <button onClick={exportToExcel}>월별 출석부 내보내기</button>
        </div>
    );
};

export default Table;

const StyledTableTitle = styled.h2`
  ${textVariants.H2_Bold}
  margin-bottom: 20px;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.white};
  }

  tr:nth-child(even) {
    background-color: ${({ theme }) => theme.color.grayScale[50]};
  }

  tr:hover {
    background-color: ${({ theme }) => theme.color.grayScale[100]};
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledMonthYear = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (

    <FiCalendar onClick={onClick} ref={ref} className="hidden" />
));

const StyledInput = styled.div`
  font-size: 18px;
  border: none;
  border-bottom: 1px solid #000;
  cursor: pointer;
  display: flex;
  align-items: center;
`;









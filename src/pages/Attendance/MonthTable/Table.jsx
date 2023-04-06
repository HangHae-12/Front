import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import ko from "date-fns/locale/ko";
import { GrPrevious, GrNext } from "react-icons/gr";
import { BsCalendarDate } from "react-icons/bs"
import { GoOctoface } from "react-icons/go"
import { TbDog } from "react-icons/tb"
import { RiBearSmileLine } from "react-icons/ri"
import { AiOutlineSmile, AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai"
import textVariants from '../../../styles/variants/textVariants';
import Button from "../../../components/Button";
import Buttons from '../../../components/Buttons';

registerLocale("ko", ko);

const Table = () => {

    const [selectedButton, setSelectedButton] = useState("새빛반");



    const loadClassroom = (selected, id) => {
        setSelectedButton(selected);
        // navigate(`/host/${id}/ENTER/전체시간`)
    };

    const [selectedDate, setSelectedDate] = useState(new Date());

    const students = [
        { id: 1, name: "백주원", attendanceStatus: "출석", arrivalTime: "오전 9:00", leaveTime: "오후 4:30", attendanceCnt: "3", absentCnt: "3", date: "2023-04-01" },
        { id: 2, name: "김주원", attendanceStatus: "인정결석", arrivalTime: "오전 9:00", leaveTime: "오후 7:30", attendanceCnt: "6", absentCnt: "0", date: "2023-04-02" },
    ];


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const filteredAttendanceData = students.filter(
        (data) =>
            new Date(data.date).getMonth() === selectedDate.getMonth() &&
            new Date(data.date).getFullYear() === selectedDate.getFullYear()
    );


    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const daysInMonth = getDaysInMonth(selectedDate.getMonth(), selectedDate.getFullYear());
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

    const getInitialVisibleDays = () => {
        const today = new Date().getDate();
        return Array.from({ length: 5 }, (_, i) => today + i);
    };

    const [visibleDays, setVisibleDays] = useState(getInitialVisibleDays());

    const exportToExcel = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([]);

        // 시트 헤더 행 추가
        const headerRow1 = ["", "", ""];
        const headerRow2 = ["No", "원아명", "출결정보"];
        Array.from({ length: daysInMonth }, (_, i) => i + 1).forEach((day) => {
            const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
            headerRow1.push(date.getDate());
            headerRow2.push(daysOfWeek[date.getDay()]);
        });

        headerRow2.push("출석일수");
        headerRow2.push("결석일수");

        XLSX.utils.sheet_add_aoa(ws, [headerRow1, headerRow2], { origin: "A1" });

        // 시트 데이터 행 추가
        const rowIndex = 3;
        students.forEach((student, index) => {
            const rowData = [
                student.id,
                student.name,
                "출결상태",
                ...Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    return student.attendanceStatus;
                }),
                student.attendanceCnt.toString(),
                student.absentCnt.toString(),
            ];
            XLSX.utils.sheet_add_aoa(ws, [rowData], { origin: `A${rowIndex + index * 3}` });

            const arrivalTimeData = [
                "",
                "",
                "등원시간",
                ...Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    return student.arrivalTime;
                }),
            ];
            XLSX.utils.sheet_add_aoa(ws, [arrivalTimeData], { origin: `A${rowIndex + index * 3 + 1}` });

            const leaveTimeData = [
                "",
                "",
                "하원시간",
                ...Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    return student.leaveTime;
                }),
            ];
            XLSX.utils.sheet_add_aoa(ws, [leaveTimeData], { origin: `A${rowIndex + index * 3 + 2}` });
        });



        // 워크북에 시트 추가
        XLSX.utils.book_append_sheet(wb, ws, "월별 출석부");

        // 엑셀 파일 다운로드
        XLSX.writeFile(wb, `출석부.xlsx`);
    };



    const decreaseMonth = () => {
        setSelectedDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });
    };

    const increaseMonth = () => {
        setSelectedDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });
    };




    useEffect(() => {

        setVisibleDays((prevVisibleDays) => {
            const firstDay = prevVisibleDays[0];
            const lastDay = prevVisibleDays[prevVisibleDays.length - 1];
            const newDays = [];

            for (let i = firstDay; i <= lastDay; i++) {
                newDays.push(i);
            }

            return newDays;
        });
    }, [selectedDate]);
    const goPrevDays = () => {
        setVisibleDays((prevVisibleDays) => {
            const firstDay = prevVisibleDays[0] - 1;
            const lastDay = prevVisibleDays[prevVisibleDays.length - 1] - 1;

            if (firstDay < 1) {
                return prevVisibleDays;
            }

            const newDays = [];

            for (let i = firstDay; i <= lastDay; i++) {
                newDays.push(i);
            }

            return newDays;
        });
    };

    const goNextDays = () => {
        setVisibleDays((prevVisibleDays) => {
            const firstDay = prevVisibleDays[0] + 1;
            const lastDay = prevVisibleDays[prevVisibleDays.length - 1] + 1;

            if (lastDay > daysInMonth) {
                return prevVisibleDays;
            }

            const newDays = [];

            for (let i = firstDay; i <= lastDay; i++) {
                newDays.push(i);
            }

            return newDays;
        });
    };

    // 랜덤으로 선택될 아이콘 배열
    const iconOptions = [GoOctoface, TbDog, RiBearSmileLine, AiOutlineSmile];

    // 아이콘 선택 함수
    const getRandomIcon = () => {
        const randomIndex = Math.floor(Math.random() * iconOptions.length);
        const SelectedIcon = iconOptions[randomIndex];
        return <SelectedIcon />;
    };

    return (
        <div>

            <StyledTableTitle>월별 출석부</StyledTableTitle>
            <StyledClassButtonGroup>
                <Button.ClassButton
                    selected={"새빛반"}
                    selectedButton={selectedButton}
                    onClick={() => loadClassroom("새빛반", 1)}
                />
                <Button.ClassButton
                    selected={"동동반"}
                    selectedButton={selectedButton}
                    onClick={() => loadClassroom("동동반", 2)}
                />
                <Button.ClassButton
                    selected={"빗살반"}
                    selectedButton={selectedButton}
                    onClick={() => loadClassroom("빗살반", 3)}
                />
            </StyledClassButtonGroup>
            <StyledTableContainer>
                <StyledHeader>
                    <StyledMonthYear>
                        <GrPrevious style={{ marginRight: "8px" }} onClick={decreaseMonth} size={24} />
                        {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월
                        <GrNext style={{ marginLeft: "8px" }} onClick={increaseMonth} size={24} />
                        <StyledCustomDatePicker>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                customInput={<CustomInput />}
                                dateFormat="yyyy년 MM월"
                                locale="ko"
                                wrapperClassName="hidden"
                                showMonthYearPicker
                            />
                        </StyledCustomDatePicker>
                    </StyledMonthYear>
                </StyledHeader>
                <StyledTable>
                    <thead>
                        <tr>
                            <th></th>
                            <th onClick={goPrevDays}><AiOutlineDoubleLeft /></th>
                            {visibleDays.map((day) => (
                                <th key={day}>{day}</th>
                            ))}
                            <th onClick={goNextDays}><AiOutlineDoubleRight /></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <th>출결정보</th>
                            {visibleDays.map((day) => (
                                <th key={day}>
                                    {
                                        daysOfWeek[
                                        new Date(
                                            selectedDate.getFullYear(),
                                            selectedDate.getMonth(),
                                            day
                                        ).getDay()
                                        ]
                                    }
                                </th>
                            ))}
                            <th>출석일수</th>
                            <th>결석일수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <>
                                <tr key={student.id}>
                                    <td rowSpan="3">{getRandomIcon()} {student.name}</td>
                                    <td>출석상태</td>
                                    {visibleDays.map((day) => (
                                        <td key={day}>{student.attendanceStatus === "출석" ? <Buttons.State colorTypes="blue">{student.attendanceStatus}</Buttons.State> : <Buttons.State colorTypes="orange">{student.attendanceStatus}</Buttons.State>}</td>
                                    ))}
                                    <td rowSpan="3">{student.attendanceCnt}</td>
                                    <td rowSpan="3">{student.absentCnt}</td>
                                </tr>
                                <tr>
                                    <td>등원시간</td>
                                    {visibleDays.map((day) => (
                                        <td key={day}>{student.arrivalTime}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>하원시간</td>
                                    {visibleDays.map((day) => (
                                        <td key={day}>{student.leaveTime}</td>
                                    ))}
                                </tr>
                            </>
                        ))}
                    </tbody>
                </StyledTable>
                <StyledButtonGroup>
                    <StyledExportButton colorTypes="primary" onClick={exportToExcel}>내보내기</StyledExportButton>
                </StyledButtonGroup>
            </StyledTableContainer>

        </div>
    );
};

export default Table;

const StyledClassButtonGroup = styled.div`
padding-bottom: 10px;
`;

const StyledTableTitle = styled.h2`
  ${textVariants.H2_Bold}
  margin-bottom: 20px;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  margin: 20px;
`;

const StyledMonthYear = styled.div`
  ${textVariants.H2_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[600]};
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  gap: 10px;
`;



const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <BsCalendarDate onClick={onClick} ref={ref} className="hidden" />
));

const StyledTableContainer = styled.div`
    background-color:#EDF5EECC;
    box-shadow: 0px 2px 12px hsla(0, 0%, 0%, 0.04);
    border-radius: 12px;
    padding: 40px;
    margin-top: 50px;
`

const StyledTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  background-color: ${({ theme }) => theme.color.white};
  width: 100%;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }

  th {
    background-color: ${({ theme }) => theme.color.grayScale[100]};
    color: ${({ theme }) => theme.color.grayScale[500]};
  }
  

  & > thead > tr:first-child > th:first-child {
    border-right: none;
  }

  & > thead > tr:first-child > th:nth-child(2) {
    border-left: none;
  }

  & > thead > tr:first-child > th:nth-last-child(2) {
    border-right: none;
  }

  & > thead > tr:first-child > th:last-child {
    border-left: none;
  }


  tr {
    border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  }
`;




const StyledButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    margin-top: 20px;
`;

const StyledExportButton = styled(Buttons.Filter)`
    margin-left: 10px;
`;


const StyledCustomDatePicker = styled.div`
    .react-datepicker {
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: white;
    font-size: 14px;
  }
  
  .react-datepicker__header {
    background-color: ${({ theme }) => theme.color.perple_lighter};
    border-bottom: 1px solid #ccc;
    font-weight: bold;
    padding: 10px;
    text-align: center;
  }
  
  .react-datepicker__current-month {
    ${textVariants.Body1_SemiBold}
  }
  
  .react-datepicker__day {
    ${textVariants.Body3_Regular}
    color: ${({ theme }) => theme.color.grayScale[500]};
    outline: none;
  }
  
  .react-datepicker__day:hover {
    background-color: ${({ theme }) => theme.color.grayScale[100]};
    cursor: pointer;
  }
  
  .react-datepicker__day--selected {
    ${textVariants.Body3_SemiBold}
    background-color: ${({ theme }) => theme.color.orange_lighter};
    color: ${({ theme }) => theme.color.white};
    
  }
  
  .react-datepicker__day--today {
    ${textVariants.Body3_SemiBold}
    color: ${({ theme }) => theme.color.orange};
  }
  
  .react-datepicker__navigation {
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
    line-height: 1.4;
  }
  
  .react-datepicker__navigation--previous {
    margin-right: 10px;
  }
  
  .react-datepicker__navigation--next {
    margin-left: 10px;
  }
`











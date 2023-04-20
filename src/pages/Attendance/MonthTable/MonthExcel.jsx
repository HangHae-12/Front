import React from "react";
import * as XLSX from "xlsx";
import styled from "styled-components";
import textVariants from '../../../styles/variants/textVariants';

const MonthExcel = ({ data, selectedDate }) => {
    const exportToExcel = () => {
        const getDaysInMonth = (month, year) => {
            return new Date(year, month + 1, 0).getDate();
        };

        const daysInMonth = getDaysInMonth(selectedDate.getMonth(), selectedDate.getFullYear());
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

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
        data?.forEach((student, index) => {

            const rowData = [
                student.id,
                student.name,
                "출결상태",
                ...Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    const attendance = student.monthAttendanceList.find(
                        (attendance) => new Date(attendance.date).getDate() === day
                    );
                    return attendance ? attendance.status : '';
                }),
                student.attendanceCount,
                student.absentCount
            ];

            XLSX.utils.sheet_add_aoa(ws, [rowData], { origin: `A${rowIndex + index * 3}` });

            const arrivalTimeData = [
                "",
                "",
                "등원시간",
                ...Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    const attendance = student.monthAttendanceList.find(
                        (attendance) => new Date(attendance.date).getDate() === day
                    );
                    return attendance ? attendance.enterTime : '';
                }),
            ];
            XLSX.utils.sheet_add_aoa(ws, [arrivalTimeData], { origin: `A${rowIndex + index * 3 + 1}` });

            const leaveTimeData = [
                "",
                "",
                "하원시간",
                ...Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    const attendance = student.monthAttendanceList.find(
                        (attendance) => new Date(attendance.date).getDate() === day
                    );
                    return attendance ? attendance.exitTime : '';
                }),
            ];
            XLSX.utils.sheet_add_aoa(ws, [leaveTimeData], { origin: `A${rowIndex + index * 3 + 2}` });
        });
        // 워크북에 시트 추가
        XLSX.utils.book_append_sheet(wb, ws, "월별 출석부");
        // 엑셀 파일 다운로드
        XLSX.writeFile(wb, `출석부.xlsx`);
    };

    return (
        <StyledExportButton colorTypes="primary" onClick={exportToExcel}>내보내기</StyledExportButton>
    )
}

export default MonthExcel;

const StyledExportButton = styled.button`
  ${textVariants.Body1_SemiBold}
        display: flex;
        position: absolute;
        background: ${({ theme }) => theme.color.white};
        color: ${({ theme }) => theme.color.primary};
        border: 1px solid ${({ theme }) => theme.color.primary};
        border-radius: 4px;
        right: 0;
        margin-left: auto;
        padding: 4px 12px;
        cursor: pointer;
   
  @media ${({ theme }) => theme.device.laptop} {
    display:none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.green_darker};
  &:active {
        cursor: grabbing;
}
`;


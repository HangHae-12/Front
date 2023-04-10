import React, { useState } from "react";
import * as XLSX from "xlsx";
import styled from "styled-components";
import Buttons from '../../../components/Buttons';

const DayExcel = ({ data, selectedDate }) => {

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const exportToExcel = () => {
        const filteredData = data.data.filter((row) => row !== null);

        const formattedData = filteredData.map((row, rowIndex) => {
            return {
                No: rowIndex + 1,
                원아명: row.name,
                출결상태: row.status,
                등원시간: row.enterTime || "미등록",
                하원시간: row.exitTime || "미등록",
                결석사유: row.absentReason || "미등록",
            };
        });

        const ws = XLSX.utils.json_to_sheet(formattedData, {
            header: ["No", "원아명", "출결상태", "등원시간", "하원시간", "결석사유"],
        });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "일별 출석부");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const dataBlob = new Blob([excelBuffer], {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        });
        XLSX.writeFile(wb, `일별 출석부_${formatDate(selectedDate)}.xlsx`);
    };

    return (
        <StyledButtonGroup>
            <StyledExportButton colorTypes="primary" onClick={exportToExcel}>내보내기</StyledExportButton>
        </StyledButtonGroup>
    )


}
export default DayExcel;

const StyledButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    margin-top: 20px;
`;

const StyledExportButton = styled(Buttons.Filter)`
    margin-left: 10px;
`;

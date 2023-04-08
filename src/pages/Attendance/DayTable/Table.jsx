import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as XLSX from "xlsx";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { AttendanceAPI } from "../../../api/AttendanceAPI";
import { GrPrevious, GrNext } from "react-icons/gr";
import { BsCalendarDate } from "react-icons/bs"
import { GoOctoface } from "react-icons/go"
import { TbDog } from "react-icons/tb"
import { RiBearSmileLine } from "react-icons/ri"
import { AiOutlineSmile } from "react-icons/ai"
import textVariants from '../../../styles/variants/textVariants';
import Buttons from "../../../components/Buttons";
import ClassButton from './DayClassButton';
import CustomDatepicker from '../../../components/CustomDatepicker'


const Table = () => {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { id = 1 } = useParams();

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  const { isLoading, isError, error, data } = useQuery(
    ["getDayAttendance", selectedDate, id],
    () => AttendanceAPI.getDayAttendance({ classroomId: id, date: formatDate(selectedDate) }),

  );


  useEffect(() => {
    queryClient.invalidateQueries(["getDayAttendance"]);
  }, [selectedDate, id]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    queryClient.invalidateQueries(["getDayAttendance"]);
  };

  const dayOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][selectedDate.getDay()];



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
  // 랜덤으로 선택될 아이콘 배열
  const iconOptions = [GoOctoface, TbDog, RiBearSmileLine, AiOutlineSmile];

  // 아이콘 선택 함수
  const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * iconOptions.length);
    const SelectedIcon = iconOptions[randomIndex];
    return <SelectedIcon />;
  };

  console.log(data)
  return (
    <div>

      <StyledTableTitle>일별 출석부</StyledTableTitle>
      <ClassButton />
      <StyledTableContainer>
        <StyledHeader>
          <StyledMonthYear>
            <GrPrevious style={{ marginRight: "8px" }} onClick={decreaseDate} size={24} />
            {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 {dayOfWeek}
            <GrNext style={{ marginLeft: "8px" }} onClick={increaseDate} size={24} />
            <CustomDatepicker selectedDate={selectedDate} onDateChange={handleDateChange} />
          </StyledMonthYear>
        </StyledHeader>
        <StyledTableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <StyledStickyHeader>No.</StyledStickyHeader>
                <StyledStickyHeader>이름</StyledStickyHeader>
                <StyledStickyHeader>출결상태</StyledStickyHeader>
                <StyledStickyHeader>등원시간</StyledStickyHeader>
                <StyledStickyHeader>하원시간</StyledStickyHeader>
                <StyledStickyHeader>결석사유</StyledStickyHeader>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <div>Loading...</div>
              ) : isError ? (
                <div>Error: error</div>
              ) : (data?.data?.length > 0 &&
                data.data
                  .filter((row) => row !== null) // null 값을 걸러내기 위한 추가 작업
                  .map((row, rowIndex) => (
                    <tr key={row.id}>
                      <td>{rowIndex}</td>
                      <td>{getRandomIcon()} {row.name}</td>
                      <td>
                        {(() => {
                          switch (row.status) {
                            case "출석":
                              return <Buttons.State colorTypes="blue">{row.status}</Buttons.State>;
                            case "인정결석":
                              return <Buttons.State colorTypes="orange">{row.status}</Buttons.State>;
                            case "결석":
                              return <Buttons.State colorTypes="red">{row.status}</Buttons.State>;
                            default:
                              return <Buttons.State colorTypes="perple">{row.status}</Buttons.State>;
                          }
                        })()}
                      </td>
                      <td>{row.enterTime || "미등록"}</td>
                      <td>{row.exitTime || "미등록"}</td>
                      <td>{row.absentReason || "미등록"}</td>
                    </tr>
                  )))}
            </tbody>
          </StyledTable>
        </StyledTableWrapper>
        <StyledButtonGroup>
          <StyledExportButton colorTypes="primary" onClick={exportToExcel}>내보내기</StyledExportButton>
        </StyledButtonGroup>
      </StyledTableContainer>

    </div>
  );
};

export default Table;


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

const StyledTableWrapper = styled.div`
  max-height: 500px;
  overflow: auto;
`;
const StyledStickyHeader = styled.th`
  position: sticky;
  top: 0px;
  background-color: ${({ theme }) => theme.color.grayScale[100]};
  color: ${({ theme }) => theme.color.grayScale[500]};
`;

const StyledTableContainer = styled.div`
    background-color:#EDF5EECC;
    box-shadow: 0px 2px 12px hsla(0, 0%, 0%, 0.04);
    border-radius: 12px;
    padding: 40px;
    margin-top: 30px;
`

const StyledTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  background-color: ${({ theme }) => theme.color.white};
  width: 100%;
  margin-top: 20px;


  thead{
    padding: 10px;
  }


  th,
  td {
    /* border: 1px solid #ddd; */
    padding: 15px;
    text-align: center;
    
  }

  th {
    background-color: ${({ theme }) => theme.color.grayScale[100]};
    color: ${({ theme }) => theme.color.grayScale[500]};
    
  }
  tr{
     border: 1px solid #ddd;
  }
  tr:nth-child(even) {
    background-color: ${({ theme }) => theme.color.grayScale[50]};
  }

  tr:hover {
    background-color: ${({ theme }) => theme.color.perple_lighter};
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












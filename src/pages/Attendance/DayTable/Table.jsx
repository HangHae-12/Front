import React, { useState } from "react";
import styled from "styled-components";
import * as XLSX from "xlsx";
import { GrPrevious, GrNext } from "react-icons/gr";
import { BsCalendarDate } from "react-icons/bs"
import { GoOctoface } from "react-icons/go"
import { TbDog } from "react-icons/tb"
import { RiBearSmileLine } from "react-icons/ri"
import { AiOutlineSmile } from "react-icons/ai"
import textVariants from '../../../styles/variants/textVariants';
import Buttons from "../../../components/Buttons";
import ClassButton from './ClassButton';
import CustomDatepicker from '../../../components/CustomDatepicker'


const Table = () => {

  const [selectedButton, setSelectedButton] = useState("새빛반");

  const loadClassroom = (selected, id) => {
    setSelectedButton(selected);
    // navigate(`/host/${id}/ENTER/전체시간`)
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([
    { No: 1, 원아명: "백주원", 출결상태: "출석", 등원시간: "오전 9:00", 하원시간: "오후 4:30", 결석사유: "" },
    { No: 2, 원아명: "김주원", 출결상태: "인정결석", 등원시간: "오전 9:00", 하원시간: "오후 7:30", 결석사유: "코로나" },
    { No: 3, 원아명: "홍주원", 출결상태: "결석", 등원시간: "", 하원시간: "", 결석사유: "" },
    { No: 4, 원아명: "유주원", 출결상태: "출석", 등원시간: "오전 9:00", 하원시간: "오후 7:30", 결석사유: "" },
    { No: 5, 원아명: "이주원", 출결상태: "인정결석", 등원시간: "오전 9:00", 하원시간: "오후 4:30", 결석사유: "코로나" },


  ]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const dayOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][selectedDate.getDay()];
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(attendanceData, {
      header: ["No", "원아명", "출결상태", "등원시간", "하원시간", "결석사유"],
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

      <StyledTableTitle>일별 출석부</StyledTableTitle>
      <ClassButton />
      <StyledTableContainer>
        <StyledHeader>
          <StyledMonthYear>
            <GrPrevious style={{ marginRight: "8px" }} onClick={decreaseDate} size={24} />
            {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 {dayOfWeek}
            <GrNext style={{ marginLeft: "8px" }} onClick={increaseDate} size={24} />
            <CustomDatepicker />
          </StyledMonthYear>
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
                <td>{getRandomIcon()} {row.원아명}</td>
                <td>
                  {(() => {
                    switch (row.출결상태) {
                      case "출석":
                        return <Buttons.State colorTypes="blue">{row.출결상태}</Buttons.State>;
                      case "인정결석":
                        return <Buttons.State colorTypes="orange">{row.출결상태}</Buttons.State>;
                      case "결석":
                        return <Buttons.State colorTypes="red">{row.출결상태}</Buttons.State>;
                      default:
                        return <Buttons.State colorTypes="perple">{row.출결상태}</Buttons.State>;
                    }
                  })()}

                </td>
                <td>{row.등원시간}</td>
                <td>{row.하원시간}</td>
                <td>{row.결석사유}</td>
              </tr>
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












import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useGetQuery from '../../../hooks/useGetQuery';
import { GrPrevious, GrNext } from "react-icons/gr";
import { BsSun } from "react-icons/bs"
import { GoOctoface } from "react-icons/go"
import { TbDog } from "react-icons/tb"
import { RiBearSmileLine } from "react-icons/ri"
import { AiOutlineSmile } from "react-icons/ai"
import textVariants from '../../../styles/variants/textVariants';
import Buttons from "../../../components/Buttons";
import ClassButton from './DayClassButton';
import CustomDatepicker from '../../../components/CustomDatepicker'
import DayExcel from './DayExcel'
import AnimatedTableRow from '../AnimatedTableRow';

const Table = () => {
  const queryClient = useQueryClient();

  const { id = 1 } = useParams();
  const { selectedDate, setSelectedDate, handleDateChange, data } = useGetQuery("day");

  const isSunday = selectedDate.getDay() === 0;

  useEffect(() => {
    queryClient.invalidateQueries(["getDayAttendance"]);
  }, [selectedDate, id]);


  const dayOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][selectedDate.getDay()];

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
      <ClassButton everyClass={data?.data?.data?.everyClass} />
      <StyledHeader>
        <StyledMonthYear>
          <StyledGrPrevious onClick={decreaseDate} size={16} />
          {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 {dayOfWeek}
          <StyledGrNext onClick={increaseDate} size={16} />
          <CustomDatepicker selectedDate={selectedDate} onDateChange={handleDateChange} />
        </StyledMonthYear>
        <DayExcel data={data?.data?.data?.content} selectedDate={selectedDate} />
      </StyledHeader>
      <StyledTableContainer>
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
              {isSunday ? (
                <AnimatedTableRow delay={1 * 0.5}>
                  <td className="sunday" colSpan="6"><BsSun /> 일요일은 쉬는날</td>
                </AnimatedTableRow>
              ) : (
                data?.data?.data?.content?.length > 0 &&
                data.data.data.content
                  .filter((row) => row !== null) // null 값을 걸러내기 위한 추가 작업
                  .map((row, index) => (
                    <AnimatedTableRow key={row.id} delay={index * 0.05} >
                      <td>{index + 1}</td>
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
                    </AnimatedTableRow>
                  )))}
            </tbody>
          </StyledTable>
        </StyledTableWrapper>
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
  position: relative;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
  
`;
const StyledGrPrevious = styled(GrPrevious)`
  cursor: pointer;
`;

const StyledGrNext = styled(GrNext)`
  cursor: pointer;
`;
const StyledMonthYear = styled.div`
${textVariants.H3_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  gap: 10px;
`;

const StyledTableWrapper = styled.div`
  max-height: 530px;
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
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.12);
    border-radius: 12px;
    padding: 40px;
    margin-top: 30px;
`

const StyledTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  background-color: ${({ theme }) => theme.color.white};
  width: 100%;


  thead{
    padding: 10px;
  }


  th,
  td {
    border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
    padding: 15px;
    text-align: center;
    
  }

  th {
    background-color: ${({ theme }) => theme.color.grayScale[100]};
    color: ${({ theme }) => theme.color.grayScale[500]};
    
  }
  tr{
     border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  }
  /* tr:nth-child(even) {
    background-color: ${({ theme }) => theme.color.grayScale[50]};
  } */

  tr:hover {
    background-color: ${({ theme }) => theme.color.perple_lighter};
  }

  .sunday{
    color: ${({ theme }) => theme.color.red};
  }

  & > thead > tr > th {
    background-color: ${({ theme }) => theme.color.grayScale[50]};
  }
`;











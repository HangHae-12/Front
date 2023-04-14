import React, { useState, useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { GrPrevious, GrNext } from "react-icons/gr";
import { GoOctoface } from "react-icons/go"
import { TbDog } from "react-icons/tb"
import { RiBearSmileLine } from "react-icons/ri"
import { AiOutlineSmile, AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import textVariants from '../../../styles/variants/textVariants';
import Buttons from '../../../components/Buttons';
import ClassButton from './MonthClassButton';
import CustomDatepicker from '../../../components/CustomDatepicker'
import { AttendanceAPI } from "../../../api/AttendanceAPI";
import MonthExcel from './MonthExcel';
import AnimatedTableRow from '../AnimatedTableRow';

const Table = () => {
    const queryClient = useQueryClient();
    const { sid = 1 } = useParams();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { isLoading, isError, data } = useQuery(
        ["getMonthAttendance", selectedDate, sid],
        () =>
            AttendanceAPI.getMonthAttendance({
                classroomId: sid,
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
            })
    );


    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(selectedDate);
        queryClient.invalidateQueries(["getMonthAttendance"]);
    };
    useEffect(() => {
        queryClient.invalidateQueries(["getMonthAttendance"]);
    }, [selectedDate, sid]);


    // console.log(filteredAttendanceData);
    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };
    const daysInMonth = getDaysInMonth(selectedDate.getMonth(), selectedDate.getFullYear());
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

    //이번달은 오늘의 날짜 부터 보여주고, 다른달은 1일부터 
    const getInitialVisibleDays = () => {
        const today = selectedDate.getMonth() === new Date().getMonth() ? new Date().getDate() : 1;
        return Array.from({ length: 5 }, (_, i) => today + i);
    };
    //기준날을 오늘로
    const [visibleDays, setVisibleDays] = useState(getInitialVisibleDays());
    //선택날짜 바뀔때 기준일자 변경되게 
    useEffect(() => {
        setVisibleDays(getInitialVisibleDays(selectedDate));
    }, [selectedDate]);

    // 달 넘기기 버튼 핸들러

    const handleDecreaseMonth = () => {
        setSelectedDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });
    };
    const handleIncreaseMonth = () => {
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

    //태이블 전날,다음날로 가는 함수
    const handlePrevDays = () => {
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

    const handleNextDays = () => {
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
    //태이블 일자 +- 5로 가는 함수
    const handleFivePrevDays = () => {
        setVisibleDays((prevVisibleDays) => {
            const firstDay = prevVisibleDays[0] - 5;
            const lastDay = prevVisibleDays[prevVisibleDays.length - 1] - 5;

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

    const handleFiveNextDays = () => {
        setVisibleDays((prevVisibleDays) => {
            const firstDay = prevVisibleDays[0] + 5;
            const lastDay = prevVisibleDays[prevVisibleDays.length - 1] + 5;

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
    //토요일,일요일 스타일 다르게 주기위해서 
    const isSaturday = (day) => {
        const dayOfWeek = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            day
        ).getDay();
        return dayOfWeek === 6;
    };

    const isSunday = (day) => {
        const dayOfWeek = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            day
        ).getDay();
        return dayOfWeek === 0;
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
            <ClassButton />
            <StyledHeader>
                <StyledMonthYear>
                    <GrPrevious style={{ marginRight: "8px" }} onClick={handleDecreaseMonth} size={16} />
                    {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월
                    <GrNext style={{ marginLeft: "8px" }} onClick={handleIncreaseMonth} size={16} />
                    <CustomDatepicker mode="month" selectedDate={selectedDate} onDateChange={handleDateChange} />
                </StyledMonthYear>
                <MonthExcel data={data} selectedDate={selectedDate} />
            </StyledHeader>
            <StyledTableContainer>
                <StyledTableWrapper>
                    <StyledTable>
                        <thead>
                            <tr>
                                <StyledTopStickyHeader onClick={handleFivePrevDays}>
                                    <AiOutlineDoubleLeft />
                                </StyledTopStickyHeader>
                                <StyledTopStickyHeader onClick={handlePrevDays}>
                                    <AiOutlineLeft />
                                </StyledTopStickyHeader>
                                {visibleDays.map((day) => {
                                    if (day > daysInMonth) {
                                        return <StyledTopStickyHeader isWeekend={false} key={day}></StyledTopStickyHeader>;
                                    }
                                    return <StyledTopStickyHeader isSaturday={isSaturday(day)}
                                        isSunday={isSunday(day)} key={day}>{day}</StyledTopStickyHeader>;
                                })}
                                <StyledTopStickyHeader onClick={handleNextDays}>
                                    <AiOutlineRight />
                                </StyledTopStickyHeader>
                                <StyledTopStickyHeader onClick={handleFiveNextDays}>
                                    <AiOutlineDoubleRight />
                                </StyledTopStickyHeader>
                            </tr>
                            <tr>
                                <StyledStickyHeader>이름</StyledStickyHeader>
                                <StyledStickyHeader>출결정보</StyledStickyHeader>
                                {visibleDays.map((day) => (
                                    <StyledStickyHeader key={day} isSaturday={isSaturday(day)}
                                        isSunday={isSunday(day)}>
                                        {
                                            daysOfWeek[
                                            new Date(
                                                selectedDate.getFullYear(),
                                                selectedDate.getMonth(),
                                                day
                                            ).getDay()
                                            ]
                                        }
                                    </StyledStickyHeader>
                                ))}
                                <StyledStickyHeader>출석일수</StyledStickyHeader>
                                <StyledStickyHeader>결석일수</StyledStickyHeader>
                            </tr>

                        </thead>

                        <tbody>
                            {data?.data?.map((student, index) => {
                                return (
                                    <>
                                        <AnimatedTableRow key={student.id} delay={index * 0.1}>
                                            <StyledNameCell rowSpan="3">{getRandomIcon()} {student.name}</StyledNameCell>
                                            <td>출석상태</td>
                                            {visibleDays.map((day) => {
                                                const attendance = student.monthAttendanceList.find(
                                                    (attendance) => new Date(attendance.date).getDate() === day
                                                );

                                                return (
                                                    <td key={day}>
                                                        {attendance ? (
                                                            attendance.status === "출석" ? (
                                                                <Buttons.State colorTypes="blue">{attendance.status}</Buttons.State>
                                                            ) : attendance.status === "결석" ? (
                                                                <Buttons.State colorTypes="red">{attendance.status}</Buttons.State>
                                                            ) : attendance.status === "미등원" || attendance.status === "미하원" ? (
                                                                <Buttons.State colorTypes="perple">{attendance.status}</Buttons.State>
                                                            ) : (
                                                                <Buttons.State colorTypes="orange">{attendance.status}</Buttons.State>
                                                            )
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                            <StyledNameCell rowSpan="3">{student.attendanceCount}</StyledNameCell>
                                            <StyledNameCell rowSpan="3">{student.absentCount}</StyledNameCell>
                                        </AnimatedTableRow>
                                        <AnimatedTableRow delay={index * 0.1}>
                                            <td>등원시간</td>
                                            {visibleDays.map((day) => {
                                                const attendance = student.monthAttendanceList.find(
                                                    (attendance) => new Date(attendance.date).getDate() === day
                                                );

                                                return <td key={day}>{attendance ? attendance.enterTime : <></>}</td>;
                                            })}
                                        </AnimatedTableRow>
                                        <AnimatedTableRow delay={index * 0.1}>
                                            <td>하원시간</td>
                                            {visibleDays.map((day) => {
                                                const attendance = student.monthAttendanceList.find(
                                                    (attendance) => new Date(attendance.date).getDate() === day
                                                );

                                                return <td key={day}>{attendance ? attendance.exitTime : <></>}</td>;
                                            })}
                                        </AnimatedTableRow>
                                    </>
                                );
                            })}
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

const StyledTopStickyHeader = styled.th`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.color.grayScale[50]};
  color: ${({ isSaturday, isSunday, theme }) =>
        isSunday ? theme.color.red : isSaturday ? theme.color.blue : theme.color.grayScale[500]};
  
`;

const StyledStickyHeader = styled.th`
  position: sticky;
  top: 35px;
  background-color: ${({ theme }) => theme.color.grayScale[50]};
  color: ${({ isSaturday, isSunday, theme }) =>
        isSunday ? theme.color.red : isSaturday ? theme.color.blue : theme.color.grayScale[500]};
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



const StyledTableContainer = styled.div`
  background-color: #edf5eecc;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 40px;
`;


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
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    
  }

  th {
    background-color: ${({ theme }) => theme.color.grayScale[100]};
    
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

    & > thead > tr > th {
    background-color: ${({ theme }) => theme.color.grayScale[50]};
  }
`;

const StyledNameCell = styled.td`
  vertical-align: middle;
`;





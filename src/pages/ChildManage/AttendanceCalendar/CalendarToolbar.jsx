import styled, { css } from "styled-components";
import { dateAtom } from "../../../atom/dateAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import textVariants from "../../../styles/variants/textVariants";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { infoSelector } from "../../../atom/attendanceManageAtom";
import StyledChildManage from "../styled";

const CalendarToolbar = ({ label, onNavigate }) => {
  const [date, setDate] = useRecoilState(dateAtom);
  const info = useRecoilValue(infoSelector);

  const handlePrevMonth = (onNavigate) => {
    onNavigate("PREV");
    const prevMonth = date.month - 1;
    const year = prevMonth === 0 ? date.year - 1 : date.year;
    const month = prevMonth === 0 ? 12 : prevMonth;
    setDate({ year, month });
    console.log(date);
  };

  const handleNextMonth = (onNavigate) => {
    onNavigate("NEXT");
    const nextMonth = date.month + 1;
    const year = nextMonth === 13 ? date.year + 1 : date.year;
    const month = nextMonth === 13 ? 1 : nextMonth;
    setDate({ year, month });
    console.log(date);
  };

  return (
    <StyledCalendarToolbar.Container>
      <StyledChildManage.Title>출결관리</StyledChildManage.Title>
      <StyledCalendarToolbar.NavigateBtnWrapper>
        <StyledCalendarToolbar.PrevButton
          onClick={() => handlePrevMonth(onNavigate)}
        />
        <h3>{label}</h3>
        <StyledCalendarToolbar.NextButton
          onClick={() => handleNextMonth(onNavigate)}
        />
      </StyledCalendarToolbar.NavigateBtnWrapper>
      <StyledCalendarToolbar.AttendanceInfoWrapper>
        <StyledCalendarToolbar.AttendanceInfo boxColor="primary">
          <h3>출석</h3>
          <span>{info?.attendanceCount}</span>
        </StyledCalendarToolbar.AttendanceInfo>
        <StyledCalendarToolbar.AttendanceInfo boxColor="perple">
          <h3>결석</h3>
          <span>{info.absentCount}</span>
        </StyledCalendarToolbar.AttendanceInfo>
      </StyledCalendarToolbar.AttendanceInfoWrapper>
    </StyledCalendarToolbar.Container>
  );
};

export default CalendarToolbar;

const StyledCalendarToolbar = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 50px;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.color.grayScale[500]};
  `,

  NavigateBtnWrapper: styled.div`
    display: flex;
    justify-content: center;
    gap: 22px;
    h3 {
      ${textVariants.H3_SemiBold}
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${({ theme }) => theme.color.grayScale[500]};
    }
  `,

  PrevButton: styled(AiOutlineLeft)`
    font-size: 20px;
    cursor: pointer;
  `,
  NextButton: styled(AiOutlineRight)`
    font-size: 20px;
    cursor: pointer;
  `,
  AttendanceInfoWrapper: styled.div`
    display: flex;
    gap: 10px;
  `,
  AttendanceInfo: styled.div`
    display: flex;
    width: 115px;
    height: 44px;
    padding: 0px 8px;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    ${({ boxColor, theme }) => {
      const colors = {
        primary: {
          background: theme.color.green_darker,
          h3Color: theme.color.primary,
        },
        perple: {
          background: theme.color.perple_lighter,
          h3Color: theme.color.perple,
        },
      };

      return css`
        background-color: ${colors[boxColor].background};
        h3 {
          color: ${colors[boxColor].h3Color};
        }
      `;
    }}
    span {
      ${textVariants.H3_SemiBold}
    }
  `,
};

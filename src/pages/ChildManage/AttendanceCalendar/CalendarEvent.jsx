import styled, { css } from "styled-components";
import textVariants from "../../../styles/variants/textVariants";

const CalendarEvent = ({ event }) => {
  const { enterTime, exitTime, status } = event;

  return (
    <CalandarEvent.Container>
      <AttendanceLabel isAttendance={status === "출석"} />
      <CalandarEvent.Wrapper isEnterTime>
        <span>등원</span>
        <p>{enterTime}</p>
      </CalandarEvent.Wrapper>
      <CalandarEvent.Wrapper>
        <span>하원</span>
        <p>{exitTime}</p>
      </CalandarEvent.Wrapper>
    </CalandarEvent.Container>
  );
};

export default CalendarEvent;

const CalandarEvent = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 5px;
  `,

  Wrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    span {
      ${textVariants.Body2_SemiBold}
      border-radius: 20px;
      padding: 5px 11px;
      height: 100%;
      ${({ theme, isEnterTime }) =>
        isEnterTime
          ? css`
              color: ${theme.color.blue};
              background-color: ${theme.color.blue_lighter};
            `
          : css`
              color: ${theme.color.orange};
              background-color: ${theme.color.orange_lighter};
            `}
    }

    p {
      ${textVariants.Body2_SemiBold}
      color: ${({ theme }) => theme.color.grayScale[500]}
    }
  `,
};

const AttendanceLabel = styled.div`
  position: absolute;
  top: -35px;
  right: 10px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transform: rotate(-30deg);
  border: 2px solid
    ${({ theme, isAttendance }) =>
      isAttendance ? theme.color.primary : theme.color.perple};

  &::before {
    ${textVariants.Body2_SemiBold}
    content: ${({ isAttendance }) => (isAttendance ? `"출석"` : `"결석"`)};
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme, isAttendance }) =>
      isAttendance ? theme.color.primary : theme.color.perple};
    white-space: nowrap;
  }
`;

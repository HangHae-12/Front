import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { HostAPI } from "../../api/HostAPI";
import textVariants from "../../styles/variants/textVariants";
import Button from "../../components/Button";
import Buttons, {CustomButton} from "../../components/Buttons";
const ClassButtonGroup = () => {

  const queryClient = useQueryClient();
  const { classParam, scheduleParam } = useParams();
  const navigate = useNavigate();

  const [isAttendClick, setIsAttendClick] = useState(true);
  const [isLeaveClick, setIsLeaveClick] = useState(false);

  const [isTimeClick1, setIsTimeClick1] = useState(true);
  const [isTimeClick2, setIsTimeClick2] = useState(false);
  const [isTimeClick3, setIsTimeClick3] = useState(false);
  const [isTimeClick4, setIsTimeClick4] = useState(false);

  const [selectedButton, setSelectedButton] = useState("모든반");

  const [classId, setClassId] = useState(1);
  const [scheduleId, setScheduleId] = useState("ENTER");
  const [time, setTime] = useState(1);
  const [page, setPage] = useState(1);

  //맨처음 로드 되었을때 defalt 모든반,등원인원,전체시간 조회
  const hostParams = { scheduleId, time, page };

  // selectedButton의 값에 따라 다른 쿼리 실행
  const queryKey = selectedButton === "모든반"
  ? ["getManageEnter", hostParams]
  : ["getManageClassSchedule", { classId, ...hostParams }];

  const { isLoading, isError, data } = useQuery(queryKey, () => {
    if (selectedButton === "모든반") {
       HostAPI.getManageSchedule(hostParams);
    }
     HostAPI.getManageClassSchedule({ classId, ...hostParams });
  }, 
  {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {
      console.log("error");
    },
  }
);


  const loadAllClassroom = () => {
    setSelectedButton("모든반");
    navigate(`/host/ENTER`);
    queryClient.invalidateQueries(["getManageSchedule"]);
  };

  const loadClassroom = (selected, classId) => {
    setSelectedButton(selected);
    setClassId(classId);
    navigate(`/host/${classId}/ENTER`);
    queryClient.invalidateQueries(["getManageClassSchedule"]);
  };
  const handleAttendanceButton = (ScheduleId) => {
    if (ScheduleId === "ENTER") {
      setIsAttendClick(true);
      setIsLeaveClick(false);
    } else {
      setIsAttendClick(false);
      setIsLeaveClick(true);
    }
    setScheduleId(ScheduleId);
    selectedButton === "모든반"
      ? navigate(`/host/${ScheduleId}`)
      : navigate(`/host/${classId}/${ScheduleId}`);
  };

  return (
    <>
      <StyledAttendanceHeader>출결 관리</StyledAttendanceHeader>
      <StyledClassButtonGroup>
        <Button.ClassButton
          selected={"모든반"}
          selectedButton={selectedButton}
          onClick={() => loadAllClassroom()}
        />
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
      <StyledInfoContainer>
        <StyledInfoColomn>
          <StyleddateLabel>2023 03 03</StyleddateLabel>
          <StyleddateValue>수요일</StyleddateValue>
        </StyledInfoColomn>
        <StyledInfoRow>
          <StyledInfoLabel>총원</StyledInfoLabel>
          <StyledInfoValue>20</StyledInfoValue>
          <StyleddateLabel>명</StyleddateLabel>
        </StyledInfoRow>
        <StyledInfoRow>
          <StyledInfoLabel>등원</StyledInfoLabel>
          <StyledInfoValue>12</StyledInfoValue>
          <StyleddateLabel>명</StyleddateLabel>
        </StyledInfoRow>
        <StyledInfoRow>
          <StyledInfoLabel>미등원</StyledInfoLabel>
          <StyledInfoValue>6</StyledInfoValue>
          <StyleddateLabel>명</StyleddateLabel>
        </StyledInfoRow>
        <StyledInfoRow>
          <StyledInfoLabel>결석</StyledInfoLabel>
          <StyledInfoValue>2</StyledInfoValue>
          <StyleddateLabel>명</StyleddateLabel>
        </StyledInfoRow>
      </StyledInfoContainer>

      <StyledAttendanceButtonGroup>
      <StyledAttendanceButton
          isClick={isLeaveClick}
          onClick={() => handleAttendanceButton("EXIT")}
        >
          등원 인원
        </StyledAttendanceButton>

        <StyledAttendanceButton
          isClick={isLeaveClick}
          onClick={() => handleAttendanceButton("EXIT")}
        >
          하원 인원
        </StyledAttendanceButton>
      </StyledAttendanceButtonGroup>
      <StyledAttendanceContainer>
        <StyledTimeButtonGroup>
          <StyledTimeButton
            isClick={isAttendClick}
            onClick={() => {
              setIsTimeClick1(true);
              setIsTimeClick2(false);
              setIsTimeClick3(false);
              setIsTimeClick4(false);
            }}
          >
            전체시간
          </StyledTimeButton>
          <StyledTimeButton
            isClick={isTimeClick2}
            onClick={() => {
              setIsTimeClick1(false);
              setIsTimeClick2(true);
              setIsTimeClick3(false);
              setIsTimeClick4(false);
            }}
          >
            07시~08시
          </StyledTimeButton>
          <StyledTimeButton
            isClick={isTimeClick3}
            onClick={() => {
              setIsTimeClick1(false);
              setIsTimeClick2(false);
              setIsTimeClick3(true);
              setIsTimeClick4(false);
            }}
          >
            08시~09시
          </StyledTimeButton>
          <StyledTimeButton
            isClick={isTimeClick4}
            onClick={() => {
              setIsTimeClick1(false);
              setIsTimeClick2(false);
              setIsTimeClick3(false);
              setIsTimeClick4(true);
            }}
          >
            09시~10시
          </StyledTimeButton>
        </StyledTimeButtonGroup>
        <StyledStudentGrid>

        {
          //서버 연결되면  id값 변경 및 데이터 바인딩,옵셔널 체이닝
          data?.map((item) => {
          return(
                <StyledStudentCard key={item.childId}>
                <StyledProfileRow>
                  <StyledStudentProfile />
                  <StyledProfileGroup>
                    <StyledStudentName>김민재</StyledStudentName>
                    <StyledStudentStatus status={"미등원"}>
                      {item.currentStatus}
                    </StyledStudentStatus>
                  </StyledProfileGroup>
                </StyledProfileRow>
                <StyledAttendanceRow>
                  <StyledAttendanceLabel>등원</StyledAttendanceLabel>
                  <StyledAttendanceValue>{item.enterTime}</StyledAttendanceValue>
                </StyledAttendanceRow>
                <StyledAttendanceRow>
                  <StyledAttendanceLabel>하원</StyledAttendanceLabel>
                  <StyledAttendanceValue>{item.exitTime}</StyledAttendanceValue>
                </StyledAttendanceRow>
                <StyledAttendanceBtn>등원처리</StyledAttendanceBtn>
              </StyledStudentCard>
          );
          })
        }
          
        </StyledStudentGrid>
      </StyledAttendanceContainer>
      <StyledPagination>
        <StyledPaginationButton>1</StyledPaginationButton>
        <StyledPaginationButton>2</StyledPaginationButton>
        <StyledPaginationButton>3</StyledPaginationButton>
      </StyledPagination>
    </>
  );
};

export default ClassButtonGroup;

const StyledAttendanceHeader = styled.h2`
  ${textVariants.H2_Bold}
  margin-bottom: 20px;
`;

const StyledClassButtonGroup = styled.div`
  padding-bottom: 10px;
`;

const StyledInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  margin: 64px auto;
  border: 2px solid ${({ theme }) => theme.color.grayScale[200]};
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  padding: 40px 64px 40px 25px;
`;
const StyledInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  gap: 24px;
  width: 200px;
  height: 80px;
`;
const StyledInfoColomn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 80px;
`;
const StyledProfileRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const StyleddateLabel = styled.div`
  ${textVariants.H3_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
`;

const StyleddateValue = styled.div`
  ${textVariants.H2_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[700]};
`;

const StyledInfoLabel = styled.div`
  ${textVariants.Body1_Bold}
  color: ${({ theme }) => theme.color.grayScale[400]};
`;
const StyledInfoValue = styled.div`
  ${textVariants.H1}
  color: ${({ theme }) => theme.color.grayScale[500]};
`;
const StyledAttendanceContainer = styled.div`
  background: rgba(237, 245, 238, 0.8);
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  padding: 40px;
`;
const StyledStudentGrid = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, auto);
  grid-gap: 20px;
  margin-top: 20px;
`;

const StyledStudentCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[300]};
  border-radius: 4px;

  width: 240px;
  height: 304px;
`;

const StyledStudentProfile = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.grayScale[400]};
  margin-right: 29px;
`;

const StyledStudentName = styled.div`
  ${textVariants.H2_SemiBold}
`;

const StyledStudentStatus = styled.div`
  ${textVariants.Body2_SemiBold}
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme, status }) =>
    status === "미등원" ? theme.color.red : theme.color.grayScale[300]};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  padding: 4px;
  gap: 4px;
  border-radius: 20px;
  width: 51px;
  height: 26px;
`;

const StyledAttendanceButtonGroup = styled.div`
  padding-top: 64px;
  padding-bottom: 40px;
  gap: 10px;
`;

const StyledAttendanceButton = styled.button`
  ${textVariants.Body2_SemiBold}
  background-color: ${({ theme, isClick }) =>
    isClick ? theme.color.primary : theme.color.grayScale[300]};
  color: ${({ theme, isClick }) =>
    isClick ? theme.color.white : theme.color.grayScale[800]};
  border: none;
  border-radius: 4px;
  padding: 10px;
  margin-left: auto;
  margin-right: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.color.primary};

    color: ${({ theme }) => theme.color.white};
  }
`;

const StyledTimeButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledTimeButton = styled.button`
  ${textVariants.Body2_SemiBold}
  background-color: ${({ theme, isClick }) =>
    isClick ? theme.color.primary : theme.color.grayScale[300]};
  color: ${({ theme, isClick }) =>
    isClick ? theme.color.white : theme.color.grayScale[800]};
  border: none;
  border-radius: 4px;
  padding: 10px;
  margin-right: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.white};
  }
`;

const StyledProfileGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledAttendanceRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 172px;
  height: 36px;
  background-color: ${({ theme }) => theme.color.grayScale[50]};
`;

const StyledAttendanceLabel = styled.div`
  ${textVariants.Body2_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-right: 10px;
`;

const StyledAttendanceValue = styled.div`
  ${textVariants.Body2_Bold}
  color: ${({ theme }) => theme.color.grayScale[700]};
`;

const StyledAttendanceBtn = styled.button`
  background-color: ${({ theme }) => theme.color.blue};
  color: ${({ theme }) => theme.color.white};
  border: none;
  border-radius: 8px;
  margin-top: 20px;
  padding: 8px 10px;
  gap: 10px;

  width: 172px;
  height: 40px;
`;

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyledPaginationButton = styled.button`
  ${textVariants.Body2_SemiBold}
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white};
  border: none;
  border-radius: 4px;
  padding: 10px;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
`;

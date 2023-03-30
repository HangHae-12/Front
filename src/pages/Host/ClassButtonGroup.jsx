import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { HostAPI } from "../../api/HostAPI";
import textVariants from "../../styles/variants/textVariants";
import Button from "../../components/Button";
import Buttons, { CustomButton } from "../../components/Buttons";
import Pagination from 'rc-pagination';
const ClassButtonGroup = () => {

  const queryClient = useQueryClient();
  const { classroomId, scheduleParam, timeParm } = useParams();
  const navigate = useNavigate();

  const [isAttendClick, setIsAttendClick] = useState(true);
  const [isLeaveClick, setIsLeaveClick] = useState(false);

  const [timeButtonState, setTimeButtonState] = useState({
    '전체시간': true,
    '07~08시': false,
    '08~09시': false,
    '09~10시': false
  });


  const [selectedButton, setSelectedButton] = useState("모든반");

  const [classId, setClassId] = useState(1);
  const [scheduleId, setScheduleId] = useState("ENTER");
  const [time, setTime] = useState("전체시간");
  const [page, setPage] = useState(1);



  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const todayString = `${year}.${month}.${day}`;
  const dayOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][today.getDay()];


  //등원,하원,timea,page param
  const hostParams = { type: scheduleId, dailyEnterTime: time, page };


  //조회쿼리가 2개이므로 유지보수성을 위해서 객체 분해 형식으로 변수지정

  const { isLoading: isLoadingClass, isError: isErrorClass, data: classData } = useQuery(
    ["getManageClass", classId],
    () => HostAPI.getManageClass(classId)
  );

  const { isLoading: isLoadingSchedule, isError: isErrorSchedule, data: scheduleData } = useQuery(
    ["getManageTimeSchedule", hostParams],
    () => HostAPI.getManageTimeSchedule({ classId, ...hostParams })
  );

  let bindData = [];

  //빈배열이 담지 않고 데이터 바인딩 전 분기되도록 구현
  if (!isLoadingClass && !isLoadingSchedule) {
    if (scheduleId === "등원인원" && time === "전체시간") {
      if (classData) {
        bindData = classData.childEnterResponseDtoList;
      }
    } else if (scheduleId === "하원인원") {
      if (scheduleData) {
        bindData = scheduleData.childEnterResponseDtoList;
      }
    } else if (time !== "전체시간") {
      if (scheduleData) {
        bindData = scheduleData.childEnterResponseDtoList;
      }
    }
  }



  // selectedButton의 값에 따라 다른 쿼리 실행
  // const queryKey = selectedButton === "모든반"
  //   ? ["getManageEnter", hostParams]
  //   : ["getManageClassSchedule", { classId, ...hostParams }];

  // const { isLoading2, isError2, data2 } = useQuery(
  //   queryKey,
  //   async () => {
  //     if (selectedButton === "모든반") {
  //       const result = await HostAPI.getManageSchedule(hostParams);
  //       return result.data;
  //     } else {
  //       const result = await HostAPI.getManageClassSchedule({
  //         classId,
  //         ...hostParams,
  //       });
  //       return result.data;
  //     }
  //   },
  //   {
  //     onSuccess: (data) => {
  //       console.log(data);
  //     },
  //     onError: () => {
  //       console.log("error");
  //     },
  //   }
  // );

  //페이지네이션 페이지 지정


  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = Math.ceil((bindData?.length || 0) / 15);
  const totalItems = bindData?.length || 0;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }


  // const loadAllClassroom = () => {
  //   setSelectedButton("모든반");
  //   navigate(`/host/${scheduleId}`);
  //   queryClient.invalidateQueries(["getManageSchedule", hostParams]);
  // };

  const loadClassroom = (selected, classId) => {
    setSelectedButton(selected);
    setClassId(classId);
    navigate(`/host/${classId}/ENTER/전체시간`);
    queryClient.invalidateQueries(["getManageClass", classId]);
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
    navigate(`/host/${classId}/${ScheduleId}/전체시간`);
    queryClient.invalidateQueries(["getManageTimeSchedule", hostParams]);
  };
  //시간버튼 눌렀을때 추가
  const handleTimeButton = (timeId) => {
    setTime(timeId);
    navigate(`/host/${classId}/${scheduleId}/${timeId}`);
    queryClient.invalidateQueries(["getManageTimeSchedule", hostParams]);

    setTimeButtonState(prevState => ({
      ...prevState,
      '전체시간': timeId === '전체시간',
      '07~08시': timeId === '07~08시',
      '08~09시': timeId === '08~09시',
      '09~10시': timeId === '09~10시'
    }));
  };


  return (
    <>
      <StyledAttendanceHeader>출결 관리</StyledAttendanceHeader>
      <StyledClassButtonGroup>
        <Button.ClassButton
          selected={"모든반"}
          selectedButton={selectedButton}
          onClick={() => loadClassroom("모든반", 1)}
        />
        <Button.ClassButton
          selected={"새빛반"}
          selectedButton={selectedButton}
          onClick={() => loadClassroom("새빛반", 2)}
        />
        <Button.ClassButton
          selected={"동동반"}
          selectedButton={selectedButton}
          onClick={() => loadClassroom("동동반", 3)}
        />
        <Button.ClassButton
          selected={"빗살반"}
          selectedButton={selectedButton}
          onClick={() => loadClassroom("빗살반", 4)}
        />
      </StyledClassButtonGroup>
      <StyledInfoContainer>
        <StyledInfoColomn>
          <StyleddateLabel>{todayString}</StyleddateLabel>
          <StyleddateValue>{dayOfWeek}</StyleddateValue>
        </StyledInfoColomn>
        <StyledInfoRow>
          <StyledInfoLabel>총원</StyledInfoLabel>
          <StyledInfoValue>{bindData?.totalNumber}</StyledInfoValue>
          <StyleddateLabel>명</StyleddateLabel>
        </StyledInfoRow>
        <StyledInfoRow>
          <StyledInfoLabel>등원</StyledInfoLabel>
          <StyledInfoValue>{bindData?.notEnterNumber}</StyledInfoValue>
          <StyleddateLabel>명</StyleddateLabel>
        </StyledInfoRow>
        <StyledInfoRow>
          <StyledInfoLabel>미등원</StyledInfoLabel>
          <StyledInfoValue>{bindData?.exitNumber}</StyledInfoValue>
          <StyleddateLabel>명</StyleddateLabel>
        </StyledInfoRow>
        {/* <StyledInfoRow>
          <StyledInfoLabel>결석</StyledInfoLabel>
          <StyledInfoValue>{data.totalNumber}</StyledInfoValue>
          <StyleddateLabel>명</StyleddateLabel>
        </StyledInfoRow> */}
      </StyledInfoContainer>

      <StyledAttendanceButtonGroup>
        <StyledAttendanceButton
          isClick={isLeaveClick}
          onClick={() => handleAttendanceButton("ENTER")}
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
            onClick={() => { handleTimeButton("전체시간") }}
          >
            전체시간
          </StyledTimeButton>
          <StyledTimeButton
            isClick={timeButtonState}
            onClick={() => { handleTimeButton("07시~08시") }}
          >
            07시~08시
          </StyledTimeButton>
          <StyledTimeButton
            isClick={timeButtonState}
            onClick={() => { handleTimeButton("08시~09시") }}
          >
            08시~09시
          </StyledTimeButton>
          <StyledTimeButton
            isClick={timeButtonState}
            onClick={() => { handleTimeButton("09시~10시") }}
          >
            09시~10시
          </StyledTimeButton>
        </StyledTimeButtonGroup>
        <StyledStudentGrid>

          {

            //서버 연결되면  id값 변경 및 데이터 바인딩,옵셔널 체이닝
            Array.isArray(bindData) && bindData?.map((item) => {
              return (
                <StyledStudentCard key={item.childId}>
                  <StyledProfileRow>
                    <StyledStudentProfile imageUrl={item.profileImageUrl} />
                    <StyledProfileGroup>
                      <StyledStudentName>{item.name}</StyledStudentName>
                      <StyledStudentStatus status={item.currentStatus}>
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
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={handlePageChange}
      />
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
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto; 
  grid-gap: 20px;
  margin-top: 20px;

  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(2, 1fr); // 가로로 2개씩
    grid-template-rows: repeat(8, auto); // 세로로 8개씩
  }
`;


const StyledStudentCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 0.8px solid ${({ theme }) => theme.color.grayScale[300]};
  box-shadow: 0px 0.8px 9.6px rgba(0, 0, 0, 0.02);
  border-radius: 8px;

  background-color: ${({ theme }) => theme.color.white};
  width: 240px;
  height: 304px;
`;

const StyledStudentProfile = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  margin-right: 29px;
`;

const StyledStudentName = styled.div`
  ${textVariants.H2_SemiBold}
`;

const StyledStudentStatus = styled.div`
  ${textVariants.Body2_SemiBold}
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme, status }) =>
    status ? theme.color.red : theme.color.grayScale[300]};
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

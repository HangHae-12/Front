import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { HostAPI } from "../../api/HostAPI";
import textVariants from "../../styles/variants/textVariants";
import Button from "../../components/Button";
import Buttons from "../../components/Buttons";
import ClassButton from "./ClassButton";
import Attendee from "./Attendee";
import Schedule from "./Schedule";
import Time from "./Time";
import Children from "./Children";
import Pagination from "../../components/Pagination";

const ClassButtonGroup = () => {
  const queryClient = useQueryClient();
  const { classroomId, scheduleId, timeId } = useParams();
  const navigate = useNavigate();
  const [time, setTime] = useState("전체시간");
  const [page, setPage] = useState(1);

  //등원,하원,timea,page param
  const hostParams = { type: scheduleId, dailyEnterTime: timeId, page };

  //조회쿼리가 2개이므로 유지보수성을 위해서 객체 분해 형식으로 변수지정

  const {
    isLoading: isLoadingClass,
    isError: isErrorClass,
    data: classData,
  } = useQuery(["getManageClass", classroomId], () =>
    HostAPI.getManageClass(classroomId)
  );
  console.log(classData);
  const {
    isLoading: isLoadingSchedule,
    isError: isErrorSchedule,
    data: scheduleData,
  } = useQuery(["getManageTimeSchedule", hostParams], () =>
    HostAPI.getManageTimeSchedule({ classroomId, ...hostParams })
  );
  useEffect(() => {
    queryClient.invalidateQueries(["getManageClass", 0]);
  }, [queryClient]);

  //빈배열이 담지 않고 데이터 바인딩 전 분기되도록 구현
  const [bindData, setBindData] = useState([]);

  useEffect(() => {
    // if (!isLoadingClass && !isLoadingSchedule) {
    if (scheduleId === "ENTER" && time === "전체시간") {
      if (classData) {
        setBindData(classData.childEnterResponseDtoList);
      }
    } else if (scheduleId === "EXIT") {
      if (scheduleData) {
        setBindData(scheduleData.childEnterResponseDtoList);
      }
    } else if (time !== "전체시간") {
      if (scheduleData) {
        setBindData(scheduleData.childEnterResponseDtoList);
      }
    }
  }, [classData, scheduleData, classroomId, scheduleId, time]);

  console.log(bindData);

  //페이지네이션 페이지 지정

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = Math.ceil((bindData?.length || 0) / 15);
  const totalItems = bindData?.length || 0;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <StyledAttendanceHeader>출결 관리</StyledAttendanceHeader>
      <ClassButton />
      <Attendee classData={classData} />
      <Schedule hostParams={hostParams} />
      <StyledAttendanceContainer>
        <Time hostParams={hostParams} />
        <Children bindData={bindData} />
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

const StyledAttendanceContainer = styled.div`
  background-color: ${({ theme }) => theme.color.green_darker};
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  padding: 40px;
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

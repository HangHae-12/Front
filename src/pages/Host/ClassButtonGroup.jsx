import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { HostAPI } from "../../api/HostAPI";
import textVariants from "../../styles/variants/textVariants";
import ClassButton from "./ClassButton";
import Attendee from "./Attendee";
import Schedule from "./Schedule";
import ExitTime from "./ExitTime";
import EnterTime from "./EnterTime";
import Children from "./Children";
import Pagination from "../../components/CustomPagination";


const ClassButtonGroup = () => {

  const queryClient = useQueryClient();
  const { classroomId = 0, scheduleId = "ENTER", timeId = "전체시간" } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(15);

  //등원,하원,timea,page param
  const hostParams = { classroomId, state: scheduleId, time: timeId, page, size };

  const { isLoading, isError, data } = useQuery(["getManageSchedule", hostParams], () =>
    HostAPI.getManageSchedule(hostParams)
  );
  console.log(classroomId);

  useEffect(() => {
    queryClient.invalidateQueries(["getManageSchedule", 0]);
  }, [queryClient]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!data) return null; // 데이터가 로드되지 않은 경우

  //페이지네이션 페이지 지정
  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);

  };

  return (
    <>
      <StyledAttendanceHeader>출결 관리</StyledAttendanceHeader>
      <ClassButton />
      <Attendee classData={data.data.info} />
      <Schedule hostParams={hostParams} />
      <StyledAttendanceContainer>
        {
          scheduleId === "ENTER"
            ? <EnterTime hostParams={hostParams} />
            : <ExitTime hostParams={hostParams} />
        }

        <Children bindData={data.data.content} />
        <Pagination
          current={data.data.pageable.pageNumber + 1} // 백엔드로직 리팩토링 필요
          pageSize={data.data.pageable.pageSize}
          total={data.data.totalElements}
          onChange={handlePageChange}
        />
      </StyledAttendanceContainer>

    </>
  );
};

export default ClassButtonGroup;

const StyledAttendanceHeader = styled.h2`
  ${textVariants.H2_Bold}
  margin-bottom: 20px;
`;

const StyledAttendanceContainer = styled.div`
  /* background-color: ${({ theme }) => theme.color.green_darker}; */
  background-color:#EDF5EECC;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  padding: 40px;
`;


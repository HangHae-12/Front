import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { HostAPI } from "../../api/HostAPI";
import textVariants from "../../styles/variants/textVariants";
import ClassButton from "./ClassButton";
import Attendee from "./Attendee";
import Schedule from "./Schedule";
import Time from "./Time";
import Children from "./Children";
import Pagination from "../../components/CustomPagination";


const ClassButtonGroup = () => {

  const queryClient = useQueryClient();
  const { classroomId, scheduleId, timeId } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(15);

  //등원,하원,timea,page param
  const hostParams = { classroomId, state: scheduleId, time: timeId, page, size };

  const { isLoading, isError, data } = useQuery(["getManageSchedule", hostParams], () =>
    HostAPI.getManageSchedule({ hostParams })
  );

  useEffect(() => {
    queryClient.invalidateQueries(["getManageSchedule", 0]);
  }, [queryClient]);


  //페이지네이션 페이지 지정
  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <>
      <StyledAttendanceHeader>출결 관리</StyledAttendanceHeader>
      <ClassButton />
      <Attendee classData={data.info} />
      <Schedule hostParams={hostParams} />
      <StyledAttendanceContainer>
        <Time hostParams={hostParams} />
        <Children bindData={data} />
        <Pagination
          current={page}
          pageSize={data.pageable.pageSize}
          total={data.size}
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


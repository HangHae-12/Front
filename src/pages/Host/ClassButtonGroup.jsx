import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { HostAPI } from "../../api/HostAPI";
import textVariants from "../../styles/variants/textVariants";
import ClassButton from "./ClassButton";
import Attendee from "./Attendee";
import Schedule from "./Schedule";
import ExitTime from "./ExitTime";
import EnterTime from "./EnterTime";
import Children from "./Children";
import Pagination from "../../components/CustomPagination";
import { paginationAtom } from "../../atom/hostButtonAtom";
import { motion } from 'framer-motion';

const ClassButtonGroup = () => {

  const queryClient = useQueryClient();
  const { classroomId = 0, scheduleId = "ENTER", timeId = 0 } = useParams();
  const [page, setPage] = useRecoilState(paginationAtom);
  const [size, setSize] = useState(14);

  const time = ["전체시간", "07시~08시", "08시~09시", "09시~10시", "16시~17시", "17시~18시", "18시~19시"][parseInt(timeId)];
  //등원,하원,timea,page param
  const hostParams = { classroomId, state: scheduleId, time: time, page, size };

  const { isLoading, isError, error, data } = useQuery(
    ["getManageSchedule", hostParams],
    () => HostAPI.getManageSchedule(hostParams),
    {
      onError: (error) => {
        console.log("getManageSchedule error:", error);
      },
    }
  );

  useEffect(() => {
    queryClient.invalidateQueries(["getManageSchedule", 0]);
  }, [queryClient]);

  if (!data) return null; // 데이터가 로드되지 않은 경우

  //페이지네이션 페이지 지정
  const handlePageChange = (page) => {
    setPage(page);
  };

  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <StyledAttendanceHeader>출결 관리</StyledAttendanceHeader>
      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <ClassButton hostParams={hostParams} />
      </motion.div>
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0.2}>
        <Attendee classData={data?.data?.data?.info} />
      </motion.div>
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0.4}>
        <Schedule hostParams={hostParams} />
      </motion.div>

      <StyledAttendanceContainer variants={fadeInUp} initial="hidden" animate="visible" custom={0.6}>
        {
          scheduleId === "ENTER"
            ? <EnterTime />
            : <ExitTime />
        }

        <Children bindData={data.data.data.content} />
        <Pagination
          current={data.data.data.pageable.pageNumber + 1}
          pageSize={data.data.data.pageable.pageSize}
          total={data.data.data.totalElements}
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

const StyledAttendanceContainer = styled(motion.div)`
  /* background-color: ${({ theme }) => theme.color.green_darker}; */
  background-color:#EDF5EECC;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 24px 40px;
  @media ${({ theme }) => theme.device.desktop} {
    
  }

`;


import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { HostAPI } from "../../api/HostAPI";
import Buttons from "../../components/Buttons";
import textVariants from "../../styles/variants/textVariants";
import { scheduledIdAtom } from "../../atom/hostButtonAtom";

const Children = ({ bindData }) => {
  const queryClient = useQueryClient();
  //useSearchParams 알아보기
  const { classroomId, scheduleId, timeId } = useParams();
  const navigate = useNavigate();
  const { enterTime, exitTime } = bindData;

  const updateExitMutation = useMutation(HostAPI.updateExit, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getManageTimeSchedule"]);
      // queryClient.setQueryData(["getManageTimeSchedule"]);
    },
  });
  const handleSchedule = () => {
    updateExitMutation.mutate()
  }

  return (
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
                  <Buttons.State colorTypes="red">{item.currentStatus}</Buttons.State>
                </StyledProfileGroup>
              </StyledProfileRow>
              <StyledAttendanceGroup>
                <StyledAttendanceRow>
                  <StyledAttendanceLabel>등원시간</StyledAttendanceLabel>
                  <StyledAttendanceValue>{item.enterTime}</StyledAttendanceValue>
                </StyledAttendanceRow>
                <StyledAttendanceRow>
                  <StyledAttendanceLabel>하원시간</StyledAttendanceLabel>
                  <StyledAttendanceValue>{item.exitTime}</StyledAttendanceValue>
                </StyledAttendanceRow>
              </StyledAttendanceGroup>
              {
                scheduleId === "ENTER"
                  ?
                  item.currentStatus === "미등원"
                    ? <StyledAttendanceBtn onClick={() => handleSchedule}>등원처리</StyledAttendanceBtn>
                    : <StyledAttendanceBtn onClick={() => handleSchedule}>등원취소</StyledAttendanceBtn>
                  :
                  item.currentStatus === "미하원"
                    ? <StyledAttendanceBtn onClick={() => handleSchedule}>하원처리</StyledAttendanceBtn>
                    : <StyledAttendanceBtn onClick={() => handleSchedule}>하원취소</StyledAttendanceBtn>
              }
            </StyledStudentCard>
          );
        })
      }

    </StyledStudentGrid>
  );
};

export default Children;
const StyledStudentGrid = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto; 
  grid-gap: 12px;
  margin-top: 24px;

  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(3, 1fr); // 가로로 2개씩
    grid-template-rows: repeat(8, auto); // 세로로 8개씩
  }
`;


const StyledStudentCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 22px;
  padding-bottom: 22px;
  border: 0.8px solid ${({ theme }) => theme.color.grayScale[300]};
  box-shadow: 0px 0.8px 9.6px rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.white};
  width: 180px;
  height: 240px;
`;

const StyledProfileRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
`;


const StyledStudentProfile = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  margin-right: 29px;
`;

const StyledStudentName = styled.div`
  ${textVariants.Body1_SemiBold}
  
`;


const StyledProfileGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;
const StyledAttendanceGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 24px;
  gap: 4px;
`
const StyledAttendanceRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 132px;
  height: 32px;
  background-color: ${({ theme }) => theme.color.grayScale[50]};
`;

const StyledAttendanceLabel = styled.div`
  ${textVariants.Body3_Regular}
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin: 10px;
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
  padding: 6.4px 8px;
  gap: 10px;
  width: 132px;
  height: 32px;

`;
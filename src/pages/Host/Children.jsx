import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import Buttons from "../../components/Buttons";
import textVariants from "../../styles/variants/textVariants";

const Children = ({ bindData }) => {
  const queryClient = useQueryClient();
  //useSearchParams 알아보기
  const { classroomId, scheduleId, timeId } = useParams();
  const navigate = useNavigate();



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
  );
};

export default Children;
const StyledStudentGrid = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
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

const StyledProfileRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
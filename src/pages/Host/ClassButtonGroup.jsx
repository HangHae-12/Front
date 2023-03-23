import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate,useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { HostAPI } from "../../api/hostAPI";
import textVariants from "../../styles/textVariants";

const ClassButtonGroup = () => {
  const queryClient = useQueryClient();
  const { classroomId } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data } = useQuery(
    ["getManage"],
    () => HostAPI.getManage(),
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
    //모든반을 클릭했을 때 전체 데이터 조회되게
  }
  
  const loadClassroom = (id) => {
    navigate(`/${id}`)
  }
  

  return (
    <Container>
      <LeftContainer>
        {/* Left Navigation Bar */}
      </LeftContainer>
      <RightContainer>
        <AttendanceHeader>출결 관리</AttendanceHeader>
        <div>
          <ClassButton>모든반</ClassButton>
          <ClassButton>새빛반</ClassButton>
          <ClassButton>동동반</ClassButton>
          <ClassButton>빗살반</ClassButton>
        </div>
        <InfoRow>
          <InfoLabel>날짜</InfoLabel>
          <InfoValue>2023년 3월 23일 (수)</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>총원</InfoLabel>
          <InfoValue>20명</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>등원</InfoLabel>
          <InfoValue>12명</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>미등원</InfoLabel>
          <InfoValue>6명</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>결석</InfoLabel>
          <InfoValue>2명</InfoValue>
        </InfoRow>
        
        <div>
          <AttendanceButton status="등원">등원 인원</AttendanceButton>
          <AttendanceButton status="미등원">하원 인원</AttendanceButton>
        </div>
        <div>
          <TimeButton>전체시간</TimeButton>
          <TimeButton>07시~08시</TimeButton>
          <TimeButton>08시~09시</TimeButton>
          <TimeButton>09시~10시</TimeButton>
        </div>
        <StudentGrid>
          <StudentCard>
            
            <StudentProfile></StudentProfile>
            <StudentName>ddd</StudentName>
            <StudentStatus>미등원</StudentStatus>
            <StudentInfo>
            </StudentInfo>
          </StudentCard>
        </StudentGrid>
        <Pagination>
          <PaginationButton>1</PaginationButton>
          <PaginationButton>2</PaginationButton>
          <PaginationButton>3</PaginationButton>
        </Pagination>
      </RightContainer>
    </Container>
  );
  };
  
  export default ClassButtonGroup;

  const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const LeftContainer = styled.div`
  width: 200px;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.grayScale[200]};
`;

const RightContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const AttendanceHeader = styled.h2`
  ${textVariants.H2_Bold}
  margin-bottom: 20px;
`;

const ClassButton = styled.button`
  ${textVariants.Body1_Bold}
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

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const InfoLabel = styled.div`
  ${textVariants.Body3_SemiBold}
  width: 80px;
`;

const InfoValue = styled.div`
  ${textVariants.Body3_Regular}
`;

const StudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, auto);
  grid-gap: 20px;
  margin-top: 20px;
`;

const StudentCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[300]};
  border-radius: 4px;
`;

const StudentProfile = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.grayScale[400]};
  margin-right: 10px;
`;

const StudentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StudentName = styled.div`
  ${textVariants.Body1_SemiBold}
`;

const StudentStatus = styled.div`
  ${textVariants.Body3_Regular}
  color: ${({ status, theme }) =>
    status === "미등원"
      ? theme.color.red
      : status === "등원"
      ? theme.color.green
      : theme.color.black};
`;

const AttendanceButton = styled.button`
  ${textVariants.Body2_SemiBold}
  background-color: ${({ status, theme }) =>
    status === "등원" ? theme.color.green : theme.color.grayScale[300]};
  color: ${({ status, theme }) =>
    status === "등원" ? theme.color.white : theme.color.grayScale[800]};
  border: none;
  border-radius: 4px;
  padding: 10px;
  margin-left: auto;
`;

const TimeButton = styled.button`
  ${textVariants.Body2_SemiBold}
  background-color: ${({ theme }) => theme.color.grayScale[300]};
  color: ${({ theme }) => theme.color.grayScale[800]};
  border: none;
  border-radius: 4px;
  padding: 10px;
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  ${textVariants.Body2_SemiBold}
  background-color: ${({ theme }) => theme.color.grayScale[300]};
  color: ${({ theme }) => theme.color.grayScale[800]};
  border: none;
  border-radius: 4px;
  padding: 10px;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
`;
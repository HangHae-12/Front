import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate,useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { HostAPI } from "../../api/hostAPI";
import textVariants from "../../styles/textVariants";
import ClassButton from '../../components/ClassButton';

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

  const [isAttendClick, setIsAttendClick] = useState(true);
  const [isLeaveClick, setIsLeaveClick] = useState(false);
  
  const [selectedButton, setSelectedButton] = useState("모든반");

const handleButtonClick = (selected) => {
  setSelectedButton(selected);
};

  return (
        <>
        <StyledAttendanceHeader>출결 관리</StyledAttendanceHeader>
        <StyledClassButtonGroup>
        <ClassButton selected={"모든반"} selectedButton={selectedButton} onClick={() => handleButtonClick("모든반")} />
        <ClassButton selected={"새빛반"} selectedButton={selectedButton} onClick={() => handleButtonClick("새빛반")} />
        <ClassButton selected={"동동반"} selectedButton={selectedButton} onClick={() => handleButtonClick("동동반")} />
        <ClassButton selected={"빗살반"} selectedButton={selectedButton} onClick={() => handleButtonClick("빗살반")} />
        </StyledClassButtonGroup>
        <StyledInfoContainer>
          <StyledInfoColomn>
            <StyledInfoLabel>2023 03 03</StyledInfoLabel>
            <StyledInfoValue>수요일</StyledInfoValue>
          </StyledInfoColomn>
          <StyledInfoRow>
            <StyledInfoLabel>총원</StyledInfoLabel>
            <StyledInfoValue>20</StyledInfoValue>
          </StyledInfoRow>
          <StyledInfoRow>
            <StyledInfoLabel>등원</StyledInfoLabel>
            <StyledInfoValue>12</StyledInfoValue>
          </StyledInfoRow>
          <StyledInfoRow>
            <StyledInfoLabel>미등원</StyledInfoLabel>
            <StyledInfoValue>6</StyledInfoValue>
          </StyledInfoRow>
          <StyledInfoRow>
            <StyledInfoLabel>결석</StyledInfoLabel>
            <StyledInfoValue>2</StyledInfoValue>
          </StyledInfoRow>
        </StyledInfoContainer>

        
        <div>
        <StyledAttendanceButton
          status="등원"
          isClick={isAttendClick}
          onClick={() => {
            setIsAttendClick(true);
            setIsLeaveClick(false);
          }}
        >
          등원 인원
        </StyledAttendanceButton>
        <StyledAttendanceButton
          status="미등원"
          isClick={isLeaveClick}
          onClick={() => {
            setIsLeaveClick(true);
            setIsAttendClick(false);
          }}
        >
          하원 인원
        </StyledAttendanceButton>
        </div>
        <div>
          <StyledTimeButton>전체시간</StyledTimeButton>
          <StyledTimeButton>07시~08시</StyledTimeButton>
          <StyledTimeButton>08시~09시</StyledTimeButton>
          <StyledTimeButton>09시~10시</StyledTimeButton>
        </div>
        <StyledStudentGrid>
          <StyledStudentCard>
            
            <StyledStudentProfile/>
            <StyledProfileColomn>
            <StyledStudentName>김민재</StyledStudentName>
            <StyledStudentStatus status="미등원">미등원</StyledStudentStatus>
            </StyledProfileColomn>
            <StyledStudentInfo>
            </StyledStudentInfo>
          </StyledStudentCard>
        </StyledStudentGrid>
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
  
`


const StyledInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  margin-bottom: 20px;
`;
const StyledInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.color.grayScale[50]};
  border-radius: 8px;
  padding: 0px;
  gap: 24px;
  width: 200px;
  height: 80px;
`;
const StyledInfoColomn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;
`;
const StyledProfileColomn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const StyledInfoLabel = styled.div`
  ${textVariants.Body3_Regular}
  
`;
const StyledInfoValue = styled.div`
  ${textVariants.Body3_SemiBold}
  ${textVariants.Body1_Bold}
`;

const StyledStudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, auto);
  grid-gap: 20px;
  margin-top: 20px;
`;

const StyledStudentCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[300]};
  border-radius: 4px;
`;

const StyledStudentProfile = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.grayScale[400]};
  margin-right: 10px;
`;

const StyledStudentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledStudentName = styled.div`
  ${textVariants.Body1_SemiBold}
`;

const StyledStudentStatus = styled.div`
  ${textVariants.Body3_Regular}
  color: ${({ status, theme }) =>
    status === "미등원"
      ? theme.color.red
      : status === "등원"
      ? theme.color.green
      : theme.color.black};
`;

const StyledAttendanceButton = styled.button`
  ${textVariants.Body2_SemiBold}
  background-color: ${({ theme, isClick }) =>
    isClick
        ? theme.color.green
        : theme.color.grayScale[300]};
  color: ${({ theme, isClick }) =>
    isClick
      
        ? theme.color.white
        : theme.color.grayScale[800]};
  border: none;
  border-radius: 4px;
  padding: 10px;
  margin-left: auto;

  &:hover {
    background-color: ${({ theme }) => theme.color.green_lighter}; 

    color: ${({ theme, isClick }) =>
      isClick
          ? theme.color.white
          : theme.color.grayScale[800]};
  }
`;



const StyledTimeButton = styled.button`
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

  &:hover {
    background-color: #56BEA4;
    color: ${({ theme }) => theme.color.white};
  }

`;

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyledPaginationButton = styled.button`
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
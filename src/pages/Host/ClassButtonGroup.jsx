import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getManageAPI,getManageScheduleAPI,getManageAbsentAPI } from "../../api/hostAPI";

const ClassButtonGroup = () => {
  const queryClient = useQueryClient();
  const { classroomId } = useParams();

  const { isLoading, isError, data } = useQuery(
    ["getManage"],
    () => getManageAPI(classroomId),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: () => {
        console.log("error");
      },
    }
  );
  

    return (
      <Layout>
      <TopLeftButtons>
        <button>새빛반</button>
        <button>힘찬반</button>
        <button>창의반</button>
        <button>모든반</button>
      </TopLeftButtons>
      <AttendanceInfo>
        <div>
          오늘의 날짜
        </div>
        <div>
          <div>
            전체 인원수
          </div>
          <div>
            등원 인원수
          </div>
          <div>
            미등원 인원수
          </div>
          <div>
            하원 인원수
          </div>
          <div>
            결석 인원수
          </div>
        </div>
      </AttendanceInfo>
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <ScheduleButton>등원일정</ScheduleButton>
        <ScheduleButton>하원일정</ScheduleButton>
      </div>
      <div style={{ display: 'flex', marginTop: '20px' }}>
        {[...Array(16)].map((_, index) => (
          <TimeButton key={index}>{index + 7}</TimeButton>
        ))}
      </div>
      <SearchBar placeholder="검색" />
      <GridContainer>
        {[...Array(24)].map((_, index) => (
          <GridItem key={index}>
            <img src={`https://i.pravatar.cc/150?img=${index}`} alt="프로필" style={{ borderRadius: '50%' }} />
            <div style={{ marginTop: '10px' }}>
              이름
            </div>
            <div style={{ marginTop: '10px' }}>
              등원 상태
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', width: '100%' }}>
              <div>
                등원시간
              </div>
              <div>
                하원시간
              </div>
            </div>
            <AttendanceButton>등하원 처리</AttendanceButton>
          </GridItem>
        ))}
      </GridContainer>
    </Layout>
    );
  };
  
  export default ClassButtonGroup;

  const TopLeftButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 50px;
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
`;

// 등하원 상태 정보를 담고 있는 컴포넌트
const AttendanceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 50px;
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
`;

// 등하원일정 버튼 컴포넌트
const ScheduleButton = styled.button`
  width: 100px;
  height: 30px;
  background-color: #f1f1f1;
  border-radius: 5px;
  margin-right: 10px;
`;

// 시간별 버튼 컴포넌트
const TimeButton = styled.button`
  width: 50px;
  height: 30px;
  background-color: #f1f1f1;
  border-radius: 5px;
  margin-right: 10px;
`;

// 검색바 컴포넌트
const SearchBar = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 5px;
  margin-top: 20px;
`;

// 프로필과 이름, 등하원 상태 등이 담긴 그리드 컴포넌트
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

// 각각의 아이템을 담고 있는 그리드 아이템 컴포넌트
const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
`;

// 등하원 처리 버튼 컴포넌트
const AttendanceButton = styled.button`
  width: 100%;
  height: 30px;
  background-color: #f1f1f1;
  border-radius: 5px;
  margin-top: 10px;
`;

// 전체 레이아웃 컴포넌트
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
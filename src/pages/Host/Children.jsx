import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { HostAPI } from "../../api/HostAPI";
import Buttons from "../../components/Buttons";
import textVariants from "../../styles/variants/textVariants";

const Children = ({ bindData }) => {
  const queryClient = useQueryClient();
  //useSearchParams 알아보기
  const { scheduleId } = useParams();

  const updateEnterMutation = useMutation(HostAPI.updateEnter, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getManageSchedule"]);
      // queryClient.setQueryData(["getManageSchedule"]);
    },
  });
  const updateExitMutation = useMutation(HostAPI.updateExit, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getManageSchedule"]);
      // queryClient.setQueryData(["getManageSchedule"]);
    },
  });

  const handleScheduleUpdate = (type, childId) => {
    const currentTime = new Date();
    const childData = bindData.find((item) => item.id === childId);

    const updatedChildData = {
      ...childData,
      enterTime: type === "enter" && !childData.enterTime ? currentTime : childData.enterTime,
      exitTime: type === "exit" && !childData.exitTime ? currentTime : childData.exitTime,
    };

    const updatedData = bindData.map((item) => {
      if (item.id === childId) {
        return updatedChildData;
      } else {
        return item;
      }
    });

    queryClient.setQueryData(["getManageSchedule"], updatedData);

    if (type === "enter") {
      updateEnterMutation.mutate(updatedChildData);
    } else if (type === "exit") {
      updateExitMutation.mutate(updatedChildData);
    }
  };



  return (
    <StyledStudentGrid>

      {
        //서버 연결되면  id값 변경 및 데이터 바인딩,옵셔널 체이닝
        Array.isArray(bindData) && bindData?.map((item) => {
          return (
            <StyledStudentCard key={item.id}>
              <StyledProfileRow>
                <StyledStudentProfile imageUrl={item.profileImageUrl} />
                <StyledProfileGroup>
                  <StyledStudentName>{item.name}</StyledStudentName>
                  {
                    scheduleId === "EXIT"
                      ?
                      item.state === "미하원"
                        ? <Buttons.State colorTypes="perple">{item.state}</Buttons.State>
                        : <Buttons.State colorTypes="orange">{item.state}</Buttons.State>
                      :
                      item.state === "미등원"
                        ? <Buttons.State colorTypes="red">{item.state}</Buttons.State>
                        : <Buttons.State colorTypes="blue">{item.state}</Buttons.State>
                  }

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
                scheduleId === "EXIT"
                  ?
                  item.state === "미하원"
                    ? <Buttons.Attendance colorTypes="orange" onClick={() => handleScheduleUpdate("exit", item.id)}>하원처리</Buttons.Attendance>
                    : <Buttons.Attendance outlined onClick={() => handleScheduleUpdate("exit", item.id)}>하원취소</Buttons.Attendance>
                  :
                  item.state === "미등원"
                    ? <Buttons.Attendance colorTypes="blue" onClick={() => handleScheduleUpdate("enter", item.id)}>등원처리</Buttons.Attendance>
                    : <Buttons.Attendance outlined onClick={() => handleScheduleUpdate("enter", item.id)}>등원취소</Buttons.Attendance>
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


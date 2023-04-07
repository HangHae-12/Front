import styled from "styled-components";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { AttendanceAPI } from "../../../api/AttendanceAPI";
import SideBar from "../../../components/SideBar";
import Table from "./Table"

const DayTable = () => {
  const { isLoading, isError, data } = useQuery(["getDayAttendance"], () =>
    AttendanceAPI.getManageSchedule()
  );
  return (
    <StyledContainer>
      <StyledLeftContainer>
        <SideBar />
      </StyledLeftContainer>
      <StyledRightContainer>
        <Table data={data} />
      </StyledRightContainer >
    </StyledContainer >
  );
};

export default DayTable;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledLeftContainer = styled.div`
  width: 200px;
  height: 100vh;
`;

const StyledRightContainer = styled.div`
  flex-grow: 1;
  margin-top: 60px;
  margin-bottom: 94px;
  margin-left: 150px;
  margin-right: 150px;
`;
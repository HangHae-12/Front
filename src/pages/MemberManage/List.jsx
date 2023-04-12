import React, { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { ManageAPI } from "../../api/ManageAPI";
import textVariants from "../../styles/variants/textVariants";
import CustomPagination from "../../components/CustomPagination";
import InviteList from "./InviteList"
import DoneList from "./DoneList";
import InviteMemberButton from "./InviteMemberButton"

const List = () => {

  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { id = "1" } = useParams();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const [searchTimeout, setSearchTimeout] = useState(null);

  //받아온 파람값-> api payload로 
  const [userRole, setUserRole] = useState("PARENT");

  useEffect(() => {
    setUserRole(id === "1" ? "PARENT" : "TEACHER");
  }, [id]);

  const { isLoading, isError, data } = useQuery(
    ["getMemberManage", page, userRole],
    () =>
      ManageAPI.getMemberManage({
        kindergartenId: 1,
        userRole: userRole,
        page: page - 1,
        size: 15,
      })
  );
  // const { isLoading, isError, data } = useQuery(
  //   ["getMemberManage", page, userRole, debouncedSearchText],
  //   () =>
  //     ManageAPI.getMemberManage({
  //       kindergartenId: 1,
  //       userRole: userRole,
  //       page: page - 1,
  //       size: 15,
  //       searchText: debouncedSearchText,
  //     })
  // );

  const handleMemberSearch = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    clearTimeout(searchTimeout);
    setSearchTimeout(setTimeout(() => setDebouncedSearchText(searchText), 500));
  };

  const handlePageChange = (page) => {
    setPage(page);
  };
  const handlePageReset = () => {
    setPage(1);
  };
  useEffect(() => {
    queryClient.invalidateQueries(["getMemberManage", page]);
  }, [debouncedSearchText]);



  const data2 = data?.data;

  // useEffect(() => {
  //   queryClient.invalidateQueries(["getMemberManage", page]);
  // }, [queryClient, page]);
  return (
    <>
      <StyledMemberManageHeader>멤버 관리</StyledMemberManageHeader>
      <InviteMemberButton onPageReset={handlePageReset} />
      <StyledManageContainer>
        <StyledMemberContainer>
          <StyledMemberHeader>
            <StyledTotalLabel>
              총원 <StyledTotalCount>{data2?.memberCount}</StyledTotalCount>명
            </StyledTotalLabel>
            <StyledMemberSearchInputWrapper>
              <StyledMemberSearchInput type="text" onChange={handleMemberSearch} />
            </StyledMemberSearchInputWrapper>
          </StyledMemberHeader>
          <DoneList data={data2} />
          <CustomPagination
            current={page}
            pageSize="15"
            total={data2?.memberCount}
            onChange={handlePageChange}
          />
        </StyledMemberContainer>
        <StyledInviteContainer>
          <StyledInviteHeader>
            <StyledInviteLabel>
              승인 대기 인원
            </StyledInviteLabel>
            <StyledMemberSearchInputWrapper>
              <StyledInviteSearchInput type="text" onChange={handleMemberSearch} />
            </StyledMemberSearchInputWrapper>
          </StyledInviteHeader>
          <InviteList data={data2} page={page} userRole={userRole} />
        </StyledInviteContainer>
      </StyledManageContainer>
    </>
  );
};

export default List;

const StyledManageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;
    @media ${({ theme }) => theme.device.laptop} {
    flex-direction: column;
  }
  
`
const StyledMemberManageHeader = styled.h2`
  ${textVariants.H2_SemiBold}
  margin-bottom: 24px;
`;

const StyledMemberContainer = styled.div`
  /* background-color: ${({ theme }) => theme.color.green_darker}; */
  background-color:#EDF5EECC;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 20px 40px;
  width: 60%;
  margin-right: 10px;

  @media ${({ theme }) => theme.device.desktop} {
    width: 70%;
    height: 688px;
    /* margin-bottom: 199px; */
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 100%;
    margin-bottom: 20px;
  }
`;


const StyledInviteContainer = styled.div`

  background-color:${({ theme }) => theme.color.grayScale[50]};
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 40px;
  width: 40%;
  
  @media ${({ theme }) => theme.device.desktop} {
    width: 30%;
    height: 688px;
    
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 100%;
  }
  
`;
const StyledMemberHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;


const StyledTotalLabel = styled.div`
  ${textVariants.H3_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[400]};
`;

const StyledTotalCount = styled.span`
  ${textVariants.H3_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[600]};
`;

const StyledMemberSearchInputWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  
`;

const StyledMemberSearchInput = styled.input`
  padding-left: 30px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 4px;
`;

const StyledInviteHeader = styled.div`
  ${textVariants.Body1_Bold}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
  width: 100%;

  @media ${({ theme }) => theme.device.desktop} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StyledInviteLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${textVariants.Body1_Bold}
  color: ${({ theme }) => theme.color.grayScale[400]};
`;

const StyledInviteSearchInput = styled.input`
  padding-left: 30px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 4px;
  width: 100%;

  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;








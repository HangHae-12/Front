import React, { useEffect, useState } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ManageAPI } from "../../api/ManageAPI";
import textVariants from "../../styles/variants/textVariants";
import CustomPagination from "../../components/CustomPagination";
import { AiOutlineSearch } from "react-icons/ai"
import Button from "../../components/Button";
const List = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [userRole, setUserRole] = useState("PARENT");

  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const [searchTimeout, setSearchTimeout] = useState(null);

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

  useEffect(() => {
    queryClient.invalidateQueries(["getMemberManage", page]);
  }, [debouncedSearchText]);



  const data2 = data?.data;

  // useEffect(() => {
  //   queryClient.invalidateQueries(["getMemberManage", page]);
  // }, [queryClient, page]);

  const [selectedButton, setSelectedButton] = useState("학부모");

  const handleButtonClick = async (selected, id) => {
    setSelectedButton(selected);
    setPage(1);
    navigate(`/memberManage/${id}`);
    setUserRole(selected === "학부모" ? "PARENT" : "TEACHER");
    queryClient.invalidateQueries(["getMemberManage", page]);
  };

  const approveMutation = useMutation((id) => ManageAPI.updateApprove(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getMemberManage", page]);
    },
  });

  const rejectMutation = useMutation((id) => ManageAPI.updateReject(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getMemberManage", page]);
    },
  });

  const handleApprove = (id) => {
    approveMutation.mutate(id);
  };

  const handleReject = (id) => {
    rejectMutation.mutate(id);
  };




  return (
    <>
      <StyledMemberManageHeader>멤버 관리</StyledMemberManageHeader>
      <StyledButtonWrapper>
        <Button.ClassButton
          selected={"학부모"}
          selectedButton={selectedButton}
          onClick={() => handleButtonClick("학부모", 1)}
        />
        <Button.ClassButton
          selected={"선생님"}
          selectedButton={selectedButton}
          onClick={() => handleButtonClick("선생님", 2)}
        />

      </StyledButtonWrapper>
      <StyledManageContainer>
        <StyledMemberContainer>
          <StyledMemberHeader>
            <StyledTotalLabel>
              총원 <StyledTotalCount>{data2?.memberCount}</StyledTotalCount>명
            </StyledTotalLabel>
            <StyledMemberSearchInputWrapper>
              <StyledMemberSearchInput type="text" onChange={handleMemberSearch} />
              {/* <StyledSearchIcon>
                <AiOutlineSearch />
              </StyledSearchIcon> */}
            </StyledMemberSearchInputWrapper>
          </StyledMemberHeader>
          <StyledMemberGrid>
            {data2?.memberList.map((child) => {
              return (
                <StyledMemberCard key={child.id}>
                  <StyledMemberProfile src={child.profileImageUrl} />
                  <StyledMemberProfileName>
                    {child.name}
                  </StyledMemberProfileName>
                </StyledMemberCard>
              );
            })}
          </StyledMemberGrid>
          <></>
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
              {/* <StyledSearchIcon>
                <AiOutlineSearch />
              </StyledSearchIcon> */}
            </StyledMemberSearchInputWrapper>
          </StyledInviteHeader>
          <StyledInviteList>
            {data2?.earlyMemberList?.map((member) => {
              return (
                <StyledInviteRow key={member.id}>
                  <StyledInviteProfileWrapper>
                    <StyledInviteProfile src={member.profileImageUrl} />
                    <StyledInviteProfileName>
                      {member.name}
                    </StyledInviteProfileName>
                  </StyledInviteProfileWrapper>
                  <StyledInviteButtonWrapper>
                    <StyledApproveButton onClick={() => handleApprove(member.id)}>승인</StyledApproveButton>
                    <StyledRejectButton onClick={() => handleReject(member.id)}>거절</StyledRejectButton>
                  </StyledInviteButtonWrapper>
                </StyledInviteRow>
              );
            })}
          </StyledInviteList>
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

const StyledButtonWrapper = styled.div`
  padding-bottom: 24px;
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

const StyledMemberGrid = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto; 
  grid-gap: 6px;

  @media ${({ theme }) => theme.device.desktop} {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto; 
    grid-gap: 12px;
  }
  @media ${({ theme }) => theme.device.laptop} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(2, 1fr); 
    grid-template-rows: repeat(8, auto);
  }
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


// const StyledSearchIcon = styled.div`
//   position: absolute;
//   right: 48px;
// `;


const StyledMemberCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 8px;
  gap: 12px;
  width: 110px;
  height: 100px;

  @media ${({ theme }) => theme.device.desktop} {
    width: 180px;
    height: 160px;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 140px;
    height: 130px;
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 80px;
    height: 90px;
  }
`;


const StyledMemberProfile = styled.img`
  border-radius: 70%;
  width: 50px;
  height: 50px;

  @media ${({ theme }) => theme.device.desktop} {
    width: 80px;
    height: 80px;
  }

  @media ${({ theme }) => theme.device.laptop} {
    width: 70px;
    height: 70px;
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 30px;
    height: 30px;
  }
`;

const StyledMemberProfileName = styled.div`
${textVariants.Body1_SemiBold}
  display: flex;
  justify-content: center;
  align-items: center;
  color:${({ theme }) => theme.color.grayScale[600]};

`

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

const StyledInviteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 360px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.grayScale[200]};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.color.grayScale[50]};
  }
  @media ${({ theme }) => theme.device.desktop} {
    max-height: 570px;
  }
`;

const StyledInviteRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 4px;
`;

const StyledInviteProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap:8px;
`;

const StyledInviteProfile = styled.img`
  border-radius: 70%;
  width: 40px;
  height: 40px;

  @media ${({ theme }) => theme.device.desktop} {
    width: 40px;
    height: 40px;
  }

  @media ${({ theme }) => theme.device.laptop} {
    width: 70px;
    height: 70px;
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 30px;
    height: 30px;
  }
`;
const StyledInviteProfileName = styled.div`
${textVariants.Body2_SemiBold}
  display: flex;
  justify-content: center;
  align-items: center;
  color:${({ theme }) => theme.color.grayScale[600]};

`
const StyledInviteButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap:8px;
`;

const StyledApproveButton = styled.button`
${textVariants.Body2_SemiBold}
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.grayScale[400]};
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  :hover{
    background-color: ${({ theme }) => theme.color.blue_lighter};
    color: ${({ theme }) => theme.color.blue};
  }
`;

const StyledRejectButton = styled.button`
${textVariants.Body2_SemiBold}
    background-color: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.grayScale[400]};
    border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;

  :hover{
    background-color: ${({ theme }) => theme.color.red_lighter};
    color: ${({ theme }) => theme.color.red};
  }
`;










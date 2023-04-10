import React, { useEffect, useState } from "react";
import styled from "styled-components";
import textVariants from "../../styles/variants/textVariants";
import CustomPagination from "../../components/CustomPagination";
import { AiOutlineSearch } from "react-icons/ai"
const List = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const handleMemberSearch = () => {

  };
  const childrenData = [
    { name: "백주원", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "홍주원", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "우주원", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "이주원", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김주원", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },

  ];

  return (
    <>
      <StyledAttendanceHeader>멤버 관리</StyledAttendanceHeader>
      <StyledManageContainer>

        <StyledMemberContainer>
          <StyledMemberHeader>
            <StyledTotalLabel>
              총원 <StyledTotalCount>10</StyledTotalCount>명
            </StyledTotalLabel>
            <StyledMemberSearchInputWrapper>
              <StyledMemberSearchInput type="text" onChange={handleMemberSearch} />
              <StyledSearchIcon>
                <AiOutlineSearch />
              </StyledSearchIcon>
            </StyledMemberSearchInputWrapper>
          </StyledMemberHeader>
          <StyledMemberGrid>
            {childrenData.map((child) => {
              return (
                <StyledMemberCard>
                  <StyledMemberProfile src={child.image} />
                  {child.name}
                </StyledMemberCard>
              );
            })}
          </StyledMemberGrid>
          <CustomPagination
            current={currentPage}
            pageSize="14"
            total="10"
            onChange={(page) => setCurrentPage(page)}
          />

        </StyledMemberContainer>
        <StyledInviteContainer>

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
  @media ${({ theme }) => theme.device.laptop} {
    flex-direction: column;
  }
  
`

const StyledAttendanceHeader = styled.h2`
  ${textVariants.H2_Bold}
  margin-bottom: 20px;
`;

const StyledMemberContainer = styled.div`
  /* background-color: ${({ theme }) => theme.color.green_darker}; */
  background-color:#EDF5EECC;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 20px 40px;
  width: 70%;
  margin-right: 10px;

  @media ${({ theme }) => theme.device.laptop} {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;


const StyledInviteContainer = styled.div`

  background-color:${({ theme }) => theme.color.grayScale[50]};
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  padding: 40px;
  width: 30%;

  @media ${({ theme }) => theme.device.laptop} {
    width: 100%;
  }
  
`;


const StyledMemberHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
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

const StyledSearchIcon = styled.div`
  position: absolute;
  right: 8px;
`;


const StyledMemberCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 8px;
  gap: 12px;
  width: 120px;
  height: 110px;

  @media ${({ theme }) => theme.device.desktop} {
    width: 180px;
    height: 160px;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 120px;
    height: 110px;
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
    width: 40px;
    height: 40px;
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 30px;
    height: 30px;
  }
`;





import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import textVariants from "../../styles/variants/textVariants";
import CustomPagination from "../../components/CustomPagination";
import { AiOutlineSearch } from "react-icons/ai"
import Button from "../../components/Button";
const List = () => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState("학부모");

  const handleButtonClick = async (selected, id) => {
    setSelectedButton(selected);
    navigate(`/memberManage/${id}`);
  };

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
    { name: "김주원", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },

  ];

  const approvalData = [
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
    { name: "김효리", image: "https://hanghaefinals3.s3.ap-northeast-2.amazonaws.com/profile-image/default_profile_image.jpeg" },
  ];

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
              총원 <StyledTotalCount>10</StyledTotalCount>명
            </StyledTotalLabel>
            <StyledMemberSearchInputWrapper>
              <StyledMemberSearchInput type="text" onChange={handleMemberSearch} />
              {/* <StyledSearchIcon>
                <AiOutlineSearch />
              </StyledSearchIcon> */}
            </StyledMemberSearchInputWrapper>
          </StyledMemberHeader>
          <StyledMemberGrid>
            {childrenData.map((child) => {
              return (
                <StyledMemberCard>
                  <StyledMemberProfile src={child.image} />
                  <StyledMemberProfileName>
                    {child.name}
                  </StyledMemberProfileName>
                </StyledMemberCard>
              );
            })}
          </StyledMemberGrid>
          <></>
          <CustomPagination
            current={currentPage}
            pageSize="14"
            total="10"
            onChange={(page) => setCurrentPage(page)}
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
            {approvalData.map((member) => {
              return (
                <StyledInviteRow>
                  <StyledInviteProfileWrapper>
                    <StyledInviteProfile src={member.image} />
                    <StyledInviteProfileName>
                      {member.name}
                    </StyledInviteProfileName>
                  </StyledInviteProfileWrapper>
                  <StyledInviteButtonWrapper>
                    <StyledApproveButton>승인</StyledApproveButton>
                    <StyledCancelButton>거절</StyledCancelButton>
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
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
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
  border-radius: 8px;
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
  background-color: ${({ theme }) => theme.color.blue_lighter};
  color: ${({ theme }) => theme.color.blue};
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
`;

const StyledCancelButton = styled.button`
${textVariants.Body2_SemiBold}
  background-color: ${({ theme }) => theme.color.red_lighter};
  color: ${({ theme }) => theme.color.red};
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
`;










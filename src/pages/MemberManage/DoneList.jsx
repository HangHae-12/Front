import React from "react";
import styled from "styled-components";
import textVariants from "../../styles/variants/textVariants";

const DoneList = ({ data }) => {

    return (
        <StyledMemberGrid>
            {data?.memberList.map((child) => {
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
    );
};

export default DoneList;

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
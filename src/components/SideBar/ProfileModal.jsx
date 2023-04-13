import React from "react";
import styled from "styled-components";
import textVariants from "../../styles/variants/textVariants";
import { useRecoilValue } from "recoil";
import { userProfileAtom } from "../../atom/sideBarAtom";

const ProfileModal = () => {
  const userProfile = useRecoilValue(userProfileAtom);
  return (
    <StyledModalWrapper>
      {userProfile.role === "TEACHER" ? (
        <StyledComment>
          <StyledQuestionFont>한마디 </StyledQuestionFont>
          <StyledQuestionFontInput>
            {userProfile.resolution}
          </StyledQuestionFontInput>
        </StyledComment>
      ) : null}
      <StyledChildrenProfileWrapper>
        <StyledLeftWrapper>
          <StyledProfileImage src={userProfile.profileImageUrl} />
        </StyledLeftWrapper>
        <StyledRightWrapper>
          <StyledInputWrapper>
            <StyledQuestionFont>이름 </StyledQuestionFont>
            <StyledAnswerFont>
              {userProfile.name}
            </StyledAnswerFont>
          </StyledInputWrapper>
          <StyledInputWrapper>
            <StyledQuestionFont>생년월일 </StyledQuestionFont>
            <StyledAnswerFont>{userProfile.birthday}</StyledAnswerFont>
          </StyledInputWrapper>
          <StyledInputWrapper>
            <StyledQuestionFont>메일 </StyledQuestionFont>
            <StyledAnswerFont>{userProfile.email}</StyledAnswerFont>
          </StyledInputWrapper>
          <StyledInputWrapper>
            <StyledQuestionFont>연락처 </StyledQuestionFont>
            <StyledAnswerFont>{userProfile.phoneNumber}</StyledAnswerFont>
          </StyledInputWrapper>
        </StyledRightWrapper>
      </StyledChildrenProfileWrapper>
    </StyledModalWrapper>
  );
};

export default ProfileModal;

const StyledModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledChildrenProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 24px;
`;

const StyledLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left:70px;
  margin-right:50px;
`;

const StyledProfileImage = styled.img`
  width: ${({ width }) => width || "120px"};
  height: ${({ height }) => height || "120px"};
  border-radius: 50%;
  margin-top: 30px;
`;

const StyledRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 70px;
  height: 100%;
`;


const StyledAnswerFont = styled.div`
  ${textVariants.Body1_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  background-color: ${({ theme }) => theme.color.grayScale[50]};
  padding: 4px 8px;
  margin-left: ${({ marginLeft }) => marginLeft};
`;
const StyledQuestionFont = styled.div`
  ${textVariants.Body3_SemiBold}
  display: flex;
  align-items:ceter;
  justify-content:center;
  color: ${({ theme }) => theme.color.grayScale[500]};


`;
const StyledQuestionFontInput = styled.div`
  ${textVariants.Body3_SemiBold}
  display: flex;
  color: ${({ theme }) => theme.color.grayScale[500]};
  background-color: ${({ theme }) => theme.color.grayScale[50]};
  margin-left: 30px;
  width: 417px;
  height: 26px;

`;

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  justify-content: space-between;
`;


const StyledComment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

import React from "react";
import styled from "styled-components";
import textVariants from "../styles/variants/textVariants";
import { useRecoilValue } from "recoil";
import { useProfileAtom } from "../atom/sideBarAtom";

const UserProfileModal = () => {
  const userProfile = useRecoilValue(useProfileAtom);
  return (
    <StyledModalWrapper>
      {userProfile.role === "TEACHER" ? (
        <StyledComment marginTop="10px">
          <StyledQuestionFont>한마디 </StyledQuestionFont>
          <StyledQuestionFont marginLeft="30px">
            {userProfile.resolution}
          </StyledQuestionFont>
        </StyledComment>
      ) : null}
      <StyledChildrenProfileWrapper>
        <StyledLeftWrapper>
          <StyledProfileImage src={userProfile.profileImageUrl} />
        </StyledLeftWrapper>
        <StyledRightWrapper>
          <StyledInputWrapper marginTop="30px" marginLeft="40px">
            <StyledQuestionFont>이름 </StyledQuestionFont>
            <StyledAnswerFont marginLeft="250px">
              {userProfile.name}
            </StyledAnswerFont>
          </StyledInputWrapper>
          <StyledInputWrapper marginLeft="40px">
            <StyledQuestionFont>생년월일 </StyledQuestionFont>
            <StyledAnswerFont>{userProfile.birthday}</StyledAnswerFont>
          </StyledInputWrapper>
          <StyledInputWrapper marginLeft="40px">
            <StyledQuestionFont>메일 </StyledQuestionFont>
            <StyledAnswerFont>{userProfile.email}</StyledAnswerFont>
          </StyledInputWrapper>
          <StyledInputWrapper marginLeft="40px">
            <StyledQuestionFont>연락처 </StyledQuestionFont>
            <StyledAnswerFont>{userProfile.phoneNumber}</StyledAnswerFont>
          </StyledInputWrapper>
        </StyledRightWrapper>
      </StyledChildrenProfileWrapper>
    </StyledModalWrapper>
  );
};

export default UserProfileModal;

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
`;

const StyledProfileImage = styled.img`
  width: ${({ width }) => width || "120px"};
  height: ${({ height }) => height || "120px"};
  border-radius: 70%;
  margin-top: 30px;
`;

const StyledRightWrapper = styled.div`
  margin-left: 20px;
`;

const StyledAnswerFont = styled.div`
  ${textVariants.Body1_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-left: ${({ marginLeft }) => marginLeft};
`;

const StyledQuestionFont = styled.div`
  ${textVariants.Body3_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-left: ${({ marginLeft }) => marginLeft};
`;

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ marginTop }) => marginTop || "30px"};
  justify-content: space-between;
  margin-left: ${({ marginLeft }) => marginLeft};
`;

const StyledComment = styled.div`
  display: flex;
  margin-top: ${({ marginTop }) => marginTop || "30px"};
  margin-right: 270px;
`;

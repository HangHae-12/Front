import React from "react";
import styled from "styled-components";
import textVariants from "../../styles/variants/textVariants";

const ClassModal = () => {
  return (
    <StyledModalWrapper>
      <StyledChildrenProfileWrapper>
        <StyledLeftWrapper>
          <StyledProfileHeaderFont>원생 프로필</StyledProfileHeaderFont>
          <StyledProfileImage
            src={
              "https://outlooksformen.com/sites/default/files/2020-09/testiminials-img-01.png"
            }
          />
          <StyledProfileButton>이미지 변경</StyledProfileButton>
        </StyledLeftWrapper>
        <StyledRightWrapper>
          <StyledInputWrapper>
            <StyledQuestionFont>이름 </StyledQuestionFont>
            <StyledAnswerFont marginLeft="300px">정길숙</StyledAnswerFont>
          </StyledInputWrapper>
          <StyledInputWrapper>
            <StyledQuestionFont>성별 </StyledQuestionFont>
            <StyledAnswerFont marginLeft="310px">남자</StyledAnswerFont>
          </StyledInputWrapper>
          <StyledInputWrapper>
            <StyledQuestionFont>생년월일 </StyledQuestionFont>
            <StyledAnswerFont marginLeft="250px">2015.12.07</StyledAnswerFont>
          </StyledInputWrapper>
          <StyledInputWrapper>
            <StyledQuestionFont>등원시간 </StyledQuestionFont>
            <StyledTime marginLeft="50px" marginRight="40px">
              09시~10시
            </StyledTime>
            <StyledQuestionFont>하원시간 </StyledQuestionFont>
            <StyledTime marginLeft="50px">09시~10시</StyledTime>
          </StyledInputWrapper>
        </StyledRightWrapper>
      </StyledChildrenProfileWrapper>
      <StyledNote>특이사항</StyledNote>
      <StyledInputBox />
      <StyledParentProfileWrapper>
        <Sttest>
          <StyledLeftWrapper>
            <StyledProfileHeaderFont>학부모 프로필</StyledProfileHeaderFont>
            <StyledProfileImage
              src={
                "https://outlooksformen.com/sites/default/files/2020-09/testiminials-img-01.png"
              }
            />
          </StyledLeftWrapper>
          <StyledRightWrapper>
          <StyledInputWrapper>
            <StyledQuestionFont>이름 </StyledQuestionFont>
            <StyledAnswerFont marginLeft="300px">정길숙</StyledAnswerFont>
          </StyledInputWrapper>
          </StyledRightWrapper>
        </Sttest>
      </StyledParentProfileWrapper>
    </StyledModalWrapper>
  );
};

export default ClassModal;

const StyledModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledChildrenProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px;
  gap: 24px;
`;

const StyledProfileHeaderFont = styled.div`
  color: ${({ theme }) => theme.color.grayScale[700]};
  ${textVariants.Body1_SemiBold}
`;
const StyledProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 70%;
  margin-top: 20px;
`;

const StyledQuestionFont = styled.div`
  ${textVariants.Body3_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-left: ${({ marginLeft }) => marginLeft};
`;

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

const StyledLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledRightWrapper = styled.div`
  margin-left: 40px;
  margin-top: 20px;
`;

const StyledAnswerFont = styled.div`
  ${textVariants.Body1_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-left: ${({ marginLeft }) => marginLeft};
`;

const StyledProfileButton = styled.button`
  ${textVariants.Body3_SemiBold}
  border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  background: ${({ theme }) => theme.color.white};
  border-radius: 2px;
  padding: 4px;
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-top: 10px;
`;

const StyledTime = styled.div`
  ${textVariants.Body2_Bold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
`;

const StyledNote = styled.div`
  ${textVariants.Body3_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-left: 30px;
`;

const StyledInputBox = styled.input`
  width: 560px;
  height: 115px;
  border: 0;
  border-radius: 4px;
  outline: none;
  background-color: ${({ theme }) => theme.color.grayScale[50]};
  margin-top: 10px;
  margin-left: 25px;
`;

const StyledParentProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;
  gap: 12px;
  margin-top: 20px;
`;

const Sttest = styled.div`
  width: 560px;
  border: none;
  border-top: 2px solid ${({ theme }) => theme.color.grayScale[200]};
  padding: 25px;
`;

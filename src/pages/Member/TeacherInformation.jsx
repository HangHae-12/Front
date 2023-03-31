import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { MemberAPI } from "../../api/MemberAPI";
import { useQuery } from "@tanstack/react-query";
import textVariants from "../../styles/variants/textVariants";

const TeacherInformation = () => {
  const { id } = useParams();
  const { data } = useQuery(
    ["ClassesPage"],
    () => MemberAPI.getClassesPage(id),
    {
      onSuccess: (data) => {
        console.log(data.data);
      },
      onError: () => {
        console.log("error");
      },
    }
  );

  return (
    <>
      <StyledInfomation>
        <StyledContentWrapper>
          <StyledLeftWrapper>
            <StyledQuestionFont>담임선생님</StyledQuestionFont>
            {/* <StyledTeacherImage src={data?.data?.data?.teacher?.imageUrl} /> */}
            <StyledTeacherImage
              src={
                "https://outlooksformen.com/sites/default/files/2020-09/testiminials-img-01.png"
              }
            />
          </StyledLeftWrapper>
          <StyledMiddleWrapper>
            <StyledInputWrapper>
              <StyledQuestionFont>한마디 </StyledQuestionFont>
              <StyledQuestionFont marginLeft="30px">
                {/* {data?.data?.data?.teacher?.resolution} */}
                글로벌 인재로 만들겠습니다.
              </StyledQuestionFont>
            </StyledInputWrapper>
            <StyledInputWrapper>
              <StyledQuestionFont>이름</StyledQuestionFont>
              <StyledAnswerFont marginLeft="190px">
                {/* {data?.data?.data?.teacher?.name} */}
                정길숙
              </StyledAnswerFont>
              <StyledQuestionFont marginLeft="90px">연락처</StyledQuestionFont>
              <StyledAnswerFont marginLeft="110px">
                {/* {data?.data?.data?.teacher?.phoneNumber} */}
                010-0000-0000
              </StyledAnswerFont>
            </StyledInputWrapper>
            <StyledInputWrapper>
              <StyledQuestionFont>생년월일</StyledQuestionFont>
              {/* <StyledSpan>{data?.data?.data?.teacher?.birth}</StyledSpan> */}
              <StyledAnswerFont marginLeft="135px">1995.12.07</StyledAnswerFont>
              <StyledQuestionFont marginLeft="87px">메일</StyledQuestionFont>
              <StyledAnswerFont marginLeft="80px">
                {/* {data?.data?.data?.teacher?.email} */}
                sssssssss@gmail.com
              </StyledAnswerFont>
            </StyledInputWrapper>
          </StyledMiddleWrapper>
        </StyledContentWrapper>
      </StyledInfomation>
    </>
  );
};

export default TeacherInformation;

const StyledInfomation = styled.div`
  background: ${({ theme }) => theme.color.white};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  box-sizing: border-box;
  width: 1428px;
  height: 216px;
  margin-top: 10px;

  @media (max-width: 1800px) {
    width: 1080px;
  }
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px;
  gap: 26px;
`;

const StyledMiddleWrapper = styled.div`
  margin-left: 40px;
`;

const StyledInputWrapper = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  margin-top: 30px;
`;

const StyledLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 40px;
  margin-top: 10px;
`;

const StyledQuestionFont = styled.div`
  ${textVariants.Body3_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[400]};
  margin-left: ${({ marginLeft }) => marginLeft};
`;
const StyledTeacherImageWrapper = styled.div`
  position: relative;
  top: -60%;
  width: 0px;
  height: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTeacherImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 70%;
`;

const StyledAnswerFont = styled.div`
  ${textVariants.Body1_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[400]};
  margin-left: ${({ marginLeft }) => marginLeft};
`;

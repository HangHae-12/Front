import React,{ useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { MemberAPI } from "../../api/MemberAPI";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
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

  const setTeacherMutation = useMutation(MemberAPI.setClassesTeacher, {
    onSuccess: () => {
      queryClient.invalidateQueries("ClassesPage");
    },
  });

  const handleSave = async (id) => {
    const formData = new FormData();
    formData.append("imageUrl", image);
    formData.append("name", information.name);
    formData.append("gender", information.gender);
    formData.append("birth", information.birth);
    formData.append("phoneNumber", information.phoneNumber);
    formData.append("email", information.email);
    formData.append("resolution", information.resolution);
    
    const payload = {
      id: id,
      formData: formData,
    };
    setTeacherMutation.mutate(payload);
    setEditMode(false);
    console.log(formData);
    for (const keyValue of formData) console.log(keyValue);
  };

  const saveImgFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    setImage(file);
  };

  const handleTest = (e) => {
    e.preventDefault();
    setInformation.name(e.target.value);
    console.log(setInformation.name);
  };

  return (
    <>
      <StyledInfomation>
        <StyledContentWrapper>
          <StyledLeftWrapper>
            <StyledQuestionFont>담임선생님</StyledQuestionFont>
            <StyledTeacherImage src={data?.data?.data?.teacher?.imageUrl} />
            <StyledSpan marginLeft="0px">
              {data?.data?.data?.teacher?.name}
            </StyledSpan>
          </StyledLeftWrapper>
          <StyledBox>
            <StyledInputWrapper>
              <StyledQuestionFont>한마디 </StyledQuestionFont>
              <StyledSpan marginLeft="0px">
                {data?.data?.data?.teacher?.resolution}
              </StyledSpan>
            </StyledInputWrapper>
            <br />
            <StyledInputWrapper>
              <StyledQuestionFont>
                성별
                <StyledSpan marginLeft="150px">
                  {data?.data?.data?.teacher?.gender}
                </StyledSpan>
              </StyledQuestionFont>
              <StyledQuestionFont>
                <StyledForm marginLeft="60px">
                  연락처
                  <StyledSpan>
                    {data?.data?.data?.teacher?.phoneNumber}
                  </StyledSpan>
                </StyledForm>
              </StyledQuestionFont>
            </StyledInputWrapper>
            <StyledInputWrapper>
              <StyledQuestionFont>
                생년월일
                <StyledSpan>{data?.data?.data?.teacher?.birth}</StyledSpan>
              </StyledQuestionFont>
              <StyledQuestionFont>
                <StyledForm marginLeft="100px">
                  메일
                  <StyledSpan marginLeft="25px">
                    {data?.data?.data?.teacher?.email}
                  </StyledSpan>
                </StyledForm>
              </StyledQuestionFont>
            </StyledInputWrapper>
          </StyledBox>
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
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 20px 80px 40px;
  gap: 26px;
`;

const StyledSpan = styled.span`
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : "60px")};
  margin-top: 10px;
`;

const StyledBox = styled.div`
  margin-left: 40px;
  margin-top: 50px;
`;

const StyledForm = styled.span`
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : "20px")};
`;

const StyledInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 40px;
`;

const StyledQuestionFont = styled.div`
  ${textVariants.Body3_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[400]};
`;
const StFont = styled.div`
`;
const StTeacherImage = styled.div`
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

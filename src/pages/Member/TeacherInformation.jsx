import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";
import { useParams } from "react-router-dom";
import { MemberAPI } from "../../api/MemberAPI";
import { useQuery } from "@tanstack/react-query";
import { BsFillGearFill } from "react-icons/bs";
import textVariants from "../../styles/variants/textVariants";

const TeacherInformation = (data) => {
  const { id } = useParams();
  const { openModal } = useModal();
  const [render, setRender] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);
  const [searchParent, setSearchParent] = useState("");



  // const { data } = useQuery(
  //   ["ClassesPage"],
  //   () => MemberAPI.getClassesPage(id),
  //   {
  //     onSuccess: (data) => {
  //       console.log(data.data);
  //     },
  //     onError: () => {
  //       console.log("error");
  //     },
  //   }
  // );

  // useEffect(() => {
  //   if (!render) {
  //     openModal();
  //   } else {
  //     setRender(false);
  //   }
  // }, []);

  const modalOption = {
    padding: "20px",
    width: "660px",
    height: "532px",
  };

  const setTeacherAppoint  = () => {
    const modalData = {
      title: <StyledModalHeader>담임선생님 지정</StyledModalHeader>,
      contents: 
      <StyledParentProfileWrapper>
      <StyledParentBox flexDirection="column" padding="0px">
        <StyledProfileHeaderFont marginTop="20px">
          학부모 등록
        </StyledProfileHeaderFont>
        <StyledInputWrapper marginTop="20px">
          {selectedParent ? (
            <>
              <StyledCheckInformationBox marginLeft="12px">
                <StyledProfileImage
                  width="40px"
                  height="40px"
                  marginTop="0px"
                  src={selectedParent.imgSrc}
                />
                <StyledParentName>{selectedParent.name}</StyledParentName>
                <StyledParentPhone>{selectedParent.phone}</StyledParentPhone>
              </StyledCheckInformationBox>
            </>
          ) : (
            <StyledParentAddBox>학부모를 선택 해주세요</StyledParentAddBox>
          )}
          <StyledSearchInput
            type="text"
            // onChange={handleSearch}
            value={searchParent}
          />
        </StyledInputWrapper>
        <StyledChoiceparentWrapper>
          <StyledParentInformationBox>
            <CheckBox
              type="checkbox"
              checked={isChecked}
              // onChange={handleCheckBoxChange}
            />
            <StyledProfileImage
              width="40px"
              height="40px"
              marginTop="0px"
              src={
                "https://outlooksformen.com/sites/default/files/2020-09/testiminials-img-01.png"
              }
            />
            <StyledParentName>준수형</StyledParentName>
            <StyledParentPhone>010-8888-8888</StyledParentPhone>
          </StyledParentInformationBox>
        </StyledChoiceparentWrapper>
      </StyledParentBox>
    </StyledParentProfileWrapper>,
      footer: (
        <StyledModalButton
          onClick={() => {
            // handleTeacherSubmit(id);
          }}
        >
          저장하기
        </StyledModalButton>
      ),
      callback: () => alert("modal"),
    };
    openModal(modalData);
  };

  return (
    <>
      <StyledInfomation>
        <StyledContentWrapper>
          <StyledLeftWrapper>
            <StyledInputWrapper marginTop="0px">
              <StyledQuestionFont marginLeft="5px">담임선생님</StyledQuestionFont>
              <StyledGearButton marginLeft="5px" onClick={setTeacherAppoint}/>
            </StyledInputWrapper>
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
      {/* <Modal modalOption={modalOption} /> */}
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
  align-items: center;
  margin-top: ${({ marginTop }) => marginTop || "30px"};
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

const StyledModalHeader = styled.div`
  ${textVariants.Body1_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const StyledGearButton = styled(BsFillGearFill)`
  width: 12px;
  height: 12px;
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-left: ${({ marginLeft }) => marginLeft};
`;

const StyledModalButton = styled.button`
  padding: 5px 8px;
  gap: 10px;
  border-radius: 4px;
  background: ${({ theme }) => theme.color.grayScale[50]};
  border: 1px solid ${({ theme }) => theme.color.grayScale[300]}; ;
`;

const StyledParentProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;
  gap: 12px;
  margin-top: 20px;
`;

const StyledParentBox = styled.div`
  width: 560px;
  border: none;
  padding: ${({ padding }) => padding || "25px"};
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  align-items: flex-start;
`;

const StyledProfileHeaderFont = styled.div`
  color: ${({ theme }) => theme.color.grayScale[700]};
  ${textVariants.Body1_SemiBold}
  margin-top: ${({ marginTop }) => marginTop};
`;

const StyledCheckInformationBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  width: 260px;
  height: 56px;
  background: rgba(237, 245, 238, 0.8);
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 4px;
  margin-left: ${({ marginLeft }) => marginLeft};
`;

const CheckBox = styled.input`
  border-radius: 70%;
  width: 12px;
  height: 12px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  appearance: none;
  cursor: pointer;
  &:checked {
    background: ${({ theme }) => theme.color.primary};
  }
`;

const StyledParentName = styled.div`
  ${textVariants.Body3_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[600]};
  margin-left: 5px;
`;

const StyledParentPhone = styled.div`
  ${textVariants.Caption_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-left: 62px;
`;

const StyledSearchInput = styled.input`
  padding: 3px 12px;
  gap: 10px;
  width: 200px;
  height: 32px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  border-radius: 4px;
  margin-left: 83px;
  margin-top: 20px;
`;

const StyledProfileImage = styled.img`
  width: ${({ width }) => width || "120px"};
  height: ${({ height }) => height || "120px"};
  border-radius: 70%;
  margin-top: ${({ marginTop }) => marginTop || "20px"};
`;

const StyledParentAddBox = styled.div`
  ${textVariants.Body3_SemiBold}
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 72px;
  width: 260px;
  height: 56px;
  background: ${({ theme }) => theme.color.grayScale[100]};
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 4px;
  color: ${({ theme }) => theme.color.grayScale[400]};
  margin-left: 12px;
`;

const StyledChoiceparentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 18px 12px;
  gap: 9px;
  width: 570px;
  height: 160px;
  overflow-y: auto;
  background: ${({ theme }) => theme.color.grayScale[50]};
  border-radius: 8px;
  margin-top: 8px;
`;

const StyledParentInformationBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  width: 260px;
  height: 56px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  border-radius: 4px;
  margin-left: ${({ marginLeft }) => marginLeft};
`;
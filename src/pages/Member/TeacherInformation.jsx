import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";
import { useParams } from "react-router-dom";
import { MemberAPI } from "../../api/MemberAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BsFillGearFill } from "react-icons/bs";
import textVariants from "../../styles/variants/textVariants";
import { useRecoilValue } from "recoil";
import { userProfileAtom } from "../../atom/sideBarAtom";

const TeacherInformation = ({ data }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { openModal, closeModal } = useModal();
  const [render, setRender] = useState(true);
  const [checkedTeachers, setCheckedTeachers] = useState({});
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchTeacher, setSearchTeacher] = useState("");
  const userRole = useRecoilValue(userProfileAtom);

  const { data: TeacherData } = useQuery(
    ["TeacherInformation"],
    () => MemberAPI.getTeacherInformation(),
    {
      onError: () => {
        console.log("error");
      },
    }
  );

  const setTeacherMutation = useMutation(MemberAPI.setTeacher, {
    onSuccess: () => {
      queryClient.invalidateQueries("TeacherInformation");
    },
  });

  useEffect(() => {
    if (!render) {
      setTeacherAppoint();
    } else {
      setRender(false);
    }
  }, [selectedTeacher]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTeacher(e.target.value);
    queryClient.invalidateQueries(["TeacherInformation", searchTeacher]);
  };

  const handleCheckBoxChange = (e, item) => {
    setCheckedTeachers({
      ...checkedTeachers,
      [item.id]: e.target.checked,
    });
    if (e.target.checked) {
      setSelectedTeacher({
        id: item.id,
        name: item.name,
        phone: item.phoneNumber,
        imgSrc: item.profileImageUrl,
      });
    } else {
      setSelectedTeacher(null);
    }
  };

  const handleTeacherSubmit = async (id) => {
    const payload = {
      id: id || "1",
      teacherId: selectedTeacher.id,
    };
    setTeacherMutation.mutate(payload);
    setCheckedTeachers({});
    await setSelectedTeacher(null);
    closeModal();
  };

  const setTeacherAppoint = () => {
    const modalData = {
      title: <StyledModalHeader>담임선생님 지정</StyledModalHeader>,
      contents: (
        <StyledParentProfileWrapper>
          <StyledParentBox flexDirection="column" padding="0px">
            <StyledInputWrapper marginTop="20px">
              {selectedTeacher ? (
                <>
                  <StyledCheckInformationBox marginLeft="12px">
                    <StyledProfileImage
                      width="40px"
                      height="40px"
                      marginTop="0px"
                      src={selectedTeacher.imgSrc}
                    />
                    <StyledParentName>{selectedTeacher.name}</StyledParentName>
                    <StyledParentPhone>
                      {selectedTeacher.phone}
                    </StyledParentPhone>
                  </StyledCheckInformationBox>
                </>
              ) : (
                <StyledParentAddBox>선생님을 선택 해주세요</StyledParentAddBox>
              )}
              <StyledSearchInput
                type="text"
                onChange={handleSearch}
                value={searchTeacher}
              />
            </StyledInputWrapper>
            <StyledChoiceparentWrapper>
              {TeacherData?.data.data?.map((item) => {
                return (
                  <StyledParentInformationBox key={item.id}>
                    <CheckBox
                      type="checkbox"
                      checked={checkedTeachers[item.id] || false}
                      onChange={(e) => handleCheckBoxChange(e, item)}
                    />
                    <StyledProfileImage
                      width="40px"
                      height="40px"
                      marginTop="0px"
                      src={item.profileImageUrl}
                    />
                    <StyledParentName>{item.name}</StyledParentName>
                    <StyledParentPhone>{item.phoneNumber}</StyledParentPhone>
                  </StyledParentInformationBox>
                );
              })}
            </StyledChoiceparentWrapper>
          </StyledParentBox>
        </StyledParentProfileWrapper>
      ),
      footer: (
        <StyledModalButton
          onClick={() => {
            handleTeacherSubmit(id);
          }}
        >
          저장하기
        </StyledModalButton>
      ),
      width: "660px",
      height: "504px",
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
              <StyledQuestionFont marginLeft="5px">
                담임선생님
              </StyledQuestionFont>
              {userRole.role === "PRINCIPAL" ? (
                <StyledGearButton
                  marginLeft="5px"
                  onClick={setTeacherAppoint}
                />
              ) : null}
            </StyledInputWrapper>
            <StyledTeacherImage
              src={data?.data?.data?.classroomTeacher?.profileImageUrl}
            />
          </StyledLeftWrapper>
          <StyledMiddleWrapper>
            <StyledHeaderInputWrapper>
              <StyledQuestionFont>한마디 </StyledQuestionFont>
              <StyledAnswerFont marginLeft="30px">
                {data?.data?.data?.classroomTeacher?.resolution}
              </StyledAnswerFont>
            </StyledHeaderInputWrapper>
            <StyledInputWrapper>
              <StyledQuestionFont>이름</StyledQuestionFont>
              <StyledAnswerFont marginLeft="190px">
                {data?.data?.data?.classroomTeacher?.name}
              </StyledAnswerFont>
              <StyledQuestionFont marginLeft="90px">연락처</StyledQuestionFont>
              <StyledAnswerFont marginLeft="110px">
                {data?.data?.data?.classroomTeacher?.phoneNumber}
              </StyledAnswerFont>
            </StyledInputWrapper>
            <StyledInputWrapper>
              <StyledQuestionFont>생년월일</StyledQuestionFont>
              <StyledAnswerFont marginLeft="135px">
                {data?.data?.data?.classroomTeacher?.birth}
              </StyledAnswerFont>
              <StyledQuestionFont marginLeft="87px">메일</StyledQuestionFont>
              <StyledAnswerFont marginLeft="80px">
                {data?.data?.data?.classroomTeacher?.email}
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
  margin-top: 10px;
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
  margin-top: ${({ marginTop }) => marginTop || "30px"};
`;

const StyledLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-left: 40px;
`;

const StyledQuestionFont = styled.div`
  ${textVariants.Body3_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[400]};
  margin-left: ${({ marginLeft }) => marginLeft};
`;

const StyledTeacherImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 70%;
  margin-top: 12px;
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
`;

const StyledParentBox = styled.div`
  width: 560px;
  border: none;
  padding: ${({ padding }) => padding || "25px"};
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  align-items: flex-start;
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
  justify-content: center;
  padding: 20px 12px;
  gap: 9px;
  width: 600px;
  height: 288px;
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

const StyledHeaderInputWrapper = styled.div`
  display: flex;
  margin-top: ${({ marginTop }) => marginTop || "30px"};
`;

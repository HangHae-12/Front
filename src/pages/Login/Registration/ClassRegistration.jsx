import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import useModal from "../../../hooks/useModal";
import AlertModal from "../../../components/Modals/AlertModal";
import { useRegistrationForm } from ".";
import StyledLogin from "../styled";
import Buttons from "../../../components/Buttons";
import textVariants from "../../../styles/variants/textVariants";

const ClassRegistration = () => {
  const { setValue } = useRegistrationForm();
  const [inputText, setInputText] = useState("");
  const [classroomLists, setClassroomLists] = useState([]);
  const { openModal } = useModal();

  useEffect(() => {
    setValue("classroomList", classroomLists);
  }, [classroomLists, setValue]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addClassromm();
    }
  };

  const addClassromm = () => {
    const classroom = inputText.trim();
    if (!classroom) return;
    if (classroomLists.includes(classroom)) {
      openModal({
        contents: (
          <AlertModal
            title="반 추가에 실패하였습니다."
            message="반 이름은 중복될 수 없습니다."
          />
        ),
      });
      setInputText("");
      return;
    }

    if (classroomLists.length < 3) {
      setClassroomLists((prev) => [...prev, classroom]);
      setInputText("");
    } else {
      openModal({
        contents: (
          <AlertModal
            title="반 추가에 실패하였습니다."
            message="반은 최대 3개까지 추가할 수 있습니다."
          />
        ),
      });
      setInputText("");
    }
  };

  const removeClassroom = (index) =>
    setClassroomLists(classroomLists.filter((_, i) => i !== index));

  return (
    <StyledClassRegistration>
      <Wrapper>
        <LabelWrapper>
          <StyledLogin.Label isEssential>반 등록</StyledLogin.Label>
        </LabelWrapper>
        <ContentsWrapper>
          <Box>
            <Input
              type="text"
              placeholder="반 이름을 적어주세요."
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <Buttons.Filter
              type="button"
              onClick={addClassromm}
              colorTypes="primary"
              outlined
            >
              추가
            </Buttons.Filter>
          </Box>
          {classroomLists.map((classroom, index) => (
            <Box key={classroom + index}>
              <Classroom>{classroom}</Classroom>
              <Buttons.Filter
                type="button"
                onClick={() => removeClassroom(index)}
                outlined
              >
                삭제
              </Buttons.Filter>
            </Box>
          ))}
        </ContentsWrapper>
      </Wrapper>
    </StyledClassRegistration>
  );
};
export default ClassRegistration;

const StyledClassRegistration = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 150px 30px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  border-radius: 8px;
  background: ${({ theme }) => theme.color.grayScale[25]};
  padding: 20px;
`;

const BoxStyle = css`
  ${textVariants.Body1_SemiBold}
  width: 100%;
  padding: 3px 12px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  border-radius: 4px;
  background: ${({ theme }) => theme.color.grayScale[50]};
`;

const LabelWrapper = styled.div`
  padding: 7px 25px;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  margin-bottom: 22px;
`;

const Input = styled.input`
  ${BoxStyle}
  outline: none;
  transition: 0.3s ease-in-out;

  &:focus {
    box-shadow: 0 0 4px 1px rgba(60, 180, 120, 0.4);
  }

  &::placeholder {
    opacity: 0.3;
  }
`;

const Classroom = styled.span`
  ${BoxStyle}
  display: flex;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

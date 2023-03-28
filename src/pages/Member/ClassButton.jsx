import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import TeacherInformation from "./TeacherInformation";
import ClassMember from "./ClassMember";
import Gallery from "./Gallery";
import Button from "../../components/Button";
import textVariants from "../../styles/variants/textVariants";

function ClassButton() {
  const [selectedClass, setSelectedClass] = useState("none");
  const [isMember, setIsMember] = useState(true);
  const [selectedButton, setSelectedButton] = useState("none");
  const navigate = useNavigate();
  const { id } = useParams();

  // const handleClassClick = (id) => {
  //   if (id === selectedClass) {
  //     setSelectedClass("none");
  //   } else {
  //     setSelectedClass(id);
  //   }
  //   navigate(`/common/classes/${id}`);
  // };

  const handleButtonClick = (selected) => {
    const idMapping = {
      세빛반: 1,
      둥둥반: 2,
      빛살반: 3,
    };

    const selectedId = idMapping[selected];

    if (selected === selectedClass) {
      setSelectedClass("none");
    } else {
      setSelectedClass(selected);
    }
    navigate(`/common/classes/${selectedId}`);
  };

  return (
    <>
      <StyledHeaderFont>학급관리</StyledHeaderFont>
      <StyledButtonWrapper>
        <Button.ClassButton
          selected={"세빛반"}
          selectedButton={selectedButton}
          onClick={() => handleButtonClick("세빛반")}
        />
        <Button.ClassButton
          selected={"둥둥반"}
          selectedButton={selectedButton}
          onClick={() => handleButtonClick("둥둥반")}
        />
        <Button.ClassButton
          selected={"빛살반"}
          selectedButton={selectedButton}
          onClick={() => handleButtonClick("빛살반")}
        />
      </StyledButtonWrapper>
      <TeacherInformation />
      <button onClick={() => setIsMember(true)}>아이들</button>
      <button onClick={() => setIsMember(false)}>갤러리</button>
      {isMember ? <ClassMember /> : <Gallery />}
    </>
  );
}

export default ClassButton;

const StyledButtonWrapper = styled.div`
  padding-bottom: 10px;
`;

const StyledHeaderFont = styled.div`
  ${textVariants.H1}
  margin-bottom: 20px;
`;

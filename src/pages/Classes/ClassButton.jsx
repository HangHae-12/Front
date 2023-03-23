import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from "react-router-dom";
import TeacherInformation from './TeacherInformation';
import ClassMember from './ClassMember';
import Gallery from './Gallery';



function ClassButton() {
  const [selectedClass, setSelectedClass] = useState('none');
  const [color, setColor] = useState('blue');
  const [isMember, setIsMember] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();



  const handleClassClick = (id) => {
    if (id === selectedClass) {
      setSelectedClass('none');
    } else {
      setSelectedClass(id);
    }
    navigate(`/common/classes/${id}`)
  }

  return (
    <>
    <StyledButtonWrapper>
      <StyledClassButton
        onClick={() => handleClassClick(1)}
        selected={selectedClass === 1}
        color={selectedClass === 1 ? color : ''}
        style={{marginLeft: "0px"}}
      >
        세빛반
      </StyledClassButton>
      <StyledClassButton
        onClick={() => handleClassClick(2)}
        selected={selectedClass === 2}
        color={selectedClass === 2 ? color : ''}
      >
        힘찬반
      </StyledClassButton>
      <StyledClassButton
        onClick={() => handleClassClick(3)}
        selected={selectedClass === 3}
        color={selectedClass === 3 ? color : ''}
      >
        창의반
      </StyledClassButton>
    </StyledButtonWrapper>
    <TeacherInformation />
    <button
      onClick={() => setIsMember(true)}
    >
      아이들</button>
    <button
      onClick={() => setIsMember(false)}
      >
      갤러리</button>
    {isMember ? <ClassMember /> : <Gallery />}
    </>
  )
}

export default ClassButton

const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const StyledClassButton = styled.button`
  margin-left: 10px;
  background-color: ${props => props.color};
  color: ${props => props.selected ? 'white' : 'black'};
`

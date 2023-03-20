import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";


function ClassButton() {
  const [selectedClass, setSelectedClass] = useState('none');
  const [color, setColor] = useState('blue');
  const navigate = useNavigate();


  const handleClassClick = (id) => {
    if (id === selectedClass) {
      setSelectedClass('none');
    } else {
      setSelectedClass(id);
    }
    navigate(`/common/classes/${id}`)
  }

  return (
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

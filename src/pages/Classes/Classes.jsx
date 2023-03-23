import React from 'react'
import styled from "styled-components";
import ClassButton from './ClassButton'

function Class() {
  return (
    <StyledClassesWrapper>
    <ClassButton />
    </StyledClassesWrapper>
  )
}

export default Class

const StyledClassesWrapper = styled.div`
  background: #E5E5E5;
`
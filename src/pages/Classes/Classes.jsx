import React from 'react'
import styled from "styled-components";
import ClassButton from './ClassButton'
import ClassMember from './ClassMember'
import Gallery from './Gallery';
import TeacherInformation from './TeacherInformation'

function Class() {
  return (
    <StyledClassesWrapper>
    <ClassButton />
    <TeacherInformation />
    <ClassMember />
    </StyledClassesWrapper>
  )
}

export default Class

const StyledClassesWrapper = styled.div`
  background: #E5E5E5;
`
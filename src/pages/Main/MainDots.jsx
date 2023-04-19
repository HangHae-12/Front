import React from 'react';
import styled from 'styled-components';

const RendingDots = ({ pageIndex, totalPages, setPageIndex }) => {

  return (
    <StyledDotsContainer>
      {Array.from({ length: totalPages }).map((_, index) => (
        <StyledDot
          key={index}
          active={pageIndex === index}
          onClick={() => setPageIndex(index)}
        />
      ))}
    </StyledDotsContainer>
  );
}

export default RendingDots;

const StyledDotsContainer = styled.div`
  position: fixed;
  right: 5rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;


const StyledDot = styled.div`
  width: 15px; 
  height: 15px; 
  border-radius: 50%;
  background-color: ${({ active }) =>
    active ? ({ theme }) => theme.color.primary : ({ theme }) => theme.color.grayScale[100]};
  transition: background-color 0.3s ease, transform 0.3s ease;
  transform: ${({ active }) => (active ? 'scale(1.5)' : 'scale(0.6)')};
  cursor: pointer;
`;


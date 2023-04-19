import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { HiOutlineCursorArrowRays } from 'react-icons/hi2'

const typingSpeed = 100;
const erasingSpeed = 70;
const eraseDelay = 4000;
const typingDelay = 1000;

const MainTyping = ({ textList }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const updateText = async () => {
      while (isMounted) {
        const text = textList[textIndex];

        for (let i = 1; i <= text.length; i++) {
          if (!isMounted) return;
          setDisplayText(text.slice(0, i));
          await new Promise(r => setTimeout(r, typingSpeed));
        }
        await new Promise(r => setTimeout(r, eraseDelay));

        for (let i = text.length; i > 0; i--) {
          if (!isMounted) return;
          setDisplayText(text.slice(0, i - 1));
          await new Promise(r => setTimeout(r, erasingSpeed));
        }
        await new Promise(r => setTimeout(r, typingDelay));

        setTextIndex((textIndex + 1) % textList.length);
      }
    };
    updateText();
    return () => {
      isMounted = false;
    };
  }, [textIndex, textList]);

  return (
    <>
      <StyledTypingTitle>
        {displayText.split('').map((title, i) => (
          <span key={i}>{title}</span>
        ))}
        <StyledCursor><HiOutlineCursorArrowRays /></StyledCursor>
      </StyledTypingTitle>
    </>
  );
}

export default MainTyping;

const StyledTypingTitle = styled.span`
  font-size: 70px;
  font-weight: 700;
  margin-bottom: 57px;
`;

const StyledCursor = styled.span`
  animation: ${keyframes`
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `} 1s step-end infinite;
`;

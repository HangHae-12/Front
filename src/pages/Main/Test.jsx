import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import SecondPage from './SecondPage';
import FirstPage from './FirstPage';
import ThirdPage from './ThirdPage';
import FourPage from './FourPage';
import FifthPage from './FifthPage';
import RendingDots from './MainDots';
import { BsChevronDoubleUp } from 'react-icons/bs'
import useThrottleCallBack from '../../hooks/useThrottleCallback';
const Test = () => {

  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams] = useSearchParams();
  const initialPageIndex = Number(searchParams.get('pageIndex')) || 0;

  const pages = [
    <FirstPage setPageIndex={setPageIndex} />,
    <SecondPage />,
    <ThirdPage />,
    <FourPage />,
    <FifthPage />,
  ];

  useThrottleCallBack(handleScroll, 1200, 'wheel');

  useEffect(() => {
    setTotalPages(pages.length);
  }, []);

  useEffect(() => {
    setPageIndex(initialPageIndex);
  }, [initialPageIndex]);

  function handleScroll(e) {
    if (e.deltaY > 0) {
      setPageIndex(prevIndex =>
        prevIndex < totalPages - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.deltaY < 0) {
      setPageIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    }
  }
  const handleBackToFirstPage = () => setPageIndex(0);
  return (
    <>
      <StyledScrollContainer pageIndex={pageIndex}>
        {pages.map((page, index) => (
          <FadeInPage key={index} visible={index === pageIndex}>
            {page}
          </FadeInPage>
        ))}
      </StyledScrollContainer>
      <RendingDots
        pageIndex={pageIndex}
        totalPages={5}
        setPageIndex={setPageIndex} />
      <StyledScrollToTopContainer>
        <StyledBsChevronDoubleUp onClick={handleBackToFirstPage} />
      </StyledScrollToTopContainer>
    </>
  );
}
export default Test;
const StyledScrollContainer = styled.div`
  transform: ${({ pageIndex }) => `translateY(-${pageIndex * 100}vh)`};
  transition: transform 1s ease;
  height: calc(100vh - 164px);
`;

const FadeInPage = styled.div`
  transition: opacity 0.2s linear, transform 0.4s ease-in-out;
  height: calc(100vh - 164px);
  margin-top: 165px;
  width: 100%;
`;

const StyledScrollToTopContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 80px;
  z-index: 1;
`;

const StyledBsChevronDoubleUp = styled(BsChevronDoubleUp)`
  width: 50px;
  height: 50px;
  color: ${props => props.theme.color.blue.brandColor6};
  cursor: pointer;
  transition: color 0.2s, opacity 0.2s, transform 0.3s;
  filter: drop-shadow(2px 4px 2px rgba(0, 0, 0, 0.269));
  &:active {
    transform: scale(0.9);
  }
  :hover {
    transform: scale(1.1);
    svg {
      filter: drop-shadow(2px 4px 10px rgba(0, 0, 0, 0.269));
    }
  }
`;
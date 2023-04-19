import React from 'react';
import styled from 'styled-components';
import FifthImg from '../../assets/MainImage/FifthImg.png';
import textVariants from "../../styles/variants/textVariants";

const FifthPage = () => {
    return (
        <>
            <StyledMainContainer>
                <StyledMainWrapper>
                    <StyledMainTopContainer>
                        <StyledDescriptiontitle>
                            선생님은 힘든 문서 작업을 ,  <span>손쉽게 엑셀로</span> 출력 할수 있어요
                        </StyledDescriptiontitle>
                    </StyledMainTopContainer>
                    <StyledMainBottomContainer bg={FifthImg}></StyledMainBottomContainer>
                </StyledMainWrapper>
            </StyledMainContainer>
        </>
    );
}
export default FifthPage;

const StyledMainContainer = styled.div`
  width: 100vw;
`;

const StyledMainWrapper = styled.div`
  flex-direction: column;
`;
const StyledMainTopContainer = styled.div`
  display:flex;
  justify-content:center;
  align-items: flex-end;
  padding: 10px;
`;

const StyledDescriptiontitle = styled.span`

  ${textVariants.H1}
  span {
    font-size: 40px;
  }
`;

const StyledMainBottomContainer = styled.div`
  position: relative;
  height: calc(100vh - 232px);
  width: 100%;
  background: url(${props => props.bg}) no-repeat center center/contain;
  @media ${({ theme }) => theme.device.laptop} {
    width: 100%;
  }
`;

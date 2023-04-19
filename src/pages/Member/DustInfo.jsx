import styled, { css } from "styled-components";
import textVariants from "../../styles/variants/textVariants";
import { motion } from "framer-motion";
import { BsCheckCircle, BsEmojiSunglasses, BsEmojiSmile, BsEmojiExpressionless, BsEmojiFrown } from "react-icons/bs"

const DustInfo = ({ data }) => {

  const DustEmoji = (dust) => {
    if (dust <= 15) {
      return { emoji: <BsEmojiSunglasses />, level: "좋음", color: "green" };
    } else if (dust <= 35) {
      return { emoji: <BsEmojiSmile />, level: "보통", color: "blue" };
    } else if (dust <= 75) {
      return { emoji: <BsEmojiExpressionless />, level: "나쁨", color: "orange" };
    } else {
      return { emoji: <BsEmojiFrown />, level: "매우나쁨", color: "red" };
    }
  };
  const pm10Info = DustEmoji(data?.pm10);
  const pm25Info = DustEmoji(data?.pm25);
  return (
    <StyledWrapper>
      <StyledHeader><BsCheckCircle /> 오늘의 미세먼지 정보</StyledHeader>
      <StyledContent>
        <StyledBox
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}>
          <StyledMLabel>미세먼지</StyledMLabel>
          <StyledLine />
          <StyledEmoji color={pm10Info?.color}>{pm10Info?.emoji}</StyledEmoji>
          <StyledDustLevel color={pm10Info?.color}>{pm10Info?.level} <span>{data?.pm10}㎍/㎥</span></StyledDustLevel>
        </StyledBox>
        <StyledBox
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}>
          <StyledSLabel>초미세먼지</StyledSLabel>
          <StyledLine />
          <StyledEmoji color={pm25Info?.color}>{pm25Info?.emoji}</StyledEmoji>
          <StyledDustLevel color={pm25Info?.color}>{pm25Info?.level} <span>{data?.pm25}㎍/㎥</span></StyledDustLevel>
        </StyledBox>
      </StyledContent>
      <StyledDescription>
        * 미세먼지 수치 정보는 1시간 단위로 업데이트됩니다.
      </StyledDescription>
    </StyledWrapper>
  );
};

export { DustInfo };

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  padding: 16px;
  margin-top: 10px;
`;

const StyledHeader = styled.div`
  ${textVariants.Body1_Bold}
  color: ${({ theme }) => theme.color.grayScale[700]};
  margin-bottom: 18px;
`;

const StyledContent = styled.div`
  display: flex;
  gap: 34px;
  width: 100%; 
  flex-wrap: wrap;
`;

const StyledBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.12);
  padding: 8px 20px;
  flex: 2;
`;

const StyledMLabel = styled.div`
  ${textVariants.Body1_SemiBold}
  font-weight: bold;
  color: ${({ theme }) => theme.color.orange};
  background-color: ${({ theme }) => theme.color.orange_lighter};
  margin-bottom: 8px;
  padding:8px;
`;

const StyledSLabel = styled.div`
  ${textVariants.Body1_SemiBold}
  font-weight: bold;
  color: ${({ theme }) => theme.color.red};
  background-color: ${({ theme }) => theme.color.red_lighter};
  margin-bottom: 8px; 
  padding: 8px;
  white-space: nowrap;
`;

const StyledLine = styled.hr`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  margin-bottom: 8px; 
`;

const StyledEmoji = styled.div`
  font-size: 48px; 
  margin-bottom: 8px; 
`;

const StyledDustLevel = styled.div`
  ${textVariants.Body1_SemiBold}
  ${({ color }) => css` color: ${color};`}
  display: flex;
  align-items: baseline;
  
  span {
    ${textVariants.Body3_SemiBold}
    color: ${({ theme }) => theme.color.grayScale[500]};
    margin-left: 4px;
  }
`;

const StyledDescription = styled.div`
  ${textVariants.Body3_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-top: 10px; 
`;

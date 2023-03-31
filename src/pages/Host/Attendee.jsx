import styled from "styled-components";
import textVariants from "../../styles/variants/textVariants";

const Attendee = (classData) => {

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const todayString = `${year}.${month}.${day}`;
    const dayOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][today.getDay()];

    return (
        <StyledInfoContainer>
            <StyledInfoColomn>
                <StyleddateLabel>{todayString}</StyleddateLabel>
                <StyleddateValue>{dayOfWeek}</StyleddateValue>
            </StyledInfoColomn>
            <StyledInfoRow>
                <StyledInfoLabel>총원</StyledInfoLabel>
                <StyledInfoValue>{classData?.totalNumber}</StyledInfoValue>
                <StyleddateLabel>명</StyleddateLabel>
            </StyledInfoRow>
            <StyledInfoRow>
                <StyledInfoLabel>등원</StyledInfoLabel>
                <StyledInfoValue>{classData?.notEnterNumber}</StyledInfoValue>
                <StyleddateLabel>명</StyleddateLabel>
            </StyledInfoRow>
            <StyledInfoRow>
                <StyledInfoLabel>미등원</StyledInfoLabel>
                <StyledInfoValue>{classData?.exitNumber}</StyledInfoValue>
                <StyleddateLabel>명</StyleddateLabel>
            </StyledInfoRow>
            {/* <StyledInfoRow>
          <StyledInfoLabel>결석</StyledInfoLabel>
          <StyledInfoValue>{data.totalNumber}</StyledInfoValue>
          <StyleddateLabel>명</StyleddateLabel>
        </StyledInfoRow> */}
        </StyledInfoContainer>
    );
};

export default Attendee;

const StyledInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  margin: 64px auto;
  border: 2px solid ${({ theme }) => theme.color.grayScale[200]};
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  padding: 40px 64px 40px 25px;
`;
const StyledInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  gap: 24px;
  width: 200px;
  height: 80px;
`;
const StyledInfoColomn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 80px;
`;
const StyledInfoLabel = styled.div`
  ${textVariants.Body1_Bold}
  color: ${({ theme }) => theme.color.grayScale[400]};
`;
const StyledInfoValue = styled.div`
  ${textVariants.H1}
  color: ${({ theme }) => theme.color.grayScale[500]};
`;

const StyleddateLabel = styled.div`
  ${textVariants.H3_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
`;

const StyleddateValue = styled.div`
  ${textVariants.H2_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[700]};
`;

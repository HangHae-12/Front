import styled from "styled-components";
import textVariants from "../../../styles/variants/textVariants";

const CalandarDay = ({ label }) => {
  const day = label;
  return <StyledDay>{day}</StyledDay>;
};

const StyledDay = styled.div`
  ${textVariants.Body1_Bold}
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.grayScale[500]};
`;
export default CalandarDay;

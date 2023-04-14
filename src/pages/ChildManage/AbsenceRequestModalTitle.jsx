import styled from "styled-components";
import textVariants from "../../styles/variants/textVariants";

const AbsenceRequestModalTitle = ({ children }) => {
  return (
    <StyledAbsenceRequestModalTitle>{children}</StyledAbsenceRequestModalTitle>
  );
};

export default AbsenceRequestModalTitle;

const StyledAbsenceRequestModalTitle = styled.div`
  width: 100%;
  height: 100%;
  ${textVariants.Body1_Bold}
  text-align: center;
  margin-top: 20px;
`;

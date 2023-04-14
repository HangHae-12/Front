import styled from "styled-components";
import textVariants from "../../styles/variants/textVariants";

const StyledChildManage = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding: 70px 70px 0 150px;
  `,
  Header: styled.h2`
    ${textVariants.H2_Bold}
    color: ${({ theme }) => theme.color.grayScale[600]};
    margin-bottom: 32px;
  `,

  Section: styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 580px;
    gap: 24px;
    margin-bottom: 40px;
  `,

  Title: styled.h3`
    ${textVariants.Body1_Bold}
    color: ${({ theme }) => theme.color.grayScale[700]};
    opacity: 0.8;
  `,

  SubTitle: styled.p`
    ${textVariants.Body2_SemiBold}
    color: ${({ theme }) => theme.color.grayScale[500]};
    opacity: 0.8;
  `,
  Card: styled.div`
    width: 100%;
    border-radius: 12px;
    padding: 40px;
    border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  `,
};

export default StyledChildManage;

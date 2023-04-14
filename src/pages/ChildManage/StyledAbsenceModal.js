import styled from "styled-components";
import textVariants from "../../styles/variants/textVariants";
import AbsenceModal from "./AbsenceInfoModal";

const StyledAbsenceModal = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 0px 10px 20px 10px;
  `,

  SubTitle: styled.h3`
    ${textVariants.Body2_SemiBold}
    color: ${({ theme }) => theme.color.grayScale[600]};
  `,

  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,

  BtnWrapper: styled.div`
    text-align: end;
  `,

  ReasonBox: styled.div`
    ${textVariants.Body1_SemiBold}
    display: flex;
    width: 100%;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background: ${({ theme }) => theme.color.grayScale[50]};
    color: ${({ theme }) => theme.color.grayScale[300]};
  `,
};

export default StyledAbsenceModal;

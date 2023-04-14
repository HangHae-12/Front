import styled from "styled-components";
import { FiAlertCircle } from "react-icons/fi";
import textVariants from "../../styles/variants/textVariants";

const AlertModal = ({ title, message }) => {
  return (
    <StyledAlertModal.Container>
      <StyledAlertModal.Icon />
      <StyledAlertModal.Title>
        {title ?? "잘못된 접근입니다."}
      </StyledAlertModal.Title>
      <StyledAlertModal.Message>
        {message ?? "확인하고 다시 시도해주세요 !"}
      </StyledAlertModal.Message>
    </StyledAlertModal.Container>
  );
};

const StyledAlertModal = {
  Container: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  Icon: styled(FiAlertCircle)`
    width: 80px;
    height: 80px;
    margin-bottom: 30px;
    color: ${({ theme }) => theme.color.red};
  `,

  Title: styled.h1`
    ${textVariants.H1};
    color: ${({ theme }) => theme.color.grayScale[400]};
    margin-bottom: 10px;
  `,
  Message: styled.h4`
    ${textVariants.Body2_SemiBold};
    color: ${({ theme }) => theme.color.grayScale[700]};
  `,
};

export default AlertModal;

import styled from "styled-components";
import { AiOutlineCheck } from "react-icons/ai";
import textVariants from "../../styles/variants/textVariants";

const SuccessModal = ({ title, message }) => {
  return (
    <StyledAlertModal.Container>
      <StyledAlertModal.Icon />
      <StyledAlertModal.Title>
        {title ?? "정상 처리되었습니다."}
      </StyledAlertModal.Title>
      <StyledAlertModal.Message>
        {message ?? "요청이 정상적으로 처리되었습니다."}
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

  Icon: styled(AiOutlineCheck)`
    width: 80px;
    height: 80px;
    margin-bottom: 30px;
    color: ${({ theme }) => theme.color.green};
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

export default SuccessModal;

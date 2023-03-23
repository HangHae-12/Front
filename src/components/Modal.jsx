import { createPortal } from "react-dom";
import styled from "styled-components";
import useModal from "../hooks/useModal";
import { textVariants } from "../styles/designSystem";

const Modal = ({ modalOption = {} }) => {
  const { modalState, closeModal } = useModal();

  const {
    canCloseOnOverlayClick = true,
    isCloseButton = true,
    padding,
    width,
    height,
  } = modalOption;

  const handleOverlayClick = (e) => {
    if (canCloseOnOverlayClick) {
      closeModal(e);
    }
  };

  return modalState.isOpen
    ? createPortal(
        <>
          <StyledModal.Overlay
            onClick={handleOverlayClick}
            canCloseOnOverlayClick={canCloseOnOverlayClick}
          >
            <StyledModal.Container
              onClick={(e) => e.stopPropagation()}
              padding={padding}
              width={width}
              height={height}
            >
              {isCloseButton && (
                <StyledModal.CloseButton onClick={closeModal}>
                  &times;
                </StyledModal.CloseButton>
              )}
              <StyledModal.Title>{modalState.title}</StyledModal.Title>
              <StyledModal.Contents>{modalState.contents}</StyledModal.Contents>
              {modalState.callback && (
                <StyledModal.Footer>
                  <button onClick={closeModal}>Cancel</button>
                  <button onClick={modalState.callback}>Ok</button>
                  {/* 모달 디자인이 나오면 버튼 디자인, 문구 변경할 것 */}
                </StyledModal.Footer>
              )}
            </StyledModal.Container>
          </StyledModal.Overlay>
        </>,
        document.getElementById("modal-root")
      )
    : null;
};

export default Modal;

const StyledModal = {
  Overlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  `,

  Container: styled.div`
    background-color: ${({ color, theme }) => color || theme.color.white};
    border-radius: 8px;
    padding: ${({ padding }) => padding || "10px"};
    width: ${({ width }) => width || "500px"};
    height: ${({ height }) => height || "400px"};
    position: relative;
    z-index: 1000;
  `,

  Header: styled.div`
    display: flex;
    height: 15px;
    padding-right: 25px;
    align-items: center;
  `,

  Title: styled.h2`
    font-size: 24px;
    font-weight: 700;
    margin: 0;
  `,

  Contents: styled.div`
    margin-top: 10px;
  `,

  Footer: styled.div`
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    bottom: 10px;
    gap: 10px;
    button {
      width: 20%;
    }
  `,

  CloseButton: styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 24px;
    font-weight: 700;
  `,
};
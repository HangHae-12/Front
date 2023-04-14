import { createPortal } from "react-dom";
import styled from "styled-components";
import useModal from "../hooks/useModal";
import { motion, AnimatePresence } from "framer-motion";

const Modal = () => {
  const { modalState, closeModal } = useModal();

  const {
    canCloseOnOverlayClick = true,
    isCloseButton = true,
    padding,
  } = modalState;

  const handleOverlayClick = (e) => {
    if (canCloseOnOverlayClick) {
      closeModal(e);
      if (modalState.onClose) {
        modalState.onClose();
      }
    }
  };
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "100%", transition: { duration: 0.2 } },
    exit: { opacity: 0, y: "100%", transition: { duration: 0.2 } },
  };

  return modalState.isOpen
    ? createPortal(
      <>
        <StyledModal.Overlay
          onClick={handleOverlayClick}
          canCloseOnOverlayClick={canCloseOnOverlayClick}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <StyledModal.Container
            onClick={(e) => e.stopPropagation()}
            padding={padding}
            width={modalState.width}
            height={modalState.height}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {isCloseButton && (
              <StyledModal.CloseButton
                onClick={() => {
                  closeModal();
                  if (modalState.onClose) {
                    modalState.onClose();
                  }
                }}
              >
                &times;
              </StyledModal.CloseButton>
            )}
            <StyledModal.Title>{modalState.title}</StyledModal.Title>
            <StyledModal.Contents>{modalState.contents}</StyledModal.Contents>
            {modalState.callback && (
              <StyledModal.Footer>{modalState.footer}</StyledModal.Footer>
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
  Overlay: styled(motion.div)`
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

  Container: styled(motion.div)`
    background-color: ${({ color, theme }) => color ?? theme.color.white};
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
    padding: ${({ padding }) => padding ?? "10px"};
    width: ${({ width }) => width ?? "500px"};
    height: ${({ height }) => height ?? "400px"};
    position: relative;
    z-index: 1000;
  `,

  Header: styled(motion.div)`
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

  Contents: styled(motion.div)`
    /* margin-top: 10px; */
    padding-top: 30px;
    width: 100%;
    height: 100%;
  `,

  Footer: styled(motion.div)`
    position: absolute;
    right: 30px;
    display: flex;
    justify-content: center;
    bottom: 20px;
    gap: 10px;
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

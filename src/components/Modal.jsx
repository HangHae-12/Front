import React, { createContext, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../atom/modalAtoms";
import useModal from "../hooks/useModal";

const StyledModal = {
  Overlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    z-index: 999;
  `,

  Container: styled.div`
    background-color: ${({ color, theme }) => color || theme.color.white};
    border-radius: 8px;
    padding: ${({ padding }) => padding || "10px"};
    max-width: ${({ width }) => width || "80%"};
    max-height: ${({ height }) => height || "80%"};
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

const Modal = ({ canCloseOnOverlayClick = true }) => {
  const { modalState, closeModal } = useModal();
  console.log(modalState);
  const handleOverlayClick = (e) => {
    if (canCloseOnOverlayClick) {
      closeModal(e);
    }
  };

  return (
    <>
      {modalState.isOpen ? (
        <StyledModal.Overlay onClick={handleOverlayClick}>
          <StyledModal.Container onClick={(e) => e.stopPropagation()}>
            <StyledModal.CloseButton onClick={closeModal}>
              &times;
            </StyledModal.CloseButton>

            <StyledModal.Title>{modalState.title}</StyledModal.Title>
            <StyledModal.Contents>{modalState.contents}</StyledModal.Contents>
          </StyledModal.Container>
        </StyledModal.Overlay>
      ) : null}
    </>
  );
};

export default Modal;

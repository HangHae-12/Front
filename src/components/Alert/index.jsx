import React, { useEffect } from "react";
import styled from "styled-components";

const CustomAlert = ({ show, message, onClose, duration = 800 }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, onClose, duration]);

  if (!show) {
    return null;
  }

  return (
    <AlertBackdrop>
      <Alert>
        <p>{message}</p>
      </Alert>
    </AlertBackdrop>
  );
};

export default CustomAlert;

const AlertBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Alert = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  padding: 15px 25px;
  color: white;
  font-size: 16px;
`;

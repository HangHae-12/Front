import React from "react";
import Modal from "../../components/Modal";

const ClassModal = () => {
  const modalOption = {
    canCloseOnOverlayClick: true,
    isCloseButton: true,
    padding: "10px",
    width: "800px",
    height: "400px",
  };
  return <Modal modalOption={modalOption} />;
};

export default ClassModal;

import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { modalAtom } from "../atom/modalAtoms";

const useModal = () => {
  const [modalState, setModalState] = useRecoilState(modalAtom);

  const closeModal = useCallback(() => {
    if (modalState.onClose) {
      modalState.onClose();
    }
    setModalState((prev) => {
      return { ...prev, isOpen: false };
    });
  }, [setModalState, modalState.onClose]);

  const openModal = useCallback(
    ({ id, title, contents, footer, callback, onClose, width, height }) => {
      setModalState({
        modalId: id,
        isOpen: true,
        title: title,
        contents: contents,
        footer: footer,
        callback: callback,
        onClose: onClose,
        width: width,
        height: height,
      });
    },
    [setModalState]
  );

  return { modalState, closeModal, openModal };
};

export default useModal;

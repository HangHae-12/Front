import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { modalAtom } from "../atom/modalAtoms";

const useModal = () => {
  const [modalState, setModalState] = useRecoilState(modalAtom);

  const closeModal = useCallback(
    () =>
      setModalState((prev) => {
        return { ...prev, isOpen: false };
      }),
    [setModalState]
  );

  const openModal = useCallback(
    ({ title, contents, footer, callback }) => {
      setModalState({
        isOpen: true,
        title: title,
        contents: contents,
        footer: footer,
        callback: callback,
      });
    },
    [setModalState]
  );

  return { modalState, closeModal, openModal };
};

export default useModal;

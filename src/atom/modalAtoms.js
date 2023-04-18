import { atom } from "recoil";

export const modalAtom = atom({
  key: "modalState",
  default: {
    modalId: null,
    // modalID 추가
    isOpen: false,
    title: "",
    contents: "",
    callback: null,
    width: "",
    height: "",
  },
});

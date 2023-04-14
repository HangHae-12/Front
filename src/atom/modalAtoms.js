import { atom } from "recoil";

export const modalAtom = atom({
  key: "modalState",
  default: {
    modalId: null,
    isOpen: false,
    title: "",
    contents: "",
    callback: null,
    width: "",
    height: "",
  },
});

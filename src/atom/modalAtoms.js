import { atom } from "recoil";

export const modalAtom = atom({
  key: "modalState",
  default: {
    isOpen: false,
    title: "",
    contents: "",
    callback: null,
    width: "",
    height: "",
  },
});

import { atom } from "recoil";

export const classesAtom = atom({
    key: "classInfor",
    default: {
      id: "",
      name: "",
    },
  });
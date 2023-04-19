import { atom } from "recoil";

export const classesAtom = atom({
    key: "classInfor",
    default: [{
      id: "",
      name: "",
    }],
  });

  export const classButtonAtom = atom({
    key: "classButton",
    default: [{
      id: "",
      name: "",
    }],
  });
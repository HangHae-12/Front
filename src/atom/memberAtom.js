import { atom } from "recoil";

export const memberAtom = atom({
  key: "memberAdd",
  default: {
    name: "",
    birth: "",
    note: "",
    gender:"",
    image: "",
  },
});

export const parentAtom = atom({
  key: "parentAdd",
  default: {
    id: "",
    name: "",
    phone: "",
    imgSrc:"",
  },
});

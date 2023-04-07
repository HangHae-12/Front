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

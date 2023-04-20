import { atom } from "recoil";

export const memberAtom = atom({
  key: "memberAdd",
  default: {
    childId: "",
    name: "",
    birth: "",
    significant: "",
    gender:"",
    image: "",
    preview: "",
    dailyEnterTime: "",
    dailyExitTime: "",
    isCancelled: false,
  },
});

export const parentAtom = atom({
  key: "parentAdd",
  default: {
    parentId: "",
    name: "",
    phone: "",
    imgSrc:"",
  },
});

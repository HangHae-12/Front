import { atom } from "recoil";

export const scheduledIdAtom = atom({
  key: "scheduledIdState",
  default: "ENTER",
});

export const classIdAtom = atom({
  key: "classIdState",
  default: 0,
});

export const timeAtom = atom({
  key: "timeState",
  default: "전체시간",
});

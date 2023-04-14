import { atom, selector } from "recoil";

export const attendanceManageAtom = atom({
  key: "attendanceManageState",
  default: {
    info: {},
    absent: [],
    content: [],
  },
});

export const infoSelector = selector({
  key: "infoSelector",
  get: ({ get }) => get(attendanceManageAtom).info,
});

export const absentSelector = selector({
  key: "absentSelector",
  get: ({ get }) => get(attendanceManageAtom).absent,
});

export const contentSelector = selector({
  key: "contentSelector",
  get: ({ get }) => get(attendanceManageAtom).content,
});

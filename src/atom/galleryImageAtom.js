import { atom } from "recoil";

export const imageAtom = atom({
  key: "galleryImage",
  default: {
    image: []
  },
});
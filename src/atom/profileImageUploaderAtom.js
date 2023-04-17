import { atom, selectorFamily } from "recoil";

export const profileImageState = atom({
  key: "profileImageState",
  default: {
    // inputRef: null,
    // selectedFile: null,
    // previewImage: null,
    // isCancelled: false,
  },
});

export const profileImageStateSelector = selectorFamily({
  key: "profileImageStateSelector",
  get:
    (id) =>
    ({ get }) => {
      const profileImages = get(profileImageState);
      return (
        profileImages[id] || {
          inputRef: null,
          selectedFile: null,
          previewImage: null,
          isCancelled: false,
        }
      );
    },
  set:
    (id) =>
    ({ set }, newValue) => {
      set(profileImageState, (prev) => ({
        ...prev,
        [id]: newValue,
      }));
    },
});

import { atom } from 'recoil';

export const profileImageState = atom({
  key: 'profileImageState',
  default: {
    inputRef: null,
    selectedFile: null,
    previewImage: null,
    isCancelled: false,
  },
});
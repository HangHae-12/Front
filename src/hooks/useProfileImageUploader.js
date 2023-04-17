import { useRef, useCallback } from "react";
import { useRecoilState } from "recoil";
import { profileImageStateSelector } from "../atom/profileImageUploaderAtom";
import { DUMMY_URL } from "../helpers/dummyUrl";

export const useProfileImageUploader = (id, initialPreview) => {
  const [state, setState] = useRecoilState(profileImageStateSelector(id));
  const inputRef = useRef();
  const { selectedFile, previewImage, isCancelled } = state;

  const handleProfileImageChange = useCallback(
    (file, preview) => {
      setState((prev) => ({
        ...prev,
        selectedFile: file,
        previewImage: preview,
        isCancelled: false,
      }));
    },
    [setState]
  );

  const handleProfileImageCancel = useCallback(() => {
    setState((prev) => ({
      ...prev,
      selectedFile: null,
      previewImage: initialPreview ?? DUMMY_URL.not_profile_img,
      isCancelled: true,
    }));
    inputRef.current.value = null;
  }, [setState, initialPreview]);

  return {
    inputRef,
    selectedFile,
    previewImage,
    isCancelled,
    handleProfileImageChange,
    handleProfileImageCancel,
  };
};

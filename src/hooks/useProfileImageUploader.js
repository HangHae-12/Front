import { useRef, useState } from "react";
import { DUMMY_URL } from "../helpers/dummyUrl";

export const useProfileImageUploader = (initialPreview) => {
  const inputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(initialPreview);
  const [isCancelled, setIsCancelled] = useState(false);

  const handleProfileImageChange = (file, preview) => {
    setSelectedFile(file);
    setPreviewImage(preview);
    setIsCancelled(false);
  };

  const handleProfileImageCancel = () => {
    setSelectedFile(null);
    setPreviewImage(initialPreview ?? DUMMY_URL.not_profile_img);
    setIsCancelled(true);
    inputRef.current.value = null;
  };

  return {
    inputRef,
    selectedFile,
    previewImage,
    isCancelled,
    handleProfileImageChange,
    handleProfileImageCancel,
  };
};

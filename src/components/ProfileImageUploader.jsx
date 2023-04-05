import { useState, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";

const ProfileImageUploader = forwardRef((props, ref) => {
  const { prev } = props;
  const [isCancelled, setIsCancelled] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useImperativeHandle(ref, () => ({
    getProfileImageData: () => ({
      isCancelled,
      selectedFile,
      previewImage,
    }),
  }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setIsCancelled(false);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    } else {
      setPreviewImage(null);
    }
    e.target.value = null;
  };

  const handleThumbnailImage = () => ref.current.click();

  const handleProfileImageCancel = () => {
    setIsCancelled(true);
    setSelectedFile(null);
    setPreviewImage(prev);
  };

  return (
    <>
      <StyledProfileImageUploader.Input
        type="file"
        {...props}
        onChange={handleImageChange}
        ref={ref}
      />
      <StyledProfileImageUploader.Thumbnail
        src={previewImage ?? prev}
        alt="Profile thumbnail"
        onClick={handleThumbnailImage}
      />
      <button type="button" onClick={handleProfileImageCancel}>
        프사취소
      </button>
    </>
  );
});

export default ProfileImageUploader;


const StyledProfileImageUploader = {
  Input: styled.input`
    display: none;
  `,
  Thumbnail: styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  `,
};

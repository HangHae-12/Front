import { useState, forwardRef } from "react";
import styled from "styled-components";

const ProfileImageUploader = forwardRef((props, ref) => {
  const {
    prev,
    setIsCancelled,
    setSelectedFile,
    previewImage,
    setPreviewImage,
  } = props;

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
      // } else {
      //   setPreviewImage(null);
    }
    e.target.value = null;
  };

  const handleThumbnailImage = () => ref.current.click();

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

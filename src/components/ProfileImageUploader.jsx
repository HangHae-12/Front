// components/ImageUploader/ImageUploader.js
import { useState, forwardRef } from "react";
import styled from "styled-components";
import { DUMMY_PROFILE_IMG_SRC } from "../assets";

const Thumbnail = styled.img`
  // 적절한 스타일 추가
`;

const ProfileImageUploader = forwardRef((props, ref) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleThumbnailImage = () => ref.current.click();

  return (
    <>
      <input
        type="file"
        {...props}
        onChange={handleImageChange}
        style={{ display: "none" }}
        ref={ref}
      />
      <Thumbnail
        src={previewImage || DUMMY_PROFILE_IMG_SRC}
        alt="Profile thumbnail"
        onClick={handleThumbnailImage}
      />
    </>
  );
});

export default ProfileImageUploader;

const StyledProfileImageUploader = {
  // input

}
import styled from "styled-components";
import { DUMMY_URL } from "../helpers/dummyUrl";
import { useProfileImageUploader } from "../hooks/useProfileImageUploader";

const ProfileImageUploader = ({ prev }) => {
  const {
    inputRef,
    previewImage,
    handleProfileImageChange,
    handleProfileImageCancel,
  } = useProfileImageUploader(prev);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleProfileImageChange(file, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailImage = () => inputRef.current.click();

  return (
    <>
      <StyledProfileImageUploader.Input
        type="file"
        onChange={handleImageChange}
        ref={inputRef}
      />
      <StyledProfileImageUploader.Thumbnail
        src={previewImage ?? prev ?? DUMMY_URL.not_profile_img}
        alt="Profile thumbnail"
        onClick={handleThumbnailImage}
      />
      <button type="button" onClick={handleProfileImageCancel}>
        프사취소
      </button>
    </>
  );
};

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

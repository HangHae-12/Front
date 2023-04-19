import { useProfileImageUploader } from "../../hooks/useProfileImageUploader";
import { DUMMY_URL } from "../../helpers/dummyUrl";
import StyledProfileImageUploader from "./styled";

const ProfileImageUploader = ({ id, prev, isFixMode, imgStyleProps }) => {
  const {
    inputRef,
    previewImage,
    handleProfileImageChange,
    handleProfileImageCancel,
  } = useProfileImageUploader(id, prev);

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
    <StyledProfileImageUploader.Container>
      <StyledProfileImageUploader.Input
        type="file"
        onChange={handleImageChange}
        ref={inputRef}
      />
      <StyledProfileImageUploader.ThumbnailWrapper isFixMode={!isFixMode}>
        <StyledProfileImageUploader.Thumbnail
          imgStyleProps={imgStyleProps}
          src={previewImage ?? prev ?? DUMMY_URL.not_profile_img}
          alt="Profile thumbnail"
        />

        <StyledProfileImageUploader.CancelButton
          className="cancelIcon"
          onClick={handleProfileImageCancel}
        />
      </StyledProfileImageUploader.ThumbnailWrapper>
      {!isFixMode ? (
        <StyledProfileImageUploader.ChangeButton
          type="button"
          onClick={handleThumbnailImage}
          outlined
        >
          이미지 변경
        </StyledProfileImageUploader.ChangeButton>
      ) : null}
    </StyledProfileImageUploader.Container>
  );
};

export default ProfileImageUploader;

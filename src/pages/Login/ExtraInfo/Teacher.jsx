import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import StyledExtraInfo from "./styled";
import { DUMMY_PROFILE_IMG_SRC } from "../../../assets";
import { SignAPI } from "../../../api/SignAPI";

const Teacher = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const profileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation(SignAPI.signTeacher, {
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("role", "teacher");
    formData.append("name", data.name);
    formData.append("phoneNumber", data.phoneNumber);
    if (profileInputRef.current.files[0]) {
      formData.append("profileImage", profileInputRef.current.files[0]);
    }
    formData.append("birthday", data.birthday);
    formData.append("resolution", data.resolution);
    formData.append("ADMIN_TOKEN", data.ADMIN_TOKEN);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    mutate(formData);
  };

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
    console.log(file);
  };

  const handleThumbnailImage = () => profileInputRef.current.click();

  return (
    <StyledExtraInfo.Container>
      <StyledExtraInfo.Form onSubmit={handleSubmit(onSubmit)}>
        <StyledExtraInfo.Label htmlFor="name">이름 *</StyledExtraInfo.Label>
        <StyledExtraInfo.Input
          type="text"
          {...register("name", { required: "이름을 입력해주세요." })}
          id="name"
        />
        {errors.name && (
          <StyledExtraInfo.ErrorMessage>
            {errors.name.message}
          </StyledExtraInfo.ErrorMessage>
        )}

        <StyledExtraInfo.Label htmlFor="phoneNumber">
          휴대폰 번호 *
        </StyledExtraInfo.Label>
        <StyledExtraInfo.Input
          type="text"
          {...register("phoneNumber", {
            required: "휴대폰 번호를 입력해주세요",
          })}
          id="phoneNumber"
        />
        {errors.phoneNumber && (
          <StyledExtraInfo.ErrorMessage>
            {errors.phoneNumber.message}
          </StyledExtraInfo.ErrorMessage>
        )}

        <StyledExtraInfo.Label htmlFor="profileImage">
          프로필 사진
        </StyledExtraInfo.Label>

        <StyledExtraInfo.Input
          type="file"
          {...register("profileImage")}
          id="profileImage"
          onChange={handleImageChange}
          style={{ display: "none" }}
          ref={profileInputRef}
          // input type file 을 display none 으로 변경할 것.
        />

        <StyledExtraInfo.Thumbnail
          src={previewImage || DUMMY_PROFILE_IMG_SRC}
          alt="Profile thumbnail"
          onClick={handleThumbnailImage}
        />

        <StyledExtraInfo.Label htmlFor="birthday">생일</StyledExtraInfo.Label>
        <StyledExtraInfo.Input
          type="text"
          {...register("birthday")}
          id="birthday"
        />
        {/* date 형식으로 변경해야함 */}

        <StyledExtraInfo.Label htmlFor="resolution">
          자기소개
        </StyledExtraInfo.Label>
        <StyledExtraInfo.Input
          type="text"
          {...register("resolution")}
          id="resolution"
        />
        {/* testarea를 사용할 지 몇글자 까지 허용할건지 */}
        <StyledExtraInfo.Label htmlFor="ADMIN_TOKEN">
          인증코드
        </StyledExtraInfo.Label>
        <StyledExtraInfo.Input
          type="text"
          {...register("ADMIN_TOKEN")}
          id="ADMIN_TOKEN"
        />

        <StyledExtraInfo.Button type="submit">Submit</StyledExtraInfo.Button>
      </StyledExtraInfo.Form>
    </StyledExtraInfo.Container>
  );
};
export default Teacher;
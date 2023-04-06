import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import StyledExtraInfo from "./styled";
import { SignAPI } from "../../../api/SignAPI";
import ProfileImageUploader from "../../../components/ProfileImageUploader";
import { DUMMY_URL } from "../../../helpers/dummyUrl";

// 사용자가 정보를 다 입력하고 난 뒤에 도메인에 extrainfo 를 치면 이 화면이 보일 수 있으니까
// 그걸 방지하기 위한 로직을 구현해야만 한다.

const Parent = () => {
  const profileInputRef = useRef(null);
  const location = useLocation();
  const { name, profileImageUrl } = location.state?.data ?? {};
  const [isCancelled, setIsCancelled] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  console.log(location);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation(SignAPI.putExtraInfo, {
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("isCancelled", isCancelled);
    // profileInputRef.current.files[0] &&
    //   formData.append("profileImage", profileInputRef.current.files[0]);
    selectedFile && formData.append("profileImage", selectedFile);
    formData.append("relationship", data.relationship);
    formData.append("emergencyPhoneNumber", data.emergencyPhoneNumber);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    const role = location.pathname.split("/")[2];

    mutate({ role: role, info: formData });
  };

  const handleProfileImageCancle = () => {
    setIsCancelled(true);
    setSelectedFile(null);
    setPreviewImage(DUMMY_URL.not_profile_img);
  };

  return (
    <StyledExtraInfo.Container>
      <StyledExtraInfo.Form onSubmit={handleSubmit(onSubmit)}>
        <StyledExtraInfo.Label htmlFor="name">이름 *</StyledExtraInfo.Label>
        <StyledExtraInfo.Input
          type="text"
          {...register("name", { required: "이름을 입력해주세요." })}
          id="name"
          defaultValue={name ?? ""}
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
        <ProfileImageUploader
          {...register("profileImage")}
          id="profileImage"
          ref={profileInputRef}
          prev={profileImageUrl}
          setIsCancelled={setIsCancelled}
          setSelectedFile={setSelectedFile}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        />
        <button type="button" onClick={handleProfileImageCancle}>
          프사취소
        </button>

        <StyledExtraInfo.Label htmlFor="relationship">
          관계
        </StyledExtraInfo.Label>
        <StyledExtraInfo.Input
          type="text"
          {...register("relationship")}
          id="relationship"
        />

        <StyledExtraInfo.Label htmlFor="emergencyPhoneNumber">
          비상연락망
        </StyledExtraInfo.Label>
        <StyledExtraInfo.Input
          type="text"
          {...register("emergencyPhoneNumber")}
          id="emergencyPhoneNumber"
        />

        <StyledExtraInfo.Button type="submit">Submit</StyledExtraInfo.Button>
      </StyledExtraInfo.Form>
    </StyledExtraInfo.Container>
  );
};

export default Parent;

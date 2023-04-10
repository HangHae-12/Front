import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import StyledSignup from "./styled";
import { SignAPI } from "../../../api/SignAPI";
import ProfileImageUploader from "../../../components/ProfileImageUploader";

const Teacher = () => {
  const profileInputRef = useRef(null);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation(SignAPI.signup, {
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
    formData.append("ADMIN_TOKEN", data.ADMIN_TOKEN);
    formData.append("profileImage", profileInputRef.current.files[0] ?? null);
    formData.append("birthday", data.birthday ?? null);
    formData.append("resolution", data.resolution ?? null);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    const role = location.pathname.split("/")[2];

    mutate({ role: role, info: formData });
  };

  return (
    <StyledSignup.Container>
      <StyledSignup.Form onSubmit={handleSubmit(onSubmit)}>
        <StyledSignup.Label htmlFor="name">이름 *</StyledSignup.Label>
        <StyledSignup.Input
          type="text"
          {...register("name", { required: "이름을 입력해주세요." })}
          id="name"
        />
        {errors.name && (
          <StyledSignup.ErrorMessage>
            {errors.name.message}
          </StyledSignup.ErrorMessage>
        )}

        <StyledSignup.Label htmlFor="phoneNumber">
          휴대폰 번호 *
        </StyledSignup.Label>
        <StyledSignup.Input
          type="text"
          {...register("phoneNumber", {
            required: "휴대폰 번호를 입력해주세요",
          })}
          id="phoneNumber"
        />
        {errors.phoneNumber && (
          <StyledSignup.ErrorMessage>
            {errors.phoneNumber.message}
          </StyledSignup.ErrorMessage>
        )}

        <StyledSignup.Label htmlFor="profileImage">
          프로필 사진
        </StyledSignup.Label>
        <ProfileImageUploader
          {...register("profileImage")}
          id="profileImage"
          ref={profileInputRef}
        />

        <StyledSignup.Label htmlFor="birthday">생일</StyledSignup.Label>
        <StyledSignup.Input
          type="text"
          {...register("birthday")}
          id="birthday"
        />
        {/* date 형식으로 변경해야함 */}

        <StyledSignup.Label htmlFor="resolution">
          자기소개
        </StyledSignup.Label>
        <StyledSignup.Input
          type="text"
          {...register("resolution")}
          id="resolution"
        />
        {/* testarea를 사용할 지 몇글자 까지 허용할건지 */}
        <StyledSignup.Label htmlFor="ADMIN_TOKEN">
          인증코드
        </StyledSignup.Label>
        <StyledSignup.Input
          type="text"
          {...register("ADMIN_TOKEN")}
          id="ADMIN_TOKEN"
        />

        <StyledSignup.Button type="submit">Submit</StyledSignup.Button>
      </StyledSignup.Form>
    </StyledSignup.Container>
  );
};
export default Teacher;

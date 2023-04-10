import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import StyledSignup from "./styled";
import { SignAPI } from "../../../api/SignAPI";
import ProfileImageUploader from "../../../components/ProfileImageUploader";
import { useProfileImageUploader } from "../../../hooks/useProfileImageUploader";

// 사용자가 정보를 다 입력하고 난 뒤에 도메인에 extrainfo 를 치면 이 화면이 보일 수 있으니까
// 그걸 방지하기 위한 로직을 구현해야만 한다.

const Parent = () => {
  const location = useLocation();
  const { name, profileImageUrl } = location.state?.data ?? {};

  const { selectedFile, isCancelled } =
    useProfileImageUploader(profileImageUrl);

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
    formData.append("isCancelled", isCancelled);
    selectedFile && formData.append("profileImage", selectedFile);
    formData.append("relationship", data.relationship);
    formData.append("emergencyPhoneNumber", data.emergencyPhoneNumber);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    const role = location.pathname.split("/")[2];

    // mutate({ role: role, info: formData });
  };

  return (
    <StyledSignup.Container>
      <StyledSignup.Form onSubmit={handleSubmit(onSubmit)}>
        <StyledSignup.Label htmlFor="name">이름 *</StyledSignup.Label>
        <StyledSignup.Input
          type="text"
          {...register("name", { required: "이름을 입력해주세요." })}
          id="name"
          defaultValue={name ?? ""}
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
        <ProfileImageUploader pref={profileImageUrl} />

        <StyledSignup.Label htmlFor="relationship">
          관계
        </StyledSignup.Label>
        <StyledSignup.Input
          type="text"
          {...register("relationship")}
          id="relationship"
        />

        <StyledSignup.Label htmlFor="emergencyPhoneNumber">
          비상연락망
        </StyledSignup.Label>
        <StyledSignup.Input
          type="text"
          {...register("emergencyPhoneNumber")}
          id="emergencyPhoneNumber"
        />

        <StyledSignup.Button type="submit">Submit</StyledSignup.Button>
      </StyledSignup.Form>
    </StyledSignup.Container>
  );
};

export default Parent;

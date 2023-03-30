import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import StyledExtraInfo from "./styled";

const Parent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const mutation = useMutation(async (data) => {
    console.log(data);
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

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
        />

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

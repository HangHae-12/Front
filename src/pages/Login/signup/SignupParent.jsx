import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import StyledSignup from "./styled";

const SignupParent = () => {
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
        <StyledSignup.Input
          type="file"
          {...register("profileImage")}
          id="profileImage"
        />

        <StyledSignup.Label htmlFor="relationship">관계</StyledSignup.Label>
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

export default SignupParent;

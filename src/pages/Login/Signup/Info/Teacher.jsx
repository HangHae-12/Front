import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import StyledInfo from "./styled";
import StyledLogin from "../../styled";
import { SignAPI } from "../../../../api/SignAPI";
import Buttons from "../../../../components/Buttons";
import ProfileImageUploader from "../../../../components/ProfileImageUploader";
import { useProfileImageUploader } from "../../../../hooks/useProfileImageUploader";
import { REGEXP } from "../../../../helpers/regexp";
import session from "../../../../utils/session";
import AlertModal from "../../../../components/Modals/AlertModal";
import useModal from "../../../../hooks/useModal";

const Teacher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { name, profileImageUrl } = session.get("user");

  const { selectedFile, isCancelled } =
    useProfileImageUploader(profileImageUrl);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const { mutate } = useMutation(SignAPI.signup, {
    onSuccess: (res) => {
      if (res.data.StatusCode === 200) {
        session.set("user", res.data.data);
        navigate("/signup/success");
      }
    },
    onError: (error) => {
      openModal({ contents: <AlertModal /> });
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("birthday", data.birthday);
    formData.append("isCancelled", isCancelled);
    selectedFile && formData.append("profileImage", selectedFile);
    formData.append("email", data.email ?? null);
    formData.append("resolution", data.resolution ?? null);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    const role = location.pathname.split("/")[2];
    mutate({ role: role, info: formData });
  };

  return (
    <StyledInfo.Container>
      <StyledLogin.Title>선생님! 정보를 입력해주세요</StyledLogin.Title>
      <StyledInfo.Form onSubmit={handleSubmit(onSubmit)}>
        <StyledInfo.Wrapper>
          <ProfileImageUploader prev={profileImageUrl} />
          <StyledInfo.Box>
            <StyledInfo.ContentsWrapper>
              <StyledLogin.Label htmlFor="name" isEssential>
                이름
              </StyledLogin.Label>
              <StyledLogin.Input
                placeholder="홍길동"
                type="text"
                {...register("name", {
                  required: "이름을 입력해주세요.",
                  pattern: {
                    value: REGEXP.name,
                    message: "유효하지 않은 이름입니다.",
                  },
                })}
                id="name"
                defaultValue={name ?? ""}
                valid={errors.name}
                size={4}
              />
              {!isSubmitSuccessful && errors.name && (
                <StyledInfo.ErrorMessage>
                  {errors.name.message}
                </StyledInfo.ErrorMessage>
              )}
            </StyledInfo.ContentsWrapper>
            <StyledInfo.ContentsWrapper>
              <StyledLogin.Label htmlFor="phoneNumber" isEssential>
                연락처
              </StyledLogin.Label>
              <StyledLogin.Input
                placeholder="010-0000-0000"
                type="text"
                {...register("phoneNumber", {
                  required: "연락처를 입력해주세요",
                  pattern: {
                    value: REGEXP.phone,
                    message: "전화번호를 정확하게 입력해 주세요.",
                  },
                })}
                id="phoneNumber"
                valid={errors.phoneNumber}
                size={12}
              />
              {!isSubmitSuccessful && errors.phoneNumber && (
                <StyledInfo.ErrorMessage>
                  {errors.phoneNumber.message}
                </StyledInfo.ErrorMessage>
              )}
            </StyledInfo.ContentsWrapper>
            <StyledInfo.ContentsWrapper>
              <StyledLogin.Label htmlFor="birthday" isEssential>
                생년월일
              </StyledLogin.Label>
              <StyledLogin.Input
                type="date"
                {...register("birthday", {
                  required: "생년월일을 입력해주세요",
                })}
                id="birthday"
                valid={errors.birthday}
                size={12}
              />
              {!isSubmitSuccessful && errors.birthday && (
                <StyledInfo.ErrorMessage>
                  {errors.birthday.message}
                </StyledInfo.ErrorMessage>
              )}
            </StyledInfo.ContentsWrapper>
            <StyledInfo.ContentsWrapper>
              <StyledLogin.Label htmlFor="email">메일주소</StyledLogin.Label>
              <StyledLogin.Input
                placeholder="kindergrew@gmail.com"
                type="text"
                {...register("email", {
                  pattern: {
                    value: REGEXP.email,
                    message: "유효한 이메일 주소를 입력해 주세요",
                  },
                })}
                id="email"
                valid={errors.email}
                size={20}
              />
              {!isSubmitSuccessful && errors.email && (
                <StyledInfo.ErrorMessage>
                  {errors.email.message}
                </StyledInfo.ErrorMessage>
              )}
            </StyledInfo.ContentsWrapper>
            <StyledInfo.ContentsWrapper>
              <StyledLogin.Label htmlFor="resolution">한마디</StyledLogin.Label>
              <StyledLogin.Input
                type="text"
                maxLength="28"
                {...register("resolution", {
                  maxLength: {
                    value: 28,
                    message: "28자 이내로 작성해주세요",
                  },
                })}
                id="resolution"
                valid={errors.resolution}
                size={35}
              />
              {!isSubmitSuccessful && errors.resolution && (
                <StyledInfo.ErrorMessage>
                  {errors.resolution.message}
                </StyledInfo.ErrorMessage>
              )}
            </StyledInfo.ContentsWrapper>
          </StyledInfo.Box>
        </StyledInfo.Wrapper>
        <StyledInfo.SubmitBtnWrapper>
          <Buttons.Filter colorTypes="primary" type="submit">
            작성완료
          </Buttons.Filter>
        </StyledInfo.SubmitBtnWrapper>
      </StyledInfo.Form>
    </StyledInfo.Container>
  );
};

export default Teacher;

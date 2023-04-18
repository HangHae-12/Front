import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import StyledUser from "./styled";
import StyledLogin from "../styled";
import SignAPI from "../../../api/SignAPI";
import session from "../../../utils/session";
import formatPhoneNumber from "../../../utils/formatPhoneNumber";
import Buttons from "../../../components/Buttons";
import ProfileImageUploader from "../../../components/ProfileImageUploader";
import AlertModal from "../../../components/Modals/AlertModal";
import useModal from "../../../hooks/useModal";
import { useProfileImageUploader } from "../../../hooks/useProfileImageUploader";

import {
  NameInputField,
  PhoneNumberInputField,
  BirthInputField,
  EmailInputField,
} from "./InputFields";

const Principal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, profileImageUrl } = session.get("user");
  const { openModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const { selectedFile, isCancelled } = useProfileImageUploader(
    "Principal",
    profileImageUrl
  );

  const { mutate } = useMutation(SignAPI.signup, {
    onSuccess: (res) => {
      if (res.data.StatusCode === 200) {
        session.set("user", res.data.data);
        navigate("/signup/registration");
      }
    },
    onError: (error) => {
      openModal({
        contents: (
          <AlertModal
            title="회원가입에 실패하였습니다"
            message="연락처가 중복이거나 잘못된 생년월일일 수 있습니다. 확인하고 다시 요청해주세요."
          />
        ),
      });
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

    const role = location.pathname.split("/")[2];

    mutate({ role: role, info: formData });
  };

  return (
    <StyledUser.Container>
      <StyledLogin.Title>원장선생님! 정보를 입력해주세요</StyledLogin.Title>
      <StyledUser.Form onSubmit={handleSubmit(onSubmit)}>
        <StyledUser.Wrapper>
          <ProfileImageUploader id="Principal" prev={profileImageUrl} />
          <StyledUser.Box>
            <NameInputField
              register={register}
              errors={errors}
              defaultValue={name}
              isSubmitSuccessful={isSubmitSuccessful}
            />

            <PhoneNumberInputField
              register={register}
              errors={errors}
              onInput={(e) => formatPhoneNumber(e)}
              isSubmitSuccessful={isSubmitSuccessful}
            />

            <BirthInputField
              register={register}
              errors={errors}
              isSubmitSuccessful={isSubmitSuccessful}
            />

            <EmailInputField
              register={register}
              errors={errors}
              isSubmitSuccessful={isSubmitSuccessful}
            />
          </StyledUser.Box>
        </StyledUser.Wrapper>
        <StyledUser.SubmitBtnWrapper>
          <Buttons.Filter colorTypes="primary" type="submit">
            작성완료
          </Buttons.Filter>
        </StyledUser.SubmitBtnWrapper>
      </StyledUser.Form>
    </StyledUser.Container>
  );
};

export default Principal;

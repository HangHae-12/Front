import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import StyledInfo from "./styled";
import StyledLogin from "../../styled";
import { SignAPI } from "../../../../api/SignAPI";
import Buttons from "../../../../components/Buttons";
import ProfileImageUploader from "../../../../components/ProfileImageUploader";
import { useProfileImageUploader } from "../../../../hooks/useProfileImageUploader";
import session from "../../../../utils/session";
import useModal from "../../../../hooks/useModal";
import AlertModal from "../../../../components/Modals/AlertModal";
import formatPhoneNumber from "../../../../utils/formatPhoneNumber";
import EmergencyPhoneNumberInputField from "./EmergencyPhoneNumberInputField";
import PhoneNumberInputField from "./PhoneNumberInputField";
import NameInputField from "./NameInputField";

const Parent = () => {
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
    "Parent",
    profileImageUrl
  );

  const { mutate } = useMutation(SignAPI.signup, {
    onSuccess: (res) => {
      if (res.data.statusCode === 200) {
        session.set("user", res.data.data);
        navigate("/signup/success");
      }
    },
    onError: (error) => {
      openModal({
        contents: (
          <AlertModal
            title="회원가입에 실패하였습니다."
            message="연락처가 중복이거나 잘못된 요청입니다. 확인하고 다시 요청해주세요. "
          />
        ),
      });
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("isCancelled", isCancelled);
    selectedFile && formData.append("profileImage", selectedFile);
    formData.append("emergencyPhoneNumber", data.emergencyPhoneNumber);

    const role = location.pathname.split("/")[2];
    mutate({ role: role, info: formData });
  };

  return (
    <>
      <StyledInfo.Container>
        <StyledLogin.Title>학부모님! 정보를 입력해주세요</StyledLogin.Title>
        <StyledInfo.Form onSubmit={handleSubmit(onSubmit)}>
          <StyledInfo.Wrapper>
            <ProfileImageUploader id="Parent" prev={profileImageUrl} />
            <StyledInfo.Box>
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
              <EmergencyPhoneNumberInputField
                register={register}
                errors={errors}
                onInput={(e) => formatPhoneNumber(e)}
                isSubmitSuccessful={isSubmitSuccessful}
              />
            </StyledInfo.Box>
          </StyledInfo.Wrapper>
          <StyledInfo.SubmitBtnWrapper>
            <Buttons.Filter colorTypes="primary" type="submit">
              작성완료
            </Buttons.Filter>
          </StyledInfo.SubmitBtnWrapper>
        </StyledInfo.Form>
      </StyledInfo.Container>
    </>
  );
};

export default Parent;

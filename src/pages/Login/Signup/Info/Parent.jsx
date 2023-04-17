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
import useModal from "../../../../hooks/useModal";
import AlertModal from "../../../../components/Modals/AlertModal";
import formatPhoneNumber from "../../../../utils/formatPhoneNumber";
import InputField from "./InputField";

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
              <InputField
                label="이름"
                id="name"
                isEssential
                placeholder="홍길동"
                type="text"
                registerOptions={{
                  ...register("name", {
                    required: "이름을 입력해주세요.",
                    pattern: {
                      value: REGEXP.name,
                      message:
                        "이름을 정확하게 입력해주세요. 한글 또는 영문 2~15자 이내만 가능합니다.",
                    },
                  }),
                }}
                defaultValue={name ?? ""}
                valid={errors.name}
                size={4}
                errors={errors.name}
                isSubmitSuccessful={isSubmitSuccessful}
              />

              <InputField
                label="연락처"
                id="phoneNumber"
                isEssential
                placeholder="010-0000-0000"
                type="text"
                registerOptions={{
                  ...register("phoneNumber", {
                    required: "연락처를 입력해주세요.",
                    pattern: {
                      value: REGEXP.phone,
                      message:
                        "전화번호를 정확하게 입력해 주세요. (ex: 010-000-0000 or 02-000-0000)",
                    },
                  }),
                }}
                valid={errors.phoneNumber}
                size={12}
                onInput={(e) => formatPhoneNumber(e)}
                errors={errors.phoneNumber}
                isSubmitSuccessful={isSubmitSuccessful}
              />
              <InputField
                label="비상연락처"
                id="emergencyPhoneNumber"
                placeholder="010-0000-0000"
                type="text"
                registerOptions={{
                  ...register("emergencyPhoneNumber", {
                    pattern: {
                      value: REGEXP.phone,
                      message:
                        "전화번호를 정확하게 입력해 주세요. (ex: 010-000-0000 or 02-000-0000)",
                    },
                  }),
                }}
                valid={errors.emergencyPhoneNumber}
                size={12}
                onInput={(e) => formatPhoneNumber(e)}
                errors={errors.emergencyPhoneNumber}
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

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import StyledSignup from "./styled";
import { SignAPI } from "../../../api/SignAPI";
import ProfileImageUploader from "../../../components/ProfileImageUploader";
import { useProfileImageUploader } from "../../../hooks/useProfileImageUploader";
import styled from "styled-components";
import { REGEXP } from "../../../helpers/regexp";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import StyledLogin from "../styled";
import Buttons from "../../../components/Buttons";

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
    formState: { errors, touchedFields },
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
    formData.append("emergencyPhoneNumber", data.emergencyPhoneNumber);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    const role = location.pathname.split("/")[2];

    // mutate({ role: role, info: formData });
  };

  return (
    <StyledParentPage.Container>
      <StyledLogin.Title>학부모님! 정보를 입력해주세요</StyledLogin.Title>
      <StyledSignup.Form onSubmit={handleSubmit(onSubmit)}>
        <StyledParentPage.Wrapper>
          <ProfileImageUploader prev={profileImageUrl} />
          <StyledParentPage.Box>
            <StyledParentPage.ContentsWrapper>
              <StyledLogin.Label htmlFor="name" isEssential>
                이름
              </StyledLogin.Label>
              <StyledLogin.Input
                placeholder="홍길동"
                type="text"
                {...register("name", { required: "이름을 입력해주세요." })}
                id="name"
                defaultValue={name ?? ""}
                valid={errors.name}
                size={4}
              />
              {errors.name && (
                <StyledSignup.ErrorMessage>
                  {errors.name.message}
                </StyledSignup.ErrorMessage>
              )}
            </StyledParentPage.ContentsWrapper>
            <StyledParentPage.ContentsWrapper>
              <StyledLogin.Label htmlFor="phoneNumber" isEssential>
                연락처
              </StyledLogin.Label>
              <StyledLogin.Input
                placeholder="010-0000-0000"
                type="text"
                {...register("phoneNumber", {
                  required: "휴대폰 번호를 입력해주세요",
                })}
                id="phoneNumber"
                valid={errors.name}
                size={12}
              />
              {errors.phoneNumber && (
                <StyledSignup.ErrorMessage>
                  {errors.phoneNumber.message}
                </StyledSignup.ErrorMessage>
              )}
            </StyledParentPage.ContentsWrapper>
            <StyledParentPage.ContentsWrapper>
              <StyledLogin.Label htmlFor="emergencyPhoneNumber">
                비상연락처
              </StyledLogin.Label>
              <StyledLogin.Input
                placeholder="010-0000-0000"
                type="text"
                {...register("emergencyPhoneNumber")}
                id="emergencyPhoneNumber"
                valid={errors.name}
                size={12}
              />
            </StyledParentPage.ContentsWrapper>
          </StyledParentPage.Box>
        </StyledParentPage.Wrapper>
        <StyledParentPage.SubmitBtnWrapper>
          <Buttons.Filter colorTypes="primary" type="submit">
            작성완료
          </Buttons.Filter>
        </StyledParentPage.SubmitBtnWrapper>
      </StyledSignup.Form>
    </StyledParentPage.Container>
  );
};

export default Parent;

const StyledParentPage = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 60px 140px;
  `,

  Wrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 50px;
    margin-top: 50px;
  `,

  Box: styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 16px;
  `,

  ContentsWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  SubmitBtnWrapper: styled.div`
    width: 100%;
    margin-top: 95px;
    text-align: right;
  `,
};

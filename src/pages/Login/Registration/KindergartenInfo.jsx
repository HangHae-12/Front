import { useRegistrationForm } from ".";
import {
  KinderNameInputField,
  ContactNumberInputField,
} from "../User/InputFields";
import formatPhoneNumber from "../../../utils/formatPhoneNumber";
import styled, { css } from "styled-components";
import AddressInputField from "../User/InputFields/AddressInputField";
import ProfileImageUploader from "../../../components/ProfileImageUploader";

const KindergartenInfo = () => {
  const { register, errors, isSubmitSuccessful, setValue } =
    useRegistrationForm();

  const imgStyle = css`
    width: 240px;
    height: 240px;
    border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
    border-radius: 8px;
  `;
  return (
    <StyledKindergartenInfo.Container>
      <ProfileImageUploader id="logoImage" imgStyleProps={imgStyle} />
      <KinderNameInputField
        register={register}
        errors={errors}
        size="8"
        placeholder="세빛 유치원"
        isSubmitSuccessful={isSubmitSuccessful}
      />
      <ContactNumberInputField
        register={register}
        errors={errors}
        onInput={(e) => formatPhoneNumber(e)}
        isSubmitSuccessful={isSubmitSuccessful}
      />
      <AddressInputField register={register} setValue={setValue} />
    </StyledKindergartenInfo.Container>
  );
};

export default KindergartenInfo;

const StyledKindergartenInfo = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid black;
  `,
};

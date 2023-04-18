import { useRegistrationForm } from ".";
import formatPhoneNumber from "../../../utils/formatPhoneNumber";
import { PhoneNumberInputField } from "../User/InputFields";

const ClassRegistration = () => {
  const { register, errors, isSubmitSuccessful } = useRegistrationForm();

  return (
    <PhoneNumberInputField
      register={register}
      errors={errors}
      onInput={(e) => formatPhoneNumber(e)}
      isSubmitSuccessful={isSubmitSuccessful}
    />
  );
};
export default ClassRegistration;

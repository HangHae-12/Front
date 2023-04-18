import { useRegistrationForm } from ".";
import { NameInputField } from "../User/InputFields";

const KindergartenInfo = () => {
  const { register, errors, isSubmitSuccessful } = useRegistrationForm();
  return (
    <NameInputField
      register={register}
      errors={errors}
      defaultValue={""}
      isSubmitSuccessful={isSubmitSuccessful}
    />
  );
};

export default KindergartenInfo;

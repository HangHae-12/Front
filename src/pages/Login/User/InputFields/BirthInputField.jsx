import InputField from "./InputField";

const BirthInputField = ({ register, errors, isSubmitSuccessful }) => {
  return (
    <InputField
      label="생년월일"
      id="birthday"
      isEssential
      type="date"
      registerOptions={{
        ...register("birthday", {
          required: "생년월일을 입력해주세요",
        }),
      }}
      valid={errors.birthday}
      size={12}
      errors={errors.birthday}
      isSubmitSuccessful={isSubmitSuccessful}
    />
  );
};

export default BirthInputField;

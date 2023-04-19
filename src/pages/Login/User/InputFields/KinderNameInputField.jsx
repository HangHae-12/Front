import InputField from "./InputField";

const KinderNameInputField = ({ register, errors, isSubmitSuccessful }) => {
  return (
    <InputField
      label="유치원 이름"
      id="kindergartenName"
      isEssential
      placeholder="세빛 유치원"
      type="text"
      registerOptions={{
        ...register("kindergartenName", {
          required: "유치원 이름을 입력해주세요.",
        }),
      }}
      valid={errors.kindergartenName}
      size={8}
      errors={errors.kindergartenName}
      isSubmitSuccessful={isSubmitSuccessful}
    />
  );
};

export default KinderNameInputField;

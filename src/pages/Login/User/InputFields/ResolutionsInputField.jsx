import InputField from "./InputField";

const ResolutionsInputField = ({ register, errors, isSubmitSuccessful }) => {
  return (
    <InputField
      label="한마디"
      id="resolution"
      placeholder="열심히 하겠습니다!"
      type="text"
      registerOptions={{
        ...register("resolution", {
          maxLength: {
            value: 28,
            message: "28자 이내로 작성해주세요",
          },
        }),
      }}
      valid={errors.resolution}
      size={35}
      errors={errors.resolution}
      isSubmitSuccessful={isSubmitSuccessful}
    />
  );
};

export default ResolutionsInputField;

import { REGEXP } from "../../../../helpers/regexp";
import InputField from "./InputField";

const NameInputField = ({
  register,
  defaultValue,
  errors,
  isSubmitSuccessful,
}) => {
  return (
    <InputField
      label="이름"
      id="name"
      isEssential
      placeholder={"홍길동"}
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
      defaultValue={defaultValue ?? ""}
      valid={errors.name}
      size={4}
      errors={errors.name}
      isSubmitSuccessful={isSubmitSuccessful}
    />
  );
};

export default NameInputField;

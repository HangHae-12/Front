import { REGEXP } from "../../../../helpers/regexp";
import InputField from "./InputField";

const PhoneNumberInputField = ({
  register,
  errors,
  onInput,
  isSubmitSuccessful,
}) => {
  return (
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
      onInput={onInput}
      errors={errors.phoneNumber}
      isSubmitSuccessful={isSubmitSuccessful}
    />
  );
};

export default PhoneNumberInputField;

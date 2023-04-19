import { REGEXP } from "../../../../helpers/regexp";
import InputField from "./InputField";

const ContactNumberInputField = ({
  register,
  errors,
  onInput,
  isSubmitSuccessful,
}) => {
  return (
    <InputField
      label="유치원 연락처"
      id="contactNumber"
      isEssential
      placeholder="010-0000-0000"
      type="text"
      registerOptions={{
        ...register("contactNumber", {
          required: "유치원 연락처를 입력해주세요.",
          pattern: {
            value: REGEXP.phone,
            message:
              "전화번호를 정확하게 입력해 주세요. (ex: 010-000-0000 or 02-000-0000)",
          },
        }),
      }}
      valid={errors.contactNumber}
      size={12}
      onInput={onInput}
      errors={errors.contactNumber}
      isSubmitSuccessful={isSubmitSuccessful}
    />
  );
};

export default ContactNumberInputField;

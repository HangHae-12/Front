import { REGEXP } from "../../../../helpers/regexp";
import InputField from "./InputField";

const EmergencyPhoneNumberInputField = ({
  register,
  errors,
  onInput,
  isSubmitSuccessful,
}) => {
  return (
    <InputField
      label="비상연락처"
      id="emergencyPhoneNumber"
      placeholder="010-0000-0000"
      type="text"
      registerOptions={{
        ...register("emergencyPhoneNumber", {
          pattern: {
            value: REGEXP.phone,
            message:
              "전화번호를 정확하게 입력해 주세요. (ex: 010-000-0000 or 02-000-0000)",
          },
        }),
      }}
      valid={errors.emergencyPhoneNumber}
      size={12}
      onInput={onInput}
      errors={errors.emergencyPhoneNumber}
      isSubmitSuccessful={isSubmitSuccessful}
    />
  );
};

export default EmergencyPhoneNumberInputField;

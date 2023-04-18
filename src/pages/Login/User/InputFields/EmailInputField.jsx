import { REGEXP } from "../../../../helpers/regexp";
import InputField from "./InputField";

const EmailInputField = ({ register, errors, isSubmitSuccessful }) => {
  return (
    <InputField
      label="메일주소"
      id="email"
      placeholder="kindergrew@gmail.com"
      type="text"
      registerOptions={{
        ...register("email", {
          pattern: {
            value: REGEXP.email,
            message: "유효한 이메일 주소를 입력해 주세요",
          },
        }),
      }}
      valid={errors.email}
      size={20}
      errors={errors.email}
      isSubmitSuccessful={isSubmitSuccessful}
    />
  );
};

export default EmailInputField;

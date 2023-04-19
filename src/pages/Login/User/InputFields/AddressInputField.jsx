import { useDaumPostcodePopup } from "react-daum-postcode";
import Buttons from "../../../../components/Buttons";
import StyledUser from "../styled";
import { useState } from "react";
import InputField from "./InputField";
import StyledLogin from "../../styled";
import styled from "styled-components";

const AddressInputField = ({
  register,
  errors,
  setValue,
  isSubmitSuccessful,
}) => {
  const [address, setAddress] = useState("");
  const open = useDaumPostcodePopup(
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress);
    setValue("address", fullAddress);
  };

  const handleAdressSearch = () => {
    open({ onComplete: handleComplete });
  };
  
  return (
    <StyledAddressInputField.Container>
      <StyledLogin.Label htmlFor={"address"} isEssential>
        유치원 주소
      </StyledLogin.Label>
      <StyledAddressInputField.Wrapper>
        <StyledAddressInputField.AddressInputWrapper>
          <StyledAddressInputField.Input
            placeholder="주소를 입력해주세요"
            type="text"
            value={address}
            {...register("address", {
              required: "주소를 검색하여 입력해주세요.",
            })}
            id={"address"}
            valid={errors.address}
            readOnly
          />
          {!isSubmitSuccessful && errors.address && (
            <StyledUser.ErrorMessage>
              {errors.address.message}
            </StyledUser.ErrorMessage>
          )}
        </StyledAddressInputField.AddressInputWrapper>
        <Buttons.Filter type="button" outlined onClick={handleAdressSearch}>
          주소 입력
        </Buttons.Filter>
      </StyledAddressInputField.Wrapper>

      <StyledLogin.Input
        id="restAddress"
        placeholder="상세 주소를 입력해주세요."
        {...register("restAddress")}
      />
    </StyledAddressInputField.Container>
  );
};

export default AddressInputField;

const StyledAddressInputField = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 7px;
  `,

  Wrapper: styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
  `,

  AddressInputWrapper: styled.div`
    position: relative;
    display: flex;
    flex: 1;
  `,

  Input: styled(StyledLogin.Input)`
    width: 100%;
  `,
};

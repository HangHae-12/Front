import { useDaumPostcodePopup } from "react-daum-postcode";
import Buttons from "../../../../components/Buttons";
import StyledUser from "../styled";
import StyledLogin from "../../styled";
import { useState } from "react";
import styled from "styled-components";

const AddressInputField = ({ register, setValue }) => {
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
    <StyledUser.ContentsWrapper>
      <StyledLogin.Label htmlFor="address" isEssential>
        유치원 주소
      </StyledLogin.Label>
      <StyledAddressInputFieldInput
        id="address"
        value={address}
        {...register("address")}
        readOnly
      />
      <StyledAddressInputFieldInput
        id="restAddress"
        {...register("restAddress")}
      />
      <Buttons.Filter type="button" outlined onClick={handleAdressSearch}>
        주소 입력
      </Buttons.Filter>
    </StyledUser.ContentsWrapper>
  );
};

export default AddressInputField;

const StyledAddressInputFieldInput = styled.input``;

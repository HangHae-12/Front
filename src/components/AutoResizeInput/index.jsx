import { useEffect, useRef } from "react";
import StyledInputLabel from "./styled";

const AutoResizeInput = ({ styleOption, defaultValue, readOnly }) => {
  const inputLabelRef = useRef(null);

  const handleInput = (event) => {
    inputLabelRef.current.dataset.value = event.target.value;
  };

  useEffect(() => {
    if (defaultValue) {
      inputLabelRef.current.dataset.value = defaultValue;
    }
  }, [defaultValue]);

  return (
    <StyledInputLabel ref={inputLabelRef} styleOption={styleOption}>
      <input
        type="text"
        onInput={handleInput}
        size="1"
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
    </StyledInputLabel>
  );
};

export default AutoResizeInput;

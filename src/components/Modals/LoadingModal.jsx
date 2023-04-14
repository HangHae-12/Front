import React from "react";
import styled from "styled-components";
import { BeatLoader } from "react-spinners";

const LoadingModal = ({ loading }) => {
    return (
        <LoadingBackground>
            <BeatLoader color="#36d7b7" loading={loading} size={15} speedMultiplier={1} margin={2} />
        </LoadingBackground>
    );
}

export default LoadingModal;

const LoadingBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

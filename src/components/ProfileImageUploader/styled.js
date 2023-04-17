import styled from "styled-components";
import { FiX } from "react-icons/fi";
import Buttons from "../Buttons";
import textVariants from "../../styles/variants/textVariants";

const StyledProfileImageUploader = {
  Container: styled.aside`
    display: flex;
    width: min-content;
    flex-direction: column;
    align-items: center;
    gap: 22px;
  `,

  Input: styled.input`
    display: none;
  `,
  Thumbnail: styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    cursor: default;
  `,

  ThumbnailWrapper: styled.div`
    position: relative;
    display: inline-block;
    width: min-content;
    height: auto;
    cursor: pointer;
    &:hover .cancelIcon {
      display: block;
    }
  `,

  CancelButton: styled(FiX)`
    display: none;
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    color: white;
  `,

  ChangeButton: styled(Buttons.AB)`
    ${textVariants.Body2_SemiBold}
    width: min-content;
    height: 32px;
    padding: 0px 5px;
    border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  `,
};

export default StyledProfileImageUploader;

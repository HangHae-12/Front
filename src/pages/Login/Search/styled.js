import styled from "styled-components";
import textVariants from "../../../styles/variants/textVariants";

const StyledSearch = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 120px;
  `,

  KinderListSearch: styled.div`
    width: 100%;
    height: 100%;
    padding: 12px 20px;
    margin-top: 24px;
    background: ${({ theme }) => theme.color.grayScale[50]};
    border-radius: 8px;
    overflow-y: hidden;
  `,

  SearchBarWrapper: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 12px;
    margin-bottom: 24px;
  `,

  SelectedKinderWrapper: styled.div`
    ${textVariants.Body1_SemiBold}
    display: flex;
    height: 74px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    flex: 1;
    background: ${({ theme }) => theme.color.grayScale[200]};
    color: ${({ theme }) => theme.color.white};
  `,
  SearchContentsWrapper: styled.div`
    display: grid;
    height: 100%;
    padding-top: 12px;
    border-top: 1px solid ${({ theme }) => theme.color.grayScale[200]};
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: min-content;
    grid-gap: 4px 12px;
    overflow-y: scroll;
  `,
  SubmitBtnBox: styled.div`
    width: 100%;
    margin-top: 12px;
    text-align: end;
  `,
};

export default StyledSearch;

import styled from "styled-components";

const StyledInfo = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 60px 140px;
  `,

  Wrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 50px;
    margin-top: 50px;
  `,

  Form: styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,

  Box: styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 16px;
  `,

  ContentsWrapper: styled.div`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
  `,

  ErrorMessage: styled.span`
    position: absolute;
    bottom: 0;
    right: 0;
    color: ${({ theme }) => theme.color.red};
    transform: translateY(100%);
    font-size: 3px;
  `,

  SubmitBtnWrapper: styled.div`
    width: 100%;
    margin-top: 50px;
    text-align: right;
  `,
};

export default StyledInfo;
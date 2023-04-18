import styled from "styled-components";
import Buttons from "../../../components/Buttons";

const StyledSignup = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 80px 200px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }
  `,
  ProfileWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,

  TitleWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,

  LinkWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    h3 {
      text-align: end;
    }
  `,

  BtnBox: styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin-top: 36px;
  `,

  Btn: styled(Buttons.NB)`
    border-radius: 8px;
    width: min-content;
  `,
};

export default StyledSignup;

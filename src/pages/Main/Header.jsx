import { ENV } from "../../helpers/envs";
import ASSETS from "../../helpers/assets";
import styled from 'styled-components';

const Header = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${ENV.kakao_key}&redirect_uri=${ENV.kakao_redirect}&response_type=code&scope=profile_nickname,profile_image,friends,talk_message`;
  return (
    <>
      <StyledLogo bg={ASSETS.test2}>
      </StyledLogo>
      <StyledHeaderBtn>
        <a href={KAKAO_AUTH_URL}>
          <img src={ASSETS.kakaologin_btn} alt="카카오_로그인_버튼" />
        </a>
      </StyledHeaderBtn>
    </>

  );
};

export default Header;

const StyledLogo = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top:20px;
  width: 250px;
  height: 130px;
  background: url(${props => props.bg}) no-repeat center center/contain;
  flex: 0 0 auto;
`;

const StyledHeaderBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: auto;
    width: 100%;
    padding-right: 20px;
  
`;


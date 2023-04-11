import styled from "styled-components";
import StyledLogin from "../styled";
import textVariants from "../../../styles/variants/textVariants";
import SearchInput from "../../../components/SearchInput";
import useSearch from "../../../hooks/useSearch";
import { SignAPI } from "../../../api/SignAPI";

const Search = () => {
  const { data, isLoading, handleSearch } = useSearch(SignAPI.search);
  
  return (
    <StyledSearch.Container>
      <StyledLogin.Title>가입하시려는 유치원을 선택해주세요</StyledLogin.Title>
      <StyledSearch.KinderListSearch>
        <StyledSearch.SearchBarWrapper>
          <h3>유치원 리스트</h3>
          <SearchInput onSearch={handleSearch} />
        </StyledSearch.SearchBarWrapper>
      </StyledSearch.KinderListSearch>
    </StyledSearch.Container>
  );
};

export default Search;

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
    padding: 20px 12px;
    margin-top: 24px;
    background: ${({ theme }) => theme.color.grayScale[50]};
    border-radius: 8px;
  `,

  SearchBarWrapper: styled.div`
    h3 {
      ${textVariants.Body1_Bold}
      color: ${({ theme }) => theme.color.grayScale[600]}
    }
  `,
};

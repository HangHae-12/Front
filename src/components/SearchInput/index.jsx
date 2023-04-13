import StyledSearchInput from "./styled";

const SearchInput = ({ onSearch, inputBodyStyle }) => {
  return (
    <StyledSearchInput.Wrapper inputBodyStyle={inputBodyStyle}>
      <StyledSearchInput.SearchIcon />
      <StyledSearchInput.Input
        type="search"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="킨더그루 유치원"
      />
    </StyledSearchInput.Wrapper>
  );
};

export default SearchInput;

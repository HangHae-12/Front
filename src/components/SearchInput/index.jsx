import styled from "styled-components";
import { GoSearch } from "react-icons/go";

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 4px;
  padding: 3px 8px;
  background: ${({ theme }) => theme.color.white};

  &:hover {
    border-color: ${({ theme }) => theme.color.grayScale[200]};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.color.green_darker};
    box-shadow: 0 0 0 5px ${({ theme }) => theme.color.green_darker};
  }

  ${({ inputBodyStyle }) => inputBodyStyle}
`;

const SearchIcon = styled(GoSearch)`
  font-size: 18px;
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-right: 8px;
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: inherit;

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
`;

const SearchInput = ({ onSearch, inputBodyStyle }) => {
  return (
    <SearchWrapper inputBodyStyle={inputBodyStyle}>
      <SearchIcon />
      <Input
        type="search"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="킨더그루 유치원"
      />
    </SearchWrapper>
  );
};

export default SearchInput;

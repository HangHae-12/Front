import { useState } from "react";
import styled, { css } from "styled-components";
import StyledLogin from "../../styled";
import SearchInput from "../../../../components/SearchInput";
import useSearch from "../../../../hooks/useSearch";
import { SignAPI } from "../../../../api/SignAPI";
import textVariants from "../../../../styles/variants/textVariants";
import SearchContent from "./SearchContent";
import Buttons from "../../../../components/Buttons";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import session from "../../../../utils/session";

const Search = () => {
  const { data, handleSearch } = useSearch(SignAPI.search);

  const [selectedKinder, setSelectedKinder] = useState(null);
  const navigate = useNavigate();

  const style = css`
    flex: 1;
    align-self: flex-end;
  `;

  const { mutate } = useMutation(SignAPI.selectKinder, {
    onSuccess: ({ statusCode }) => {
      if (statusCode === 200) {
        const role = session.get("user").role;
        navigate(`/signup/${role}`);
      }
    },
    onError: (error) => {
      console.log(error.response.status);
    },
  });

  const handleSelectKinder = (data) => {
    setSelectedKinder(data);
  };

  const handleSelectKinderSubmit = () => {
    selectedKinder && mutate(selectedKinder.id);
  };

  return (
    <StyledSearch.Container>
      <StyledLogin.Title>가입하시려는 유치원을 선택해주세요</StyledLogin.Title>
      <StyledSearch.KinderListSearch>
        <StyledSearch.SearchBarWrapper>
          <StyledSearch.SelectedKinderWrapper>
            {selectedKinder ? (
              <SearchContent data={selectedKinder} />
            ) : (
              "유치원을 선택 해주세요"
            )}
          </StyledSearch.SelectedKinderWrapper>
          <SearchInput onSearch={handleSearch} inputBodyStyle={style} />
        </StyledSearch.SearchBarWrapper>
        <StyledSearch.SearchContentsWrapper>
          {/* {data?.map((data) => (
            <SearchContent
              key={data.id}
              data={data}
              handleSelectKinder={handleSelectKinder}
            />
          ))} */}
        </StyledSearch.SearchContentsWrapper>
      </StyledSearch.KinderListSearch>
      <StyledSearch.SubmitBtnBox>
        <Buttons.Filter
          disabled={!selectedKinder}
          colorTypes="primary"
          onClick={handleSelectKinderSubmit}
        >
          다음
        </Buttons.Filter>
      </StyledSearch.SubmitBtnBox>
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

import { useState } from "react";
import styled, { css } from "styled-components";
import StyledLogin from "../../styled";
import SearchInput from "../../../../components/SearchInput";
import useSearch from "../../../../hooks/useSearch";
import { SignAPI } from "../../../../api/SignAPI";
import textVariants from "../../../../styles/variants/textVariants";

const Search = () => {
  // const { data, isLoading, handleSearch } = useSearch(SignAPI.search);
  const { isLoading, handleSearch } = useSearch(SignAPI.search);
  const [selectedKinder, setSelectedKinder] = useState(null);

  const style = css`
    flex: 1;
    align-self: flex-end;
  `;
  const data = {
    data: [
      { id: 1, name: "빗살유치원", logoImageUrl: "ㅁㄹ", address: "서울특" },
      { id: 2, name: "빗유치원", logoImageUrl: "ㅁㄹ", address: "서울특" },
      { id: 3, name: "살유치원", logoImageUrl: "ㅁㄹ", address: "서울특" },
      { id: 4, name: "유치원", logoImageUrl: "ㅁㄹ", address: "서울특" },
    ],
  };

  const handleSelectKinder = (data) => {
    setSelectedKinder(data);
  };

  return (
    <StyledSearch.Container>
      <StyledLogin.Title>가입하시려는 유치원을 선택해주세요</StyledLogin.Title>
      <StyledSearch.KinderListSearch>
        <StyledSearch.SearchBarWrapper>
          <StyledSearch.SelectedKinderWrapper>
            {selectedKinder ? (
              <>
                <StyledSearch.SearchContents>
                  <img
                    src={selectedKinder?.logoImageUrl ?? ""}
                    alt="로고_이미지"
                  />
                  <StyledSearch.SearchContentsInfoWrapper>
                    <h3>{selectedKinder?.name}</h3>
                    <p>{selectedKinder?.address}</p>
                  </StyledSearch.SearchContentsInfoWrapper>
                </StyledSearch.SearchContents>
              </>
            ) : (
              "유치원을 선택 해주세요"
            )}
          </StyledSearch.SelectedKinderWrapper>
          <SearchInput onSearch={handleSearch} inputBodyStyle={style} />
        </StyledSearch.SearchBarWrapper>
        <StyledSearch.SearchContentsWrapper>
          {data.data.map((data) => (
            <StyledSearch.SearchContents
              key={data.id}
              onClick={() => handleSelectKinder(data)}
            >
              <img src={data?.logoImageUrl ?? ""} alt="로고_이미지" />
              <StyledSearch.SearchContentsInfoWrapper>
                <h3>{data?.name}</h3>
                <p>{data?.address}</p>
              </StyledSearch.SearchContentsInfoWrapper>
            </StyledSearch.SearchContents>
          ))}
        </StyledSearch.SearchContentsWrapper>
      </StyledSearch.KinderListSearch>
    </StyledSearch.Container>
  );
};

export default Search;

const KinderBoxStyle = css`
  display: flex;
  height: 74px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

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
    ${KinderBoxStyle}
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

  SearchContents: styled.div`
    ${KinderBoxStyle}
    display: flex;
    width: 100%;
    padding: 12px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 29px;
    background-color: ${({ theme }) => theme.color.white};
    border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
    transition: 0.3s ease-in-out;
    cursor: pointer;
    img {
      width: 50px;
      height: 50px;
      border: 1px solid black;
    }
    &:hover {
      border-color: ${({ theme }) => theme.color.primary};
    }
  `,

  SearchContentsInfoWrapper: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    h3 {
      ${textVariants.Body1_SemiBold}
      color: ${({ theme }) => theme.color.grayScale[600]}
    }
    p {
      ${textVariants.Body2_Bold}
      color: ${({ theme }) => theme.color.grayScale[500]}
    }
  `,
};

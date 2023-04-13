import { useState } from "react";
import styled from "styled-components";
import Buttons from "../../components/Buttons";
import StyledChildManage from "./styled";
import AutoResizeInput from "../../components/AutoResizeInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ChildManageAPI from "../../api/ChildManageAPI";
import ProfileImageUploader from "../../components/ProfileImageUploader";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";
import SuccessModal from "../../components/Modals/SuccessModal";

const ChildProfile = () => {
  const [isFixMode, setIsFixMode] = useState(false);
  const queryClient = useQueryClient();
  const { openModal } = useModal();

  const { data } = useQuery(
    ["childProfile"],
    () => ChildManageAPI.getChildProfile(),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { mutate } = useMutation(ChildManageAPI.putChildProfule, {
    onSuccess: () => {
      // 모달 띄우기
      // queryClient.invalidateQueries(["childProfile"]);
    },
    onError: () => {
      // 에러 모달 띄우기
    },
  });

  const handleFixChildProfile = () => {
    setIsFixMode((prev) => !prev);
    if (isFixMode) {
      openModal({ contents: <SuccessModal /> });
    }
  };

  return (
    <>
      <StyledProfile.Wrapper>
        <StyledChildManage.Title>원생 프로필</StyledChildManage.Title>
        <StyledProfile.ProfileWrapper>
          <ProfileImageUploader isFixMode={!isFixMode} />
          <StyledProfile.InfoWrapper>
            <li>
              <StyledChildManage.SubTitle>이름</StyledChildManage.SubTitle>
              <AutoResizeInput defaultValue="김민재" readOnly={!isFixMode} />
            </li>
            <li>
              <StyledChildManage.SubTitle>성별</StyledChildManage.SubTitle>
              <AutoResizeInput defaultValue="남자" readOnly={!isFixMode} />
            </li>
            <li>
              <StyledChildManage.SubTitle>생년월일</StyledChildManage.SubTitle>
              <AutoResizeInput
                defaultValue="2015.12.07"
                readOnly={!isFixMode}
              />
            </li>
          </StyledProfile.InfoWrapper>
        </StyledProfile.ProfileWrapper>
        <StyledChildManage.SubTitle>특이사항</StyledChildManage.SubTitle>
        <StyledProfile.SignificantArea
          readOnly={!isFixMode}
          defaultValue="우리 아이는 너무 귀엽습니다."
        />
        <StyledProfile.BtnWrapper>
          <Buttons.Filter
            colorTypes={!isFixMode ? "" : "primary"}
            outlined={!isFixMode}
            onClick={handleFixChildProfile}
          >
            {!isFixMode ? "수정하기" : "수정완료"}
          </Buttons.Filter>
        </StyledProfile.BtnWrapper>
      </StyledProfile.Wrapper>
      <Modal modalOption={{ width: "500px", height: "300px" }} />
    </>
  );
};

export default ChildProfile;

const StyledProfile = {
  Wrapper: styled(StyledChildManage.Card)``,

  ProfileWrapper: styled.div`
    width: 100%;
    height: 120px;
    /* height: min-content; */
    margin: 24px 0px 60px;
    display: flex;
    flex-direction: row;
    gap: 90px;
  `,

  InfoWrapper: styled.ul`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-evenly;

    li {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }

    p {
      padding: 10px;
    }
  `,

  SignificantArea: styled.textarea`
    width: 100%;
    height: 200px;
    background-color: ${({ theme }) => theme.color.grayScale[50]};
    margin-top: 7px;
    border: none;
    resize: none;
    outline: none;
    padding: 10px;
  `,

  BtnWrapper: styled.div`
    width: 100%;
    text-align: end;
    margin-top: 22px;
  `,
};

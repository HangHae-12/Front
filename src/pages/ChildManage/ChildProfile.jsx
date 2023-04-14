import { useReducer, useState } from "react";
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
import { useProfileImageUploader } from "../../hooks/useProfileImageUploader";
import { useRecoilState } from "recoil";
import { childListAtom } from "../../atom/sideBarAtom";

const ChildProfile = () => {
  const [isFixMode, setIsFixMode] = useState(false);
  // const childId = useRecoilState(childListAtom)[0].id;
  const childId = 1;
  const queryClient = useQueryClient();
  const { openModal } = useModal();

  const { data } = useQuery(
    ["childProfile"],
    () => ChildManageAPI.getChildProfile(childId),
    {
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );

  const { mutate } = useMutation(ChildManageAPI.putChildProfule, {
    onSuccess: () => {
      // 모달 띄우기
      // openModal({ contents: <SuccessModal /> });
      // queryClient.invalidateQueries(["childProfile"]);
    },
    onError: () => {
      // 에러 모달 띄우기
      // openModal({contents: <AlertModal /> });
    },
  });

  const { selectedFile, isCancelled } = useProfileImageUploader(
    data?.profilImageUrl
  );

  const reduceFormData = (state, action) => {
    switch (action.type) {
      case "SET_FORM_DATA":
        return { ...state, [action.key]: action.value };
      default:
        return state;
    }
  };

  const [formState, dispatch] = useReducer(reduceFormData, {
    name: data?.name,
    gender: data?.gender,
    birth: data?.birth,
    significant: data?.significant,
  });

  const handleFixChildProfile = () => {
    setIsFixMode((prev) => !prev);
    if (isFixMode) {
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        formData.append(key, value);
      });
      selectedFile && formData.append("profileImage", selectedFile);
      formData.append("isCancelled", isCancelled);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      // mutate();
    }
  };

  return (
    <>
      <StyledProfile.Wrapper>
        <StyledChildManage.Title>원생 프로필</StyledChildManage.Title>
        <StyledProfile.ProfileWrapper>
          <ProfileImageUploader
            isFixMode={!isFixMode}
            prev={data?.profileImageUrl}
          />
          <StyledProfile.InfoWrapper>
            <li>
              <StyledChildManage.SubTitle>이름</StyledChildManage.SubTitle>
              <AutoResizeInput
                defaultValue={data?.name}
                readOnly={!isFixMode}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FORM_DATA",
                    key: "name",
                    value: e.target.value,
                  })
                }
              />
            </li>
            <li>
              <StyledChildManage.SubTitle>성별</StyledChildManage.SubTitle>
              <AutoResizeInput
                defaultValue={data?.gender}
                readOnly={!isFixMode}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FORM_DATA",
                    key: "gender",
                    value: e.target.value,
                  })
                }
              />
            </li>
            <li>
              <StyledChildManage.SubTitle>생년월일</StyledChildManage.SubTitle>
              <AutoResizeInput
                defaultValue={data?.birth}
                readOnly={!isFixMode}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FORM_DATA",
                    key: "birth",
                    value: e.target.value,
                  })
                }
              />
            </li>
          </StyledProfile.InfoWrapper>
        </StyledProfile.ProfileWrapper>
        <StyledChildManage.SubTitle>특이사항</StyledChildManage.SubTitle>
        <StyledProfile.SignificantArea
          readOnly={!isFixMode}
          defaultValue={data?.significant}
          onChange={(e) =>
            dispatch({
              type: "SET_FORM_DATA",
              key: "significant",
              value: e.target.value,
            })
          }
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
  Wrapper: styled(StyledChildManage.Card)`
    flex: 2;
  `,

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

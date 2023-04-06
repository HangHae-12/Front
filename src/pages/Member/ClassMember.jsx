import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { MemberAPI } from "../../api/MemberAPI";
import useModal from "../../hooks/useModal";
import textVariants from "../../styles/variants/textVariants";
import { MemberAddModal, ClassModal } from "./ClassModal";
import Modal from "../../components/Modal";

const ClassMember = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [searchMember, setSearchMember] = useState("");
  const { openModal, closeModal } = useModal();

  const { data } = useQuery(
    ["classesMember"],
    () => MemberAPI.getClassesMember(id),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: () => {
        console.log("error");
      },
    }
  );

  //검색기능
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchMember(e.target.value);
  };

  const loadMemberSearch = data?.data?.data?.childResponseDtoList?.filter(
    (item) => item.name.includes(searchMember)
  );

  const modalOption = {
    canCloseOnOverlayClick: true,
    isCloseButton: true,
    padding: "10px",
    width: "660px",
    height: "837px",
  };
  
  //아이 상세 조회 모달
  const getChildInformation = (childId) => {
    console.log(childId);
    const modalData = {
      title: <StyledModalHeader>인원정보</StyledModalHeader>,
      contents: <ClassModal />,
      footer: <StyledModalButton>수정하기</StyledModalButton>,
      callback: () => alert("modal"),
    };
    openModal(modalData);
  };
  
  //반별 아이들 인원 등록 모달
  const setChildInformation = () => {
    const modalData = {
      title: <StyledModalHeader>인원등록</StyledModalHeader>,
      contents: <MemberAddModal />,
      footer: <StyledModalButton>저장하기</StyledModalButton>,
      callback: () => alert("modal"),
    };
    openModal(modalData);
  }

  return (
    <>
      <StyledChildrenWrapper>
        <StyledChildernHeader>
          <StyledPersonnelFont>
            총원 {data?.data.data.childrenCount}명
          </StyledPersonnelFont>
          <StyledAddMemberButton onClick={() => setChildInformation()}>인원 등록</StyledAddMemberButton>
          <StyledMemberSearchInput
            type="text"
            onChange={handleSearch}
            value={searchMember}
          ></StyledMemberSearchInput>
        </StyledChildernHeader>
        <StyledChildrenContainer>
          {loadMemberSearch?.map((item) => {
            return (
              <StyledChildrenCard
                key={item.childId}
                onClick={(e) => getChildInformation(item.childId)}
              >
                <StyledChildrenImage src={item.profileImageUrl} />
                {item.name}
              </StyledChildrenCard>
            );
          })}
        </StyledChildrenContainer>
      </StyledChildrenWrapper>
      <Modal modalOption={modalOption} />
    </>
  );
};

export default ClassMember;

const StyledChildrenWrapper = styled.div`
  padding: 0px 0px 20px;
  gap: 40px;
  width: calc(7 * (190px + 15px));
  height: 484px;
  background: rgba(237, 245, 238, 0.8);
  border-radius: 12px;

  @media (max-width: 1800px) {
    width: calc(7 * (140px + 15px));
    height: 360px;
  }
`;

const StyledChildernHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const StyledChildrenContainer = styled.div`
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const StyledChildrenCard = styled.div`
  background: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  width: 180px;
  height: 160px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 16px;
  box-sizing: border-box;
  margin-left: 10px;
  margin-top: 10px;

  @media (max-width: 1800px) {
    width: 135px;
    height: 130px;
  }
`;

const StyledChildrenImage = styled.img`
  border-radius: 70%;
  width: 70px;
  height: 70px;
`;

const StyledPersonnelFont = styled.div`
  ${textVariants.H2_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[400]};
`;

const StyledAddMemberButton = styled.button`
  margin-left: auto;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  background: ${({ theme }) => theme.color.white};
  padding: 4px 10px;
  gap: 10px;
  color: ${({ theme }) => theme.color.primary};
`;

const StyledMemberSearchInput = styled.input`
  margin-left: 10px;
`;

const StyledModalHeader = styled.div`
  ${textVariants.Body1_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const StyledModalButton = styled.button`
  padding: 5px 8px;
  gap: 10px;
  border-radius: 4px;
  background: ${({ theme }) => theme.color.grayScale[50]};
  border: 1px solid ${({ theme }) => theme.color.grayScale[300]}; ;
`;

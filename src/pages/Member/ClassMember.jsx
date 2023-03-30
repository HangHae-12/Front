import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";




import { MemberAPI } from "../../api/MemberAPI";
import Modal from "../../components/Modal";

import useModal from "../../hooks/useModal";
import textVariants from "../../styles/variants/textVariants";
import ClassModal from "./ClassModal";

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

  const loadMemberSearch = data?.data.data.filter((item) =>
    item.name.includes(searchMember)
  );

  const getChildInformation = (childId) => {
    console.log(childId);
    const modalData = {
      title: "modal",
      contents: "modal",
      callback: () => alert("modal"),
    };
    openModal(modalData);
  };

  return (
    <>
      <StyledChildrenWrapper>
        <StyledChildernHeader>
          <StyledPersonnelFont>
            총원 {data?.data.data.length}명
          </StyledPersonnelFont>
          <StyledAddMemberButton>인원 등록</StyledAddMemberButton>
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
      <ClassModal />
    </>
  );
};

export default ClassMember;

const StyledChildrenWrapper = styled.div`
  padding: 0px 0px 20px;
  gap: 40px;
  width: calc(8 * (130px + 16px));
  height: 650px;
  background: ${({ theme }) => theme.color.green_darker};
  border-radius: 12px;
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
  width: 130px;
  height: 130px;
  border: 1px solid ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 16px;
  box-sizing: border-box;
  margin-left: 10px;
  margin-top: 10px;
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
`;

const StyledMemberSearchInput = styled.input`
  margin-left: 10px;
`;

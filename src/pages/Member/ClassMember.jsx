import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { MemberAPI } from "../../api/MemberAPI";
import Modal from "../../components/Modal";
import useModal from "../../hooks/useModal";

function ClassMember() {
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

  const handletest = () => {
    console.log(data.data.data);
  };

  const loadMemberSearch = data?.data.data.filter((item) =>
    item.name.includes(searchMember)
  );

  const handleOpenModal = () => {
    openModal({
      title: "My Modal Title",
      contents: "My Modal Contents",
      callback: () => {
        console.log("Modal Ok button clicked");
        closeModal();
      },
    });
  };

  const modalOption = {
    canCloseOnOverlayClick: true,
    // 모달의 백드롭을 클릭했을 때 모달창 종료 유무. 기본값은 True
    isCloseButton: true,
    // 오른쪽 상단 닫기버튼 활성화 유무. 기본값은 True
    padding: "10px",
    // 모달 컨테이너 패딩 설정. 기본값은 10px
    width: "800px",
    // 모달 컨테이너 가로 길이 설정. 기본값은 500px
    height: "400px",
    // 모달 컨테이너 세로 길이 설정. 기본값은 400px
  };

  return (
    <>
      <StyledChildrenWrapper>
        <StyledChildernHeader>
          <div>총 {data?.data.data.length}명</div>
          <button onClick={handleOpenModal} style={{ marginLeft: "auto" }}>
            인원 추가
          </button>
          <Modal modalOption={modalOption} />
          <input
            style={{ marginLeft: "10px" }}
            type="text"
            onChange={handleSearch}
            value={searchMember}
          ></input>
        </StyledChildernHeader>
        <StyledChildrenContainer>
          {loadMemberSearch?.map((item) => {
            return (
              <StyledChildrenCard key={item.childId}>
                <StyledChildrenImage src={item.profileImageUrl} />
                {item.name}
              </StyledChildrenCard>
            );
          })}
        </StyledChildrenContainer>
      </StyledChildrenWrapper>
    </>
  );
}

export default ClassMember;

const StyledChildrenWrapper = styled.div`
  padding: 0px 0px 20px;
  gap: 40px;
  width: calc(8 * (130px + 16px));
  height: 650px;
  background: rgba(237, 245, 238, 0.8);
  border-radius: 8px;

  @media screen and (max-width: 600px) {
    width: 100%;
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
  background: #f5f5f5;
  border-radius: 8px;
  width: 130px;
  height: 130px;
  border: 1px solid #dddddd;
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

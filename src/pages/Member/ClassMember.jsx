import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { MemberAPI } from "../../api/MemberAPI";
import useModal from "../../hooks/useModal";
import textVariants from "../../styles/variants/textVariants";
import { MemberAddModal, ClassModal, ClassParentModal } from "./ClassModal";
import Modal from "../../components/Modal";
import CustomPagination from "../../components/CustomPagination";
import { useRecoilValue, useRecoilState } from "recoil";
import { modalAtom } from "../../atom/modalAtoms";
import { memberAtom, parentAtom } from "../../atom/memberAtom";
import Buttons from "../../components/Buttons";

const ClassMember = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [searchMember, setSearchMember] = useState("");
  const { openModal, closeModal } = useModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [render, setRender] = useState(true);
  const [render2, setRender2] = useState(true);
  const memberinfor = useRecoilValue(memberAtom);
  const parentinfor = useRecoilValue(parentAtom);
  const [memberAdd, setMemberAdd] = useRecoilState(memberAtom);
  const [modalState, setModalState] = useRecoilState(modalAtom);
  const [parentAdd, setParentAdd] = useRecoilState(parentAtom);
  const [isChildModify, setIsChildModify] = useState(false);
  const [isChildAdd, setIsChildAdd] = useState(false);
  const [modalOption, setmodalOption] = useState({
    padding: "",
    width: "",
    height: "",
  });

  const { data } = useQuery(
    ["classesMember", id, currentPage, searchMember],
    () => {
      if (searchMember) {
        return MemberAPI.getSearchMember(id, searchMember);
      } else {
        return MemberAPI.getClassesMember(id, currentPage);
      }
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: () => {
        console.log("error");
      },
    }
  );

  const detailMemberMutation = useMutation(MemberAPI.getDetailMember, {
    onSuccess: (response) => {
      const MemberModalData = getChildInformation(response);
      openModal(MemberModalData);
      console.log(response);
    },
  });

  const setMemberSubmitMutation = useMutation(MemberAPI.setMemberSubmit, {
    onSuccess: () => {
      queryClient.invalidateQueries("classesMember");
    },
  });

  const setChildModifyMutation = useMutation(MemberAPI.setChildModify, {
    onSuccess: () => {
      queryClient.invalidateQueries("classesMember");
    },
  });

  //검색기능
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchMember(e.target.value);
    queryClient.invalidateQueries(["classesMember", searchMember]);
    console.log(data);
  };

  useEffect(() => {
    if (!render2 && isChildModify) {
      handleClickModify();
    } else {
      setRender2(false);
    }
  }, [memberinfor, isChildModify, parentinfor]);

  //아이 상세 조회 모달
  const getChildInformation = (response) => {
    setMemberAdd((prev) => ({
      ...prev,
      childId: response.data.data.childId,
      gender: response.data.data.gender,
      name: response.data.data.name,
      significant: response.data.data.significant,
      image: response.data.data.profileImageUrl,
      birth: response.data.data.birth,
    }));
    setParentAdd((prev) => ({
      ...prev,
      //   // parentId: response.data.data.parentProfileResponseDto,
      name: response.data.data.parentProfileResponseDto.name,
      phone: response.data.data.parentProfileResponseDto.phoneNumber,
      imgSrc: response.data.data.parentProfileResponseDto.profileImageUrl,
    }));
    // setmodalOption ({
    //   padding: "10px",
    //   width: "620px",
    //   height: "281px",
    // });
    setmodalOption({
      padding: "10px",
      width: "660px",
      height: "837px",
    });
    return {
      title: <StyledModalHeader>인원정보</StyledModalHeader>,
      contents: <ClassModal response={response} />,
      // <ClassParentModal response={response} />,
      footer: (
        <StyledModalButton
          onClick={() => handleClickModify(response.data.data)}
        >
          수정하기
        </StyledModalButton>
      ),
      callback: () => alert("modal"),
    };
  };

  //반별 아이들 인원 수정 모달
  const handleClickModify = (response) => {
    setIsChildModify(true);
    setModalState((prevState) => ({
      ...prevState,
      title: <StyledModalHeader>인원수정</StyledModalHeader>,
      contents: <MemberAddModal response={response} />,
      footer: (
        <>
          <Buttons.Filter
            colorTypes="primary"
            onClick={() => handleModifySubmit(id)}
          >
            저장하기
          </Buttons.Filter>
        </>
      ),
      callback: () => alert("modal"),
      onClose: () => setIsChildModify(false),
    }));
  };

  //반별 아이들 인원 수정 버튼
  const handleModifySubmit = (id) => {
    const formData = new FormData();
    formData.append("name", memberinfor.name);
    formData.append("birth", memberinfor.birth);
    formData.append("significant", memberinfor.significant);
    formData.append("gender", memberinfor.gender);
    formData.append("image", memberinfor.image);
    formData.append("parentId", parentinfor.parentId);
    formData.append("dailyEnterTime", "07시~08시");
    formData.append("dailyExitTime", "16시~17시");

    const payload = {
      id: id,
      childId: memberinfor.childId,
      formData: formData,
    };
    setChildModifyMutation.mutate(payload);
    setIsChildModify(false);
    closeModal();
  };

  const getDetailMember = (childid) => {
    const payload = {
      id: id,
      childid: childid,
    };
    detailMemberMutation.mutate(payload);
  };

  useEffect(() => {
    if (!render && isChildAdd) {
      setChildInformation();
    } else {
      setRender(false);
    }
  }, [memberinfor, parentinfor]);

  //반별 아이들 인원 등록 버튼
  const handleMemberSubmit = (id) => {
    const formData = new FormData();
    formData.append("name", memberinfor.name);
    formData.append("birth", memberinfor.birth);
    formData.append("significant", memberinfor.significant);
    formData.append("gender", memberinfor.gender);
    formData.append("image", memberinfor.image);
    formData.append("parentId", parentinfor.parentId);

    const payload = {
      id: id,
      formData: formData,
    };
    setMemberSubmitMutation.mutate(payload);
    setIsChildAdd(false);
    closeModal();
  };

  //반별 아이들 인원 등록 모달
  const setChildInformation = () => {
    setIsChildAdd(true);
    setmodalOption({
      padding: "10px",
      width: "660px",
      height: "837px",
    });
    const modalData = {
      title: <StyledModalHeader>인원등록</StyledModalHeader>,
      contents: <MemberAddModal />,
      footer: (
        <StyledModalButton
          onClick={() => {
            handleMemberSubmit(id);
          }}
        >
          저장하기
        </StyledModalButton>
      ),
      callback: () => alert("modal"),
      onClose: () => setIsChildAdd(false),
    };
    openModal(modalData);
  };

  return (
    <>
      <StyledChildrenWrapper>
        <StyledChildernHeader>
          <StyledPersonnelFont>
            총원 {data?.data?.data?.childrenCount}명
          </StyledPersonnelFont>
          <StyledAddMemberButton onClick={setChildInformation}>
            인원 등록
          </StyledAddMemberButton>
          <StyledMemberSearchInput
            type="text"
            onChange={handleSearch}
            value={searchMember}
          ></StyledMemberSearchInput>
        </StyledChildernHeader>
        <StyledChildrenContainer>
          {data?.data?.data?.childResponseDtoList?.map((item) => {
            return (
              <StyledChildrenCard
                key={item.childId}
                onClick={(e) => getDetailMember(item.childId)}
              >
                <StyledChildrenImage src={item.profileImageUrl} />
                {item.name}
              </StyledChildrenCard>
            );
          })}
        </StyledChildrenContainer>
        {data?.data?.data?.childrenCount !== 0 ? (
          <CustomPagination
            current={currentPage}
            pageSize="14"
            total={data?.data?.data?.childrenCount}
            onChange={(page) => setCurrentPage(page)}
          />
        ) : null}
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

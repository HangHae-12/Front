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
import { kindergartenAtom, userProfileAtom } from "../../atom/sideBarAtom";
import { AiOutlineSearch } from "react-icons/ai";
import debounce from "../../utils/debounce";
import { profileImageState } from "../../atom/profileImageUploaderAtom";
import { motion } from "framer-motion";
import { classButtonAtom } from "../../atom/classesAtom";

const ClassMember = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [searchMember, setSearchMember] = useState("");
  const { openModal, closeModal } = useModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [render, setRender] = useState(true);
  const memberinfor = useRecoilValue(memberAtom);
  const parentinfor = useRecoilValue(parentAtom);
  const [memberAdd, setMemberAdd] = useRecoilState(memberAtom);
  const [modalState, setModalState] = useRecoilState(modalAtom);
  const [parentAdd, setParentAdd] = useRecoilState(parentAtom);
  const [isChildModify, setIsChildModify] = useState(false);
  const [isChildAdd, setIsChildAdd] = useState(false);
  const [image, setImage] = useRecoilState(profileImageState);
  const userRole = useRecoilValue(userProfileAtom);
  const preview = useRecoilValue(profileImageState);
  const kindergartenId = useRecoilValue(kindergartenAtom);
  const [debouncedSearchMember, setDebouncedSearchMember] = useState("");
  const classinfor = useRecoilValue(classButtonAtom);

  const { data } = useQuery(
    [
      "classesMember",
      kindergartenId.id,
      id || classinfor[0].id,
      currentPage,
      debouncedSearchMember,
    ],
    () => {
      if (debouncedSearchMember) {
        return MemberAPI.getSearchMember(
          kindergartenId.id,
          id || classinfor[0].id,
          debouncedSearchMember
        );
      } else {
        return MemberAPI.getClassesMember(
          kindergartenId.id,
          id || classinfor[0].id,
          currentPage
        );
      }
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !!classinfor[0].id,
    }
  );

  useEffect(() => {
    const debounced = debounce((value) => setDebouncedSearchMember(value), 700);
    debounced(searchMember);
  }, [searchMember]);

  const detailMemberMutation = useMutation(MemberAPI.getDetailMember, {
    onSuccess: (response) => {
      const MemberModalData = getChildInformation(response);
      openModal(MemberModalData);
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

  useEffect(() => {
    if (!render && isChildModify) {
      handleClickModify();
    } else {
      setRender(false);
    }
  }, [memberinfor, isChildModify, parentinfor, preview]);

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
      dailyEnterTime: response.data.data.dailyEnterTime,
      dailyExitTime: response.data.data.dailyExitTime,
    }));
    setParentAdd((prev) => ({
      ...prev,
      parentId: response.data.data.parentProfileResponseDto.parentId,
      name: response.data.data.parentProfileResponseDto.name,
      phone: response.data.data.parentProfileResponseDto.phoneNumber,
      imgSrc: response.data.data.parentProfileResponseDto.profileImageUrl,
    }));

    const viewportWidth = window.innerWidth;
    const modalHeight =
      viewportWidth <= 1500
        ? "100%"
        : userRole.role === "PRINCIPAL" || userRole.role === "TEACHER"
        ? "837px"
        : "342px";

    return {
      title: <StyledModalHeader>인원정보</StyledModalHeader>,
      contents: (
        <>
          {userRole.role === "PRINCIPAL" || userRole.role === "TEACHER" ? (
            <ClassModal response={response} />
          ) : (
            <ClassParentModal response={response} />
          )}
        </>
      ),
      footer: (
        <>
          {userRole.role === "PRINCIPAL" || userRole.role === "TEACHER" ? (
            <StyledModalButton
              onClick={() => handleClickModify(response.data.data)}
            >
              수정하기
            </StyledModalButton>
          ) : null}
        </>
      ),
      width: "660px",
      height: modalHeight,
      callback: () => alert("modal"),
      onClose: () => {
        setMemberAdd("");
        setParentAdd("");
        setImage("");
      },
    };
  };

  //반별 아이들 인원 수정 모달
  const handleClickModify = () => {
    const viewportWidth = window.innerWidth;
    const modalHeight = viewportWidth <= 1500 ? "100%" : "900px";
    setIsChildModify(true);
    setModalState((prevState) => ({
      ...prevState,
      title: <StyledModalHeader>인원수정</StyledModalHeader>,
      contents: <MemberAddModal />,
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
      width: "660px",
      height: modalHeight,
      callback: () => alert("modal"),
      onClose: () => {
        setIsChildModify(false);
        setMemberAdd("");
        setParentAdd("");
        setImage("");
      },
    }));
  };

  //반별 아이들 인원 수정 버튼
  const handleModifySubmit = (id) => {
    const formData = new FormData();
    formData.append("name", memberinfor.name);
    formData.append("birth", memberinfor.birth);
    formData.append("significant", memberinfor.significant);
    formData.append("gender", memberinfor.gender);
    formData.append("parentId", parentinfor.parentId);
    formData.append("dailyEnterTime", memberinfor.dailyEnterTime);
    formData.append("dailyExitTime", memberinfor.dailyExitTime);
    formData.append("isCancelled", false);

    if (memberinfor.image[0] !== "h") {
      formData.append("image", memberinfor.image);
    }

    const payload = {
      id: id || classinfor[0].id,
      kindergartenId: kindergartenId.id,
      childId: memberinfor.childId,
      formData: formData,
    };
    setChildModifyMutation.mutate(payload);
    setIsChildModify(false);
    closeModal();
  };

  const getDetailMember = (childid) => {
    const payload = {
      id: id || classinfor[0].id,
      kindergartenId: kindergartenId.id,
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
  }, [memberinfor, parentinfor, isChildAdd, preview]);

  const validateForm = (memberInfo, parentInfo) => {
    const requiredFields = ["name", "birth", "gender", "parentId"];

    for (const field of requiredFields) {
      if (!memberInfo[field] && !parentInfo[field]) {
        return false;
      }
    }
    return true;
  };

  //반별 아이들 인원 등록 버튼
  const handleMemberSubmit = (id) => {
    if (!validateForm(memberinfor, parentinfor)) {
      alert("모두 입력해 주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("name", memberinfor.name);
    formData.append("birth", memberinfor.birth);
    formData.append("significant", memberinfor.significant);
    formData.append("gender", memberinfor.gender);
    formData.append("parentId", parentinfor.parentId);
    formData.append("dailyEnterTime", memberinfor.dailyEnterTime);
    formData.append("dailyExitTime", memberinfor.dailyExitTime);

    if (memberinfor.image) {
      formData.append("image", memberinfor.image);
    }

    const payload = {
      id: id || classinfor[0].id,
      kindergartenId: kindergartenId.id,
      formData: formData,
    };
    setMemberSubmitMutation.mutate(payload);
    setIsChildAdd(false);
    closeModal();
  };

  //반별 아이들 인원 등록 모달
  const setChildInformation = () => {
    setIsChildAdd(true);
    const viewportWidth = window.innerWidth;
    const modalHeight = viewportWidth <= 1500 ? "100%" : "900px";
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
      width: "660px",
      height: modalHeight,
      callback: () => alert("modal"),
      onClose: () => {
        setIsChildAdd(false);
        setMemberAdd("");
        setParentAdd("");
        setImage("");
      },
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
          {userRole.role === "PRINCIPAL" || userRole.role === "TEACHER" ? (
            <StyledAddMemberButton onClick={setChildInformation}>
              인원 등록
            </StyledAddMemberButton>
          ) : null}
          <StyledSearchWrapper>
            <StyledMemberSearchInput
              type="search"
              onChange={(e) => setSearchMember(e.target.value)}
              value={searchMember}
            ></StyledMemberSearchInput>
            <StyledInputIcon />
          </StyledSearchWrapper>{" "}
        </StyledChildernHeader>
        <StyledChildrenContainer>
          {data?.data?.data?.childResponseDtoList?.map((item) => {
            return (
              <StyledChildrenCard
                key={item.childId}
                onClick={(e) => getDetailMember(item.childId)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
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
      <Modal />
    </>
  );
};

export default ClassMember;

const StyledChildrenWrapper = styled.div`
  padding: 0px 20px 20px;
  gap: 40px;
  background: rgba(237, 245, 238, 0.8);
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.12);
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

const StyledChildrenCard = styled(motion.div)`
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

  @media ${({ theme }) => theme.device.laptop} {
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
  cursor: pointer;

  @media ${({ theme }) => theme.device.laptop} {
    display: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.grayScale[50]};
  }
  &:active {
    cursor: grabbing;
  }
`;

const StyledMemberSearchInput = styled.input`
  width: 200px;
  height: 32px;
  margin-left: 10px;
  padding: 3px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 4px;
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

const StyledSearchWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 200px;
  height: 32px;
`;

const StyledInputIcon = styled(AiOutlineSearch)`
  position: absolute;
  right: 15px;
`;

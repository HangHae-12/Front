import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import textVariants from "../../styles/variants/textVariants";
import { memberAtom, parentAtom } from "../../atom/memberAtom";
import { useRecoilState } from "recoil";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MemberAPI } from "../../api/MemberAPI";

//반별 아이들 상세 조회 모달
export const ClassModal = ({ response }) => {
  return (
    <StyledModalWrapper>
      <StyledChildrenProfileWrapper>
        <StyledLeftWrapper>
          <StyledProfileHeaderFont>원생 프로필</StyledProfileHeaderFont>
          <StyledProfileImage src={response?.data.data.profileImageUrl} />
        </StyledLeftWrapper>
        <StyledRightWrapper>
          <StyledInputWrapper>
            <StyledQuestionFont>이름 </StyledQuestionFont>
            <StyledAnswerFont>{response?.data.data.name}</StyledAnswerFont>
          </StyledInputWrapper>
          <StyledInputWrapper>
            <StyledQuestionFont>성별 </StyledQuestionFont>
            <StyledAnswerFont>남자</StyledAnswerFont>
          </StyledInputWrapper>
          <StyledInputWrapper>
            <StyledQuestionFont>생년월일 </StyledQuestionFont>
            <StyledAnswerFont>{response?.data.data.birth}</StyledAnswerFont>
          </StyledInputWrapper>
          <StyledInputWrapper>
            <StyledQuestionFont>등원시간 </StyledQuestionFont>
            <StyledTime marginLeft="50px" marginRight="40px">
              09시~10시
            </StyledTime>
            <StyledQuestionFont>하원시간 </StyledQuestionFont>
            <StyledTime marginLeft="50px">09시~10시</StyledTime>
          </StyledInputWrapper>
        </StyledRightWrapper>
      </StyledChildrenProfileWrapper>
      <StyledNote>특이사항</StyledNote>
      <StyleNoteBox value={response?.data.data.significant} />
      <StyledParentProfileWrapper>
        <StyledParentBox>
          <StyledLeftWrapper>
            <StyledProfileHeaderFont>학부모 프로필</StyledProfileHeaderFont>
            <StyledProfileImage
              src={
                "https://outlooksformen.com/sites/default/files/2020-09/testiminials-img-01.png"
              }
            />
          </StyledLeftWrapper>
          <StyledRightWrapper>
            <StyledInputWrapper>
              <StyledQuestionFont>이름</StyledQuestionFont>
              <StyledAnswerFont marginLeft="280px">
                {response?.data?.data?.parentProfileResponseDto?.name}
              </StyledAnswerFont>
            </StyledInputWrapper>
            <StyledInputWrapper>
              <StyledQuestionFont>이메일</StyledQuestionFont>
              <StyledAnswerFont marginLeft="220px">
                {response?.data?.data?.parentProfileResponseDto?.email}
              </StyledAnswerFont>
            </StyledInputWrapper>
            <StyledInputWrapper>
              <StyledQuestionFont>연락처</StyledQuestionFont>
              <StyledAnswerFont marginLeft="195px">
                {response?.data?.data?.parentProfileResponseDto?.phoneNumber}
              </StyledAnswerFont>
            </StyledInputWrapper>
            <StyledInputWrapper>
              <StyledQuestionFont>비상 연락</StyledQuestionFont>
              <StyledAnswerFont marginLeft="180px">
                {
                  response?.data?.data?.parentProfileResponseDto
                    ?.emergencyPhoneNumber
                }
              </StyledAnswerFont>
            </StyledInputWrapper>
          </StyledRightWrapper>
        </StyledParentBox>
      </StyledParentProfileWrapper>
    </StyledModalWrapper>
  );
};

// 학부모 아이 상세 조회 모달
export const ClassParentModal = ({ response }) => {
  return (
    <StyledModalWrapper>
      <StyledChildrenProfileWrapper>
        <StyledLeftWrapper>
          <StyledProfileHeaderFont>원생 프로필</StyledProfileHeaderFont>
          <StyledProfileImage src={response?.data.data.profileImageUrl} />
        </StyledLeftWrapper>
        <StyledRightWrapper>
          <StyledInputWrapper marginLeft="40px">
            <StyledQuestionFont>이름 </StyledQuestionFont>
            <StyledAnswerFont marginLeft="250px">
              {response?.data.data.name}
            </StyledAnswerFont>
          </StyledInputWrapper>
          <StyledInputWrapper marginLeft="40px">
            <StyledQuestionFont>성별 </StyledQuestionFont>
            <StyledAnswerFont>남자</StyledAnswerFont>
          </StyledInputWrapper>
          <StyledInputWrapper marginLeft="40px">
            <StyledQuestionFont>생년월일 </StyledQuestionFont>
            <StyledAnswerFont>{response?.data.data.birth}</StyledAnswerFont>
          </StyledInputWrapper>
        </StyledRightWrapper>
      </StyledChildrenProfileWrapper>
    </StyledModalWrapper>
  );
};

//반별 아이들 인원 등록 모달
export const MemberAddModal = ({ response }) => {
  const queryClient = useQueryClient();
  const [checkParent, setCheckedParent] = useState({});
  const [preview, setPreview] = useState("");
  const [memberAdd, setMemberAdd] = useRecoilState(memberAtom);
  const [parentAdd, setParentAdd] = useRecoilState(parentAtom);
  const [isChecked, setIsChecked] = useState(false);
  const [searchParent, setSearchParent] = useState("");

  const { data } = useQuery(
    ["searchParent", searchParent],
    () => MemberAPI.getSearchParent(searchParent),
    {
      onSuccess: (data) => {
        console.log(data.data);
      },
      onError: () => {
        console.log("error");
      },
    }
  );

  //검색기능
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParent(e.target.value);
    queryClient.invalidateQueries(["searchParent", searchParent]);
    console.log(data);
  };

  const saveImgFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    setMemberAdd({ ...memberAdd, image: file });
    console.log(preview);
  };

  const handleCheckBoxChange = (e, item) => {
    setIsChecked(e.target.checked);
    setCheckedParent({
      ...checkParent,
      [item.parentId]: e.target.checked,
    });
    if (e.target.checked) {
      setParentAdd({
        ...parentAdd,
        parentId: item.parentId,
        name: item.name,
        phone: item.phoneNumber,
        imgSrc: item.profileImageUrl,
      });
    } else {
      setParentAdd(null);
    }
  };

  return (
    <StyledModalWrapper>
      <StyledChildrenProfileWrapper>
        <StyledLeftWrapper>
          <StyledProfileHeaderFont>원생 프로필</StyledProfileHeaderFont>
          {preview ? (
            <StyledProfileImage src={preview} />
          ) : (
            <StyledProfileImg value={response?.profileImageUrl} />
          )}
          <StyledAddInput
            type="file"
            name="upload-img"
            id="upload-img"
            accept="image/*"
            aria-hidden="false"
            tabIndex="0"
            onChange={saveImgFile}
          />
          <StyledProfileButton htmlFor="upload-img" id="upload-img-label">
            이미지 추가
          </StyledProfileButton>
        </StyledLeftWrapper>
        <StyledRightWrapper>
          <StyledInputWrapper marginTop="20px">
            <StyledQuestionFont>이름 </StyledQuestionFont>
            <StyledAnswerInputBox
              width="58px"
              height="32px"
              value={response?.name}
              onChange={(e) =>
                setMemberAdd({ ...memberAdd, name: e.target.value })
              }
            />
          </StyledInputWrapper>
          <StyledInputWrapper marginTop="15px">
            <StyledQuestionFont>성별 </StyledQuestionFont>
            <StyledSelectBox
              onChange={(e) =>
                setMemberAdd({ ...memberAdd, gender: e.target.value })
              }
              value={response?.gender}
            >
              <option value=""></option>
              <option value="MALE">남자</option>
              <option value="FEMALE">여자</option>
            </StyledSelectBox>
          </StyledInputWrapper>
          <StyledInputWrapper marginTop="15px">
            <StyledQuestionFont>생년월일 </StyledQuestionFont>
            <StyledAnswerInputBox
              width="109px"
              height="32px"
              value={response?.birth}
              placeholder="2000-01-01"
              onChange={(e) =>
                setMemberAdd({ ...memberAdd, birth: e.target.value })
              }
            />
          </StyledInputWrapper>
          <StyledInputWrapper marginTop="25px">
            <StyledQuestionFont>등원시간 </StyledQuestionFont>
            <StyledTime marginLeft="50px" marginRight="40px">
              09시~10시
            </StyledTime>
            <StyledQuestionFont>하원시간 </StyledQuestionFont>
            <StyledTime marginLeft="50px">09시~10시</StyledTime>
          </StyledInputWrapper>
        </StyledRightWrapper>
      </StyledChildrenProfileWrapper>
      <StyledNote>특이사항</StyledNote>
      <StyledInputBox
        width="560px"
        height="115px"
        value={response?.significant}
        onChange={(e) =>
          setMemberAdd({ ...memberAdd, significant: e.target.value })
        }
      />
      <StyledParentProfileWrapper>
        <StyledParentBox flexDirection="column" padding="0px">
          <StyledProfileHeaderFont marginTop="20px">
            학부모 등록
          </StyledProfileHeaderFont>
          <StyledInputWrapper marginTop="20px">
            {isChecked ? (
              <>
                <StyledCheckInformationBox
                  marginLeft="12px"
                  key={parentAdd.parentId}
                >
                  <StyledProfileImage
                    width="40px"
                    height="40px"
                    marginTop="0px"
                    src={parentAdd.imgSrc}
                    value={response?.parentProfileResponseDto?.profileImageUrl}
                  />
                  <StyledParentName
                    value={response?.parentProfileResponseDto?.name}
                  >
                    {parentAdd.name}
                  </StyledParentName>
                  <StyledParentPhone
                    value={response?.parentProfileResponseDto?.phoneNumber}
                  >
                    {parentAdd.phone}
                  </StyledParentPhone>
                </StyledCheckInformationBox>
              </>
            ) : (
              <StyledParentAddBox>학부모를 선택 해주세요</StyledParentAddBox>
            )}
            <StyledSearchInput
              type="text"
              onChange={handleSearch}
              value={searchParent}
            />
          </StyledInputWrapper>
          <StyledChoiceparentWrapper>
            {data?.data?.data?.map((item) => {
              return (
                <StyledParentInformationBox key={item.parentId}>
                  <CheckBox
                    type="checkbox"
                    checked={checkParent[item.parentId] || false}
                    onChange={(e) => handleCheckBoxChange(e, item)}
                  />
                  <StyledProfileImage
                    width="40px"
                    height="40px"
                    marginTop="0px"
                    src={item.profileImageUrl}
                  />
                  <StyledParentName>{item.name}</StyledParentName>
                  <StyledParentPhone>{item.phoneNumber}</StyledParentPhone>
                </StyledParentInformationBox>
              );
            })}
          </StyledChoiceparentWrapper>
        </StyledParentBox>
      </StyledParentProfileWrapper>
    </StyledModalWrapper>
  );
};

//갤러리 이미지 슬라이드 모달
export const GallerySlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const TOTAL_SLIDES = images.length;

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = "all 0.5s ease-in-out";
      slideRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  return (
    <StyledModalSlideContainer>
      <StlyedSlideButton onClick={prevSlide}>＜</StlyedSlideButton>
      <StyledModalSlideWrapper>
        <StyledModalSlide ref={slideRef}>
          {images.map((item) => (
            <StyledModalSlideImgContainer key={item}>
              <StyledModalSlideImg src={item} />
            </StyledModalSlideImgContainer>
          ))}
        </StyledModalSlide>
      </StyledModalSlideWrapper>
      <StlyedSlideButton onClick={nextSlide}>＞</StlyedSlideButton>
    </StyledModalSlideContainer>
  );
};

// 반 관리 모달
export const ClassMangeModal = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleModiftButton = () => {
    setIsEditing(true);
  };

  const handleDeleteButton = () => {
    if (
      window.confirm(
        "반을 삭제시 모든 데이터가 삭제됩니다. 그래도 삭제하십니까?"
      )
    ) {
      alert("삭제되었습니다.");
    } else {
      alert("취소합니다.");
    }
  };

  const handleConfirmButton = () => {
    setIsEditing(false);
  };

  const handleCancelButton = () => {
    setIsEditing(false);
  };
  return (
    <>
      <StyledClassAddModalWrapper>
        <StyledClassMangeBox>
          <StyledInputWrapper marginTop="10px">
            <StyledClassMangeInput placeholder="반 이름을 적어주세요" />
            <StlyedClassMangeAddButton>추가</StlyedClassMangeAddButton>
          </StyledInputWrapper>
          <StyledInputWrapper marginTop="10px">
            {!isEditing ? (
              <>
                <StyledClassMangeDiv>세빛반</StyledClassMangeDiv>
                <StyledClassMangeButtons onClick={handleModiftButton}>
                  수정
                </StyledClassMangeButtons>
                <StyledClassMangeButtons onClick={handleDeleteButton}>
                  삭제
                </StyledClassMangeButtons>
              </>
            ) : (
              <>
                <StyledClassMangeInput />
                <StyledClassMangeButtons onClick={handleConfirmButton}>
                  확인
                </StyledClassMangeButtons>
                <StyledClassMangeButtons onClick={handleCancelButton}>
                  취소
                </StyledClassMangeButtons>
              </>
            )}
          </StyledInputWrapper>
        </StyledClassMangeBox>
      </StyledClassAddModalWrapper>
    </>
  );
};

const StyledModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledChildrenProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px;
  gap: 24px;
`;

const StyledProfileHeaderFont = styled.div`
  color: ${({ theme }) => theme.color.grayScale[700]};
  ${textVariants.Body1_SemiBold}
  margin-top: ${({ marginTop }) => marginTop};
`;
const StyledProfileImage = styled.img`
  width: ${({ width }) => width || "120px"};
  height: ${({ height }) => height || "120px"};
  border-radius: 70%;
  margin-top: ${({ marginTop }) => marginTop || "20px"};
`;

const StyledQuestionFont = styled.div`
  ${textVariants.Body3_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-left: ${({ marginLeft }) => marginLeft};
`;

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ marginTop }) => marginTop || "30px"};
  justify-content: space-between;
  margin-left: ${({ marginLeft }) => marginLeft};
`;

const StyledLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledRightWrapper = styled.div`
  margin-left: 20px;
  margin-top: 20px;
`;

const StyledAnswerFont = styled.div`
  ${textVariants.Body1_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-left: ${({ marginLeft }) => marginLeft};
`;

const StyledProfileButton = styled.label`
  ${textVariants.Body3_SemiBold}
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  background: ${({ theme }) => theme.color.white};
  border-radius: 2px;
  padding: 10px;
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-top: 10px;
`;

const StyledTime = styled.div`
  ${textVariants.Body2_Bold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
`;

const StyledNote = styled.div`
  ${textVariants.Body3_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-right: 500px;
`;

const StyledInputBox = styled.input`
  width: 560px;
  height: 115px;
  border: 0;
  border-radius: 4px;
  outline: none;
  background-color: ${({ theme }) => theme.color.grayScale[50]};
  margin-top: 10px;
`;

const StyledParentProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;
  gap: 12px;
  margin-top: 20px;
`;

const StyledParentBox = styled.div`
  width: 560px;
  border: none;
  border-top: 2px solid ${({ theme }) => theme.color.grayScale[200]};
  padding: ${({ padding }) => padding || "25px"};
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  align-items: flex-start;
`;

const StyledAnswerInputBox = styled.input`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: 0;
  border-radius: 2px;
  outline: none;
  background-color: ${({ theme }) => theme.color.grayScale[50]};
  ::placeholder {
    text-align: center;
  }
`;

const StyledSelectBox = styled.select`
  background: ${({ theme }) => theme.color.grayScale[50]};
  border-radius: 2px;
  border: none;
  width: 58px;
  height: 32px;
`;

const StyledParentAddBox = styled.div`
  ${textVariants.Body3_SemiBold}
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 72px;
  width: 260px;
  height: 56px;
  background: ${({ theme }) => theme.color.grayScale[100]};
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 4px;
  color: ${({ theme }) => theme.color.grayScale[400]};
  margin-left: 12px;
`;

const StyledChoiceparentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 18px 12px;
  gap: 9px;
  width: 570px;
  height: 160px;
  overflow-y: auto;
  background: ${({ theme }) => theme.color.grayScale[50]};
  border-radius: 8px;
  margin-top: 8px;
`;

const StyledParentInformationBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  width: 260px;
  height: 56px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  border-radius: 4px;
  margin-left: ${({ marginLeft }) => marginLeft};
`;
const StyledCheckInformationBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  width: 260px;
  height: 56px;
  background: rgba(237, 245, 238, 0.8);
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 4px;
  margin-left: ${({ marginLeft }) => marginLeft};
`;

const CheckBox = styled.input`
  border-radius: 70%;
  width: 12px;
  height: 12px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  appearance: none;
  cursor: pointer;
  &:checked {
    background: ${({ theme }) => theme.color.primary};
  }
`;

const StyledParentName = styled.div`
  ${textVariants.Body3_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[600]};
  margin-left: 5px;
`;

const StyledParentPhone = styled.div`
  ${textVariants.Caption_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-left: 62px;
`;

const StyledSearchInput = styled.input`
  padding: 3px 12px;
  gap: 10px;
  width: 200px;
  height: 32px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  border-radius: 4px;
  margin-left: 83px;
  margin-top: 20px;
`;

const StyledModalSlideContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledModalSlideWrapper = styled.div`
  width: 716px;
  overflow: hidden;
`;

const StyledModalSlideImgContainer = styled.div`
  flex-shrink: 0;
  width: 716px;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
`;

const StyledModalSlide = styled.div`
  width: 716px;
  height: 400px;
  display: flex;
`;

const StyledModalSlideImg = styled.img`
  width: 500px;
  height: 400px;
  border-radius: 8px;
  margin-left: 20px;
`;

const StlyedSlideButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 40px;
  height: 60px;
  background: ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
`;

const StyledAddInput = styled.input`
  display: none;
`;

const StyledProfileImg = styled.img`
  width: 120px;
  height: 120px;
  background: ${({ theme }) => theme.color.grayScale[300]};
  border-radius: 70%;
  margin-top: 20px;
`;

const StyledClassAddModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const StyleNoteBox = styled.div`
  width: 560px;
  height: 115px;
  border: 0;
  border-radius: 4px;
  outline: none;
  background-color: ${({ theme }) => theme.color.grayScale[50]};
  margin-top: 10px;
`;

const StyledClassMangeBox = styled.div`
  width: 424px;
  height: 380px;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color.grayScale[400]};
  border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[400]};
  display: flex;
  flex-direction: column;
`;

const StyledClassMangeInput = styled.input`
  width: 300px;
  height: 32px;
  background: ${({ theme }) => theme.color.grayScale[50]};
  border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  border-radius: 4px;
  padding: 4px 12px;
`;

const StlyedClassMangeAddButton = styled.button`
  ${textVariants.Body1_SemiBold}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 113px;
  height: 32px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 4px;
  color: ${({ theme }) => theme.color.primary};
`;

const StyledClassMangeButtons = styled.button`
  ${textVariants.Body1_SemiBold}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 32px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.grayScale[400]};
  border-radius: 4px;
  color: ${({ theme }) => theme.color.grayScale[400]};
`;

const StyledClassMangeDiv = styled.div`
  ${textVariants.Body1_SemiBold}
  width: 300px;
  height: 32px;
  background: ${({ theme }) => theme.color.grayScale[50]};
  border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  border-radius: 4px;
  padding: 4px 12px;
  color: ${({ theme }) => theme.color.grayScale[600]};
  display: flex;
  align-items: center;
`;

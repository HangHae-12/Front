import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import textVariants from "../../styles/variants/textVariants";

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
            <StyledAnswerFont>2015.12.07</StyledAnswerFont>
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
      <StyledInputBox />
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
              <StyledAnswerFont marginLeft="280px">정길숙</StyledAnswerFont>
            </StyledInputWrapper>
            <StyledInputWrapper>
              <StyledQuestionFont>관계</StyledQuestionFont>
              <StyledAnswerFont marginLeft="310px">모</StyledAnswerFont>
            </StyledInputWrapper>
            <StyledInputWrapper>
              <StyledQuestionFont>연락처</StyledQuestionFont>
              <StyledAnswerFont marginLeft="195px">
                010-0000-0000
              </StyledAnswerFont>
            </StyledInputWrapper>
            <StyledInputWrapper>
              <StyledQuestionFont>비상 연락</StyledQuestionFont>
              <StyledAnswerFont marginLeft="180px">
                010-0000-0000
              </StyledAnswerFont>
            </StyledInputWrapper>
          </StyledRightWrapper>
        </StyledParentBox>
      </StyledParentProfileWrapper>
    </StyledModalWrapper>
  );
};

//반별 아이들 인원 등록 모달
export const MemberAddModal = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [note, setNote] = useState("");

  const handleCheckBoxChange = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      setSelectedParent({
        name: "박병근",
        phone: "010-9999-9999",
        imgSrc:
          "https://outlooksformen.com/sites/default/files/2020-09/testiminials-img-01.png",
      });
    } else {
      setSelectedParent(null);
    }
  };
  return (
    <StyledModalWrapper>
      <StyledChildrenProfileWrapper>
        <StyledLeftWrapper>
          <StyledProfileHeaderFont>원생 프로필</StyledProfileHeaderFont>
          <StyledProfileImage
            src={
              "https://outlooksformen.com/sites/default/files/2020-09/testiminials-img-01.png"
            }
          />
          <StyledProfileButton type="file"
              name="upload-img"
              id="upload-img"
              accept="image/*"
              aria-hidden="false"
              tabIndex="0" />
        </StyledLeftWrapper>
        <StyledRightWrapper>
          <StyledInputWrapper marginTop="20px">
            <StyledQuestionFont>이름 </StyledQuestionFont>
            <StyledAnswerInputBox
              width="58px"
              height="32px"
              onChange={(e) => setName(e.target.value)}
            />
          </StyledInputWrapper>
          <StyledInputWrapper marginTop="15px">
            <StyledQuestionFont>성별 </StyledQuestionFont>
            <StyledSelectBox>
              <option value="남자">남자</option>
              <option value="여자">여자</option>
            </StyledSelectBox>
          </StyledInputWrapper>
          <StyledInputWrapper marginTop="15px">
            <StyledQuestionFont>생년월일 </StyledQuestionFont>
            <StyledAnswerInputBox
              width="109px"
              height="32px"
              onChange={(e) => setBirth(e.target.value)}
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
        onChange={(e) => setNote(e.target.value)}
      />
      <StyledParentProfileWrapper>
        <StyledParentBox flexDirection="column" padding="0px">
          <StyledProfileHeaderFont marginTop="20px">
            학부모 등록
          </StyledProfileHeaderFont>
          <StyledInputWrapper marginTop="20px">
            {selectedParent ? (
              <>
                <StyledCheckInformationBox marginLeft="12px">
                  <StyledProfileImage
                    width="40px"
                    height="40px"
                    marginTop="0px"
                    src={selectedParent.imgSrc}
                  />
                  <StyledParentName>{selectedParent.name}</StyledParentName>
                  <StyledParentPhone>{selectedParent.phone}</StyledParentPhone>
                </StyledCheckInformationBox>
              </>
            ) : (
              <StyledParentAddBox>학부모를 선택 해주세요</StyledParentAddBox>
            )}
            <StyledSearchInput />
          </StyledInputWrapper>
          <StyledChoiceparentWrapper>
            <StyledParentInformationBox>
              <CheckBox
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckBoxChange}
              />
              <StyledProfileImage
                width="40px"
                height="40px"
                marginTop="0px"
                src={
                  "https://outlooksformen.com/sites/default/files/2020-09/testiminials-img-01.png"
                }
              />
              <StyledParentName>준수형</StyledParentName>
              <StyledParentPhone>010-8888-8888</StyledParentPhone>
            </StyledParentInformationBox>
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
`;

const StyledLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledRightWrapper = styled.div`
  margin-left: 40px;
  margin-top: 20px;
`;

const StyledAnswerFont = styled.div`
  ${textVariants.Body1_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-left: ${({ marginLeft }) => marginLeft};
`;

const StyledProfileButton = styled.input`
  ${textVariants.Body3_SemiBold}
  border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  background: ${({ theme }) => theme.color.white};
  border-radius: 2px;
  padding: 4px;
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-top: 10px;
    display: none;
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

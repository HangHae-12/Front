import styled from "styled-components";
import { DUMMY_IMG_SRC } from "../assets";
import Card from "../components/Card";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";
import Buttons from "../components/Buttons";

const Preview = () => {
  const { openModal } = useModal();

  const modalData = {
    title: "modal",
    contents: (
      <div>
        <script>console.log(1)</script>
      </div>
    ),
    callback: () => alert("modal"),
  };

  const modalOption = {
    // canCloseOnOverlayClick: false,
    isCloseButton: false,
  };
  return (
    <>
      <Card>
        <Card.Header isClosedIcon={true}>
          <Card.Title>Good</Card.Title>
        </Card.Header>
        <Card.Contents>
          <StyledDiv>
            GoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGood
          </StyledDiv>
        </Card.Contents>
      </Card>

      <Card padding="10px 0px 10px 0px">
        <Card.Contents>
          <StyledDiv>
            <img src={DUMMY_IMG_SRC} alt="test" />
          </StyledDiv>
        </Card.Contents>
        <Card.Contents>
          <StyledWrapper>
            <h3>title</h3>
            <div>
              <p>2023.01.01 11:30</p>
              <p>박미자</p>
            </div>
          </StyledWrapper>
        </Card.Contents>
      </Card>

      <div>
        <button onClick={() => openModal(modalData)}>Open Modal</button>
        <Modal modalOption={modalOption} />
      </div>
      <StyledButtonContianer>
        <StyledGridBox>
          <h3>Attendance</h3>
          <Buttons.Attendance disabled>등원 처리</Buttons.Attendance>
          <Buttons.Attendance disabled>하원 처리</Buttons.Attendance>
          <Buttons.Attendance colorTypes="blue">결석 취소</Buttons.Attendance>
          <Buttons.Attendance colorTypes="orange">결석 취소</Buttons.Attendance>
          <Buttons.Attendance colorTypes="perple">결석 취소</Buttons.Attendance>
          <Buttons.Attendance outlined>결석 취소</Buttons.Attendance>
          <Buttons.Attendance outlined>등원 취소</Buttons.Attendance>
          <Buttons.Attendance outlined>하원 취소</Buttons.Attendance>
        </StyledGridBox>

        <StyledGridBox>
          <h3>State</h3>
          <Buttons.State colorTypes="red">미등원</Buttons.State>
          <Buttons.State colorTypes="blue">등원</Buttons.State>
          <Buttons.State colorTypes="perple">결석</Buttons.State>
          <Buttons.State colorTypes="orange">하원</Buttons.State>
        </StyledGridBox>
        <StyledGridBox>
          <h3>NB_Button</h3>
          <Buttons.NB colorTypes="primary">반 페이지</Buttons.NB>
          <Buttons.NB colorTypes="primary" opacity="0.3">
            반 페이지
          </Buttons.NB>
          <Buttons.NB>반 페이지</Buttons.NB>
        </StyledGridBox>

        <StyledGridBox>
          <h3>Filter_All</h3>
          <Buttons.Filter colorTypes="primary">전체기간</Buttons.Filter>
          <Buttons.Filter outlined>전체기간</Buttons.Filter>
          <Buttons.Filter colorTypes="primary">적용하기</Buttons.Filter>
          <Buttons.Filter outlined>적용하기</Buttons.Filter>
        </StyledGridBox>
        <StyledGridBox>
          <h3>Time_Button</h3>
          <Buttons.Time colorTypes="primary">07시 ~ 08시</Buttons.Time>
          <Buttons.Time outlined>07시 ~ 08시</Buttons.Time>
          <Buttons.Time colorTypes="primary" opacity="0.3">
            07시 ~ 08시
          </Buttons.Time>
        </StyledGridBox>
        <StyledGridBox>
          <h3>AB_Button</h3>
          <StyledABBtn>하원 인원</StyledABBtn>
          <Buttons.AB>하원 인원</Buttons.AB>
        </StyledGridBox>
      </StyledButtonContianer>
    </>
  );
};

export default Preview;

const StyledABBtn = styled(Buttons.AB)`
  color: ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.green_darker};
`;

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  img {
    width: 200px;
  }
`;

const StyledWrapper = styled.div`
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
  }
`;

const StyledButtonContianer = styled.div`
  width: 100%;
  height: 1000px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 5px;
`;

const StyledGridBox = styled.div`
  width: 50%;
  height: 150px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  border: 1px solid black;
`;

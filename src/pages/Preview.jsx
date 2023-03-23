import styled from "styled-components";
import { DUMMY_IMG_SRC } from "../assets";
import Card from "../components/Card";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtoms";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";

const Preview = () => {
  const { openModal } = useModal();

  const modalData = {
    title: "modal",
    contents: "modal",
    callback: () => alert("modal"),
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
        <Modal />
      </div>
    </>
  );
};

export default Preview;

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

import styled from "styled-components";
import { DUMMY_IMG_SRC } from "../assets";
import Card from "../components/Card";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Parent from "./Parent";

const Preview = () => {
  return (
    <>
      {/* <Header />
      <SideBar />
      <Parent /> */}
      <Card>
        <Card.Header isClosedIcon={true}>
          <Card.Title>Good</Card.Title>
        </Card.Header>
        <Card.Contents>
          <StyledDiv>
            GoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGoodGood
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

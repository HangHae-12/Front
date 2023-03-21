import React from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getClassesMember } from '../../api/classes/classes';


function ClassMember() {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { isLoading, isError, data } = useQuery(
    ["classesMember"],
    () => getClassesMember(id),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: () => {
        console.log("error");
      },
    }
  );

  const cards = [];
  for (let i = 0; i < 32; i++) {
    cards.push(
      <StyledChildrenCard key={i}>
        <StyledChildrenImage 
          src='https://blog.kakaocdn.net/dn/drkKUz/btrKzPmA6Xi/cLjppsVnQYYF2dggTuvCf0/img.png'/>
        김민지
      </StyledChildrenCard>
    );
  }
  return (
    <>
    <StyledChildrenWrapper>
        <StyledChildernHeader>
            <div>총 32명</div>
            {/* <div>총 {data.length}명</div> */}
            <button style={{marginLeft: "auto"}}>인원 추가</button>
            <input style={{marginLeft: "10px"}}></input>
        </StyledChildernHeader>
        <StyledChildrenContainer>
          {cards}
          {/* {data?.map((item) => {
            return (
              <StyledChildrenCard key={item.data.childId}>
            <StyledChildrenImage 
              src={item.data.imageUrl}
              />
            {item.data.name}
          </StyledChildrenCard>
            );
          })} */}
        </StyledChildrenContainer>
    </StyledChildrenWrapper>
    </>
  )
}

export default ClassMember

const StyledChildrenWrapper = styled.div`
  padding: 0px 0px 20px;
  gap: 40px;
  width: calc(8 * (130px + 16px));
  height: 650px;
  background: #FFFFFF;
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
`

const StyledChildrenContainer = styled.div`
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const StyledChildrenCard = styled.div`
  background: #F5F5F5;
  border-radius: 8px;
  width: 130px;
  height: 130px;
  border: 1px solid #DDDDDD;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 16px;
  box-sizing: border-box;
  margin-left: 10px;
  margin-top: 10px;
`

const StyledChildrenImage = styled.img`
  border-radius: 70%;
  width: 70px;
  height: 70px;
`;
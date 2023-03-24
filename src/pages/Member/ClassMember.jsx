import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { MemberAPI } from "../../api/memberAPI";

function ClassMember() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [searchMember, setSearchMember] = useState("");

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
  }

  const loadMemberSearch = data?.data.data.filter((item) =>
    item.name.includes(searchMember)
  );


  return (
    <>
      <StyledChildrenWrapper>
        <StyledChildernHeader>
          <div>총 {data?.data.data.length}명</div>
          <button style={{ marginLeft: "auto" }}>인원 추가</button>
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
            <StyledChildrenImage 
              src={item.profileImageUrl}
              />
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
  background: #ffffff;
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

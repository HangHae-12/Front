import React, { useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { ManageAPI } from "../../api/ManageAPI";
import textVariants from "../../styles/variants/textVariants";


const InviteList = ({ data, page, userRole }) => {
    const queryClient = useQueryClient();
    const approveMutation = useMutation((id) => ManageAPI.updateApprove(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["getMemberManage", page, userRole]);
        },
    });

    const rejectMutation = useMutation((id) => ManageAPI.updateReject(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["getMemberManage", page, userRole]);
        },
    });

    const handleApprove = (id) => {
        approveMutation.mutate(id);
    };

    const handleReject = (id) => {
        rejectMutation.mutate(id);
    };

    return (
        <StyledInviteList>
            {data?.earlyMemberList?.map((member) => {
                return (
                    <StyledInviteRow key={member.id}>
                        <StyledInviteProfileWrapper>
                            <StyledInviteProfile src={member.profileImageUrl} />
                            <StyledInviteProfileName>
                                {member.name}
                            </StyledInviteProfileName>
                        </StyledInviteProfileWrapper>
                        <StyledInviteButtonWrapper>
                            <StyledApproveButton onClick={() => handleApprove(member.id)}>승인</StyledApproveButton>
                            <StyledRejectButton onClick={() => handleReject(member.id)}>거절</StyledRejectButton>
                        </StyledInviteButtonWrapper>
                    </StyledInviteRow>
                );
            })}
        </StyledInviteList>
    );
};

export default InviteList;

const StyledInviteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 360px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.grayScale[200]};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.color.grayScale[50]};
  }
  @media ${({ theme }) => theme.device.desktop} {
    max-height: 570px;
  }
`;

const StyledInviteRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 4px;
`;

const StyledInviteProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap:8px;
`;

const StyledInviteProfile = styled.img`
  border-radius: 70%;
  width: 40px;
  height: 40px;

  @media ${({ theme }) => theme.device.desktop} {
    width: 40px;
    height: 40px;
  }

  @media ${({ theme }) => theme.device.laptop} {
    width: 70px;
    height: 70px;
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 30px;
    height: 30px;
  }
`;
const StyledInviteProfileName = styled.div`
${textVariants.Body2_SemiBold}
  display: flex;
  justify-content: center;
  align-items: center;
  color:${({ theme }) => theme.color.grayScale[600]};

`
const StyledInviteButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap:8px;
`;

const StyledApproveButton = styled.button`
${textVariants.Body2_SemiBold}
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.grayScale[400]};
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  :hover{
    background-color: ${({ theme }) => theme.color.blue_lighter};
    color: ${({ theme }) => theme.color.blue};
  }
`;

const StyledRejectButton = styled.button`
${textVariants.Body2_SemiBold}
    background-color: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.grayScale[400]};
    border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;

  :hover{
    background-color: ${({ theme }) => theme.color.red_lighter};
    color: ${({ theme }) => theme.color.red};
  }
`;
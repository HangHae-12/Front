import styled from "styled-components";
import textVariants from "../../styles/variants/textVariants";
import { BsFillGearFill } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import { userProfileAtom } from "../../atom/sideBarAtom";

const TeacherProfile = ({ data, setTeacherAppoint }) => {
  const userRole = useRecoilValue(userProfileAtom);
  return (
    <StyledWrapper>
      <StyledProfileWrapper>
        <StyledChangeTeacher>
          <StyledChangeText>담임 선생님</StyledChangeText>
          {userRole.role === "PRINCIPAL" ? (
            <StyledGearButton
              marginLeft="8px"
              onClick={() => setTeacherAppoint()}
            />
          ) : null}
        </StyledChangeTeacher>
        <StyledProfileImage src={data?.classroomTeacher?.profileImageUrl} />
      </StyledProfileWrapper>
      <StyledInfo>
        <StyledOneWord>
          <StyledOneWordLabel>성함</StyledOneWordLabel>
          <StyledOneWordText>{data?.classroomTeacher?.name}</StyledOneWordText>
        </StyledOneWord>
        <StyledOneWord>
          <StyledOneWordLabel>한 마디</StyledOneWordLabel>
          <StyledOneWordText>
            {data?.classroomTeacher?.resolution}{" "}
          </StyledOneWordText>
        </StyledOneWord>
        <StyledOneWord>
          <StyledOneWordLabel>이메일</StyledOneWordLabel>
          <StyledOneWordText>{data?.classroomTeacher?.email}</StyledOneWordText>
        </StyledOneWord>
      </StyledInfo>
    </StyledWrapper>
  );
};

export default TeacherProfile;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    gap: 40px;
  }
  @media ${({ theme }) => theme.device.laptop} {
    flex-direction: column;
    gap: 60px;
  }
`;

const StyledProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 100px;
  @media ${({ theme }) => theme.device.mobile} {
    margin-right: 0;
    margin-bottom: 16px;
  }
`;

const StyledProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;
const StyledChangeTeacher = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const StyledChangeText = styled.div`
  ${textVariants.Body2_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-right: 8px;
  @media ${({ theme }) => theme.device.mobile} {
    margin-top: 20px;
  }
  @media ${({ theme }) => theme.device.laptop} {
    margin-top: 20px;
  }
`;

const StyledGearButton = styled(BsFillGearFill)`
  width: 12px;
  height: 12px;
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-left: ${({ marginLeft }) => marginLeft};
`;
const StyledOneWord = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.grayScale[50]};
  padding: 16px;
  margin-bottom: 8px;
`;

const StyledOneWordLabel = styled.div`
  ${textVariants.Body2_SemiBold}
  font-weight: bold;
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-right: 8px;
  min-width: 60px;
`;

const StyledOneWordText = styled.div`
  ${textVariants.Body1_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  white-space: pre-wrap;
  word-wrap: break-word;
`;

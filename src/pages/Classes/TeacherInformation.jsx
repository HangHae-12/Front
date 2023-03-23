import React from "react";
import styled from "styled-components";
import { GrAddCircle } from "react-icons/gr";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getClassesPage, setClassesTeacher } from "../../api/classes";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

function TeacherInformation() {
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();

  const handleChange = () => {
    setEditMode(true);
  };

  const { isLoading, isError, data } = useQuery(
    ["ClassesPage"],
    () => getClassesPage(id),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: () => {
        console.log("error");
      },
    }
  );

  const setTeacherMutation = useMutation(setClassesTeacher, {
    onSuccess: () => {
      queryClient.invalidateQueries("ClassesPage");
    },
  })

  const handleSave = async (id) => {
    const formData = new FormData();
    formData.append("image", image);

    const payload ={
      id: id,
      image: formData.get("image"),
    }
    setEditMode(false);
    console.log(payload);
    for (const keyValue of formData) console.log(keyValue);
    setTeacherMutation.mutate(payload);
  };

  const saveImgFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    setImage(file);
  };

  return (
    <>
      {editMode ? (
        <StInfomation>
          <StContentWrapper>
            <StLeftWrapper>
              <div>담임선생님</div>
              <StIconWrapper>
                <label
                  htmlFor="upload-img"
                  id="upload-img-label"
                  style={{ display: "block" }}
                >
                <GrAddCircle  style={{ fontSize: 90 }}/>
                  <StTeacherImage>
                    <input
                      type="file"
                      name="upload-img"
                      id="upload-img"
                      accept="image/*"
                      aria-hidden="false"
                      tabIndex="0"
                      onChange={saveImgFile}
                    />
                    {preview ? (
                      <img
                        src={preview}
                        style={{
                          width: "90px",
                          height: "90px",
                          position: "absolute",
                          marginLeft: "100px",
                          marginTop: "10px",
                          borderRadius: "70%",
                        }}
                      />
                    ) : null}
                  </StTeacherImage>
                </label>
              </StIconWrapper>
              <StInput marginLeft="0px" maxWidth="180px" />
            </StLeftWrapper>
            <StBox>
              <StInputWrapper>
                <StFont>선생님의 한마디 </StFont>
                <StInput marginLeft="80px" maxWidth="500px" />
              </StInputWrapper>
              <br />
              <StInputWrapper>
                <div>
                  나이 <StInput marginLeft="165px" maxWidth="140px" />
                </div>
                <div>
                  <StForm marginLeft="60px">
                    연락처 <StInput maxWidth="220px" />
                  </StForm>
                </div>
              </StInputWrapper>
              <StInputWrapper>
                <div>
                  생년월일 <StInput maxWidth="220px" />
                </div>
                <div>
                  <StForm>
                    메일 <StInput maxWidth="220px" />
                  </StForm>
                </div>
              </StInputWrapper>
            </StBox>
            <StButton onClick={(e) => handleSave(id)}>저장하기</StButton>
          </StContentWrapper>
        </StInfomation>
      ) : (
        <StInfomation>
          <StContentWrapper>
            <StLeftWrapper>
              <div>담임선생님</div>
              <StIconWrapper>
                <GrAddCircle  style={{ fontSize: 90 }}/>
              </StIconWrapper>
              <StSpan marginLeft="0px">황재연</StSpan>
            </StLeftWrapper>
            <StBox>
              <StInputWrapper>
                <StFont>선생님의 한마디 </StFont>
                <StSpan marginLeft="0px">말 안 들을 때는 매가 답이다</StSpan>
              </StInputWrapper>
              <br />
              <StInputWrapper>
                <div>
                  나이 <StSpan marginLeft="150px">27</StSpan>
                </div>
                <div>
                  <StForm marginLeft="60px">
                    연락처 <StSpan>010-9985-3743</StSpan>
                  </StForm>
                </div>
              </StInputWrapper>
              <StInputWrapper>
                <div>
                  생년월일 <StSpan>1997-08-25</StSpan>
                </div>
                <div>
                  <StForm marginLeft="100px">
                    메일 <StSpan marginLeft="25px">wodus604@naver.com</StSpan>
                  </StForm>
                </div>
              </StInputWrapper>
            </StBox>
            <StButton onClick={handleChange}>수정하기</StButton>
          </StContentWrapper>
        </StInfomation>
      )}
    </>
  );
}

export default TeacherInformation;

const StInfomation = styled.div`
  padding: 7px 133px 16px 36px;
  background: #ffffff;
  border-radius: 8px;
  gap: 20px;
  width: 1190px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const StContentWrapper = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const StInput = styled.input`
  width: ${({ maxWidth }) => (maxWidth ? `calc(${maxWidth} - 120px)` : "100%")};
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : "60px")};
  margin-top: 10px;

  @media screen and (max-width: 600px) {
    margin-left: 0;
    margin-top: 5px;
  }
`;
const StSpan = styled.span`
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : "60px")};
  margin-top: 10px;

  @media screen and (max-width: 600px) {
    margin-left: 0;
    margin-top: 5px;
  }
`;

const StBox = styled.div`
  margin-left: 40px;
  margin-top: 50px;

  @media screen and (max-width: 600px) {
    margin-left: 0;
    margin-top: 10px;
  }
`;

const StForm = styled.span`
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : "20px")};
`;

const StInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
  }
`;
const StButton = styled.button`
  margin-top: 150px;
  margin-left: auto;

  @media screen and (max-width: 600px) {
    margin-top: 20px;
  }
`;
const StLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 40px;
`;

const StIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
const StFont = styled.div``;
const StTeacherImage = styled.div`
  position: relative;
  top: -60%;
  width: 0px;
  height: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

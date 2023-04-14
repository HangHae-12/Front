import styled from "styled-components";
import StyledChildManage from "./styled";
import { useReducer, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ChildManageAPI from "../../api/ChildManageAPI";
import { useRecoilState } from "recoil";
import EnterTimeDropdown from "./EnterTimeDropdown";
import ExitTimeDropdown from "./ExitTimeDropdown";
import Buttons from "../../components/Buttons";
import textVariants from "../../styles/variants/textVariants";

const CommuteTimes = () => {
  const queryClient = useQueryClient();
  const [isFixMode, setIsFixMode] = useState(false);
  // const childId = useRecoilState(childListAtom)[0].id;
  const childId = 1;

  const { data } = useQuery(
    ["childSchedule"],
    () => ChildManageAPI.getChildSchedule(childId),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { mutate } = useMutation(ChildManageAPI.putChildSchedule, {
    onSuccess: () => {
      // 모달 띄우기
      // openModal({ contents: <SuccessModal /> });
      // queryClient.invalidateQueries(["childSchedule"]);
    },
    onError: () => {
      // 에러 모달 띄우기
      // openModal({contents: <AlertModal /> });
    },
  });

  const reduceSchedule = (state, action) => {
    switch (action.type) {
      case "SET_ENTER_TIME":
        return { ...state, dailyEnterTime: action.payload };
      case "SET_EXIT_TIME":
        return { ...state, dailyExitTime: action.payload };
      default:
        return state;
    }
  };

  const [scheduleState, dispatch] = useReducer(reduceSchedule, {
    dailyEnterTime: data?.dailyEnterTime,
    dailyExitTime: data?.dailyExitTime,
  });

  const handleEnterTime = (time) => {
    dispatch({ type: "SET_ENTER_TIME", payload: time });
  };

  const handleExitTime = (time) => {
    dispatch({ type: "SET_EXIT_TIME", payload: time });
  };

  const isChangeSchedule = () => {
    return (
      data?.dailyEnterTime !== scheduleState.dailyEnterTime ||
      data?.dailyExitTime !== scheduleState.dailyExitTime
    );
  };

  const handleFixChildSchedule = () => {
    setIsFixMode((prev) => !prev);
    if (isFixMode && isChangeSchedule()) {
      mutate({ childId: childId, data: scheduleState });
    }
  };
  return (
    <StyledCommuteTimes.Wrapper>
      <div>
        <StyledChildManage.Title>등/하원 시간</StyledChildManage.Title>
        <StyledCommuteTimes.DropdownWrapper>
          <StyledCommuteTimes.DropdownBox>
            <h2>등원 시간</h2>
            <EnterTimeDropdown
              defaultTime={data?.dailyEnterTime}
              isFixMode={isFixMode}
              onChangeTime={handleEnterTime}
            />
          </StyledCommuteTimes.DropdownBox>
          <StyledCommuteTimes.DropdownBox>
            <h2>하원 시간</h2>
            <ExitTimeDropdown
              defaultTime={data?.dailyExitTime}
              isFixMode={isFixMode}
              onChangeTime={handleExitTime}
            />
          </StyledCommuteTimes.DropdownBox>
        </StyledCommuteTimes.DropdownWrapper>
      </div>
      <StyledCommuteTimes.BtnWrapper>
        <Buttons.Filter
          colorTypes={!isFixMode ? "" : "primary"}
          outlined={!isFixMode}
          onClick={handleFixChildSchedule}
        >
          {!isFixMode ? "수정하기" : "수정완료"}
        </Buttons.Filter>
      </StyledCommuteTimes.BtnWrapper>
    </StyledCommuteTimes.Wrapper>
  );
};

export default CommuteTimes;

const StyledCommuteTimes = {
  Wrapper: styled(StyledChildManage.Card)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    height: 100%;
  `,
  DropdownWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-top: 24px;
  `,
  DropdownBox: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h2 {
      ${textVariants.H3_SemiBold}
      color: ${({ theme }) => theme.color.grayScale[500]}
    }
  `,
  BtnWrapper: styled.div`
    width: 100%;
    text-align: end;
  `,
};

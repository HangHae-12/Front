import styled from "styled-components";
import StyledChildManage from "./styled";
import { useEffect, useReducer, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ChildManageAPI from "../../api/ChildManageAPI";
import { useRecoilState } from "recoil";
import EnterTimeDropdown from "./EnterTimeDropdown";
import ExitTimeDropdown from "./ExitTimeDropdown";
import Buttons from "../../components/Buttons";
import textVariants from "../../styles/variants/textVariants";
import { childListAtom } from "../../atom/sideBarAtom";
import SuccessModal from "../../components/Modals/SuccessModal";
import AlertModal from "../../components/Modals/AlertModal";
import useModal from "../../hooks/useModal";

const CommuteTimes = () => {
  const queryClient = useQueryClient();
  const [isFixMode, setIsFixMode] = useState(false);
  const childId = useRecoilState(childListAtom)[0][0]?.childId;
  const { openModal } = useModal();

  const { data } = useQuery(
    ["childSchedule"],
    () => ChildManageAPI.getChildSchedule(childId),
    {
      refetchOnWindowFocus: false,
      enabled: !!childId,
    }
  );

  const { mutate } = useMutation(ChildManageAPI.putChildSchedule, {
    onSuccess: (res) => {
      console.log(res);
      openModal({ contents: <SuccessModal /> });
      queryClient.invalidateQueries(["childSchedule"]);
    },
    onError: () => {
      openModal({ contents: <AlertModal /> });
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

  const [scheduleState, dispatch] = useReducer(reduceSchedule, {});

  useEffect(() => {
    if (data) {
      dispatch({
        type: "SET_ENTER_TIME",
        payload: data?.data?.data.dailyEnterTime,
      });
      dispatch({
        type: "SET_EXIT_TIME",
        payload: data?.data?.data.dailyExitTime,
      });
    }
  }, [data]);

  const handleEnterTime = (time) => {
    dispatch({ type: "SET_ENTER_TIME", payload: time });
  };

  const handleExitTime = (time) => {
    dispatch({ type: "SET_EXIT_TIME", payload: time });
  };

  const isChangeSchedule = () => {
    return (
      data?.data?.data.dailyEnterTime !== scheduleState.dailyEnterTime ||
      data?.data?.data.dailyExitTime !== scheduleState.dailyExitTime
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
              defaultTime={data?.data?.data?.dailyEnterTime}
              isFixMode={isFixMode}
              onChangeTime={handleEnterTime}
            />
          </StyledCommuteTimes.DropdownBox>
          <StyledCommuteTimes.DropdownBox>
            <h2>하원 시간</h2>
            <ExitTimeDropdown
              defaultTime={data?.data?.data?.dailyExitTime}
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
    /* flex: 1;
    min-width: 400px; */
    width: 400px;
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

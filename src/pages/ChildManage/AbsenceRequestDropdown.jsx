import { css } from "styled-components";
import Dropdown from "../../components/Dropdown";

const absentReasonList = [
  "질병, 부상",
  "부모의 출산",
  "미세먼지",
  "자연재해, 재난",
  "경조사",
  "부모입원",
  "입양",
  "기타",
];

const AbsenceRequestDropdown = ({ absenceReason, setAbsenceReason }) => {
  const handleReasonSelect = (selected) => {
    setAbsenceReason(selected);
  };

  const buttonStyle = css`
    width: 100%;
    height: 40px;
    border-radius: 4px;
    justify-content: space-between;
    background: ${({ theme }) => theme.color.grayScale[50]};
  `;

  const containerStyle = css`
    width: 100%;
    justify-content: space-between;
  `;

  const menuStyle = css`
    width: 100%;
  `;

  return (
    <Dropdown
      buttonLabel={absenceReason}
      containerStyle={containerStyle}
      buttonStyle={buttonStyle}
      menuStyle={menuStyle}
    >
      {absentReasonList.map((reason) => (
        <Dropdown.Item key={reason} onClick={() => handleReasonSelect(reason)}>
          {reason}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default AbsenceRequestDropdown;

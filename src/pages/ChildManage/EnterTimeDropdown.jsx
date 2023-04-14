import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";

const EnterTimeDropdown = ({ defaultTime, isFixMode, onChangeTime }) => {
  const enterTime = ["08시~09시", "09시~10시", "10시~11시"];
  const [selectedTime, setSelectedTime] = useState(enterTime[0]);

  useEffect(() => {
    setSelectedTime(defaultTime);
  }, [defaultTime]);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    onChangeTime(time);
  };

  return (
    <Dropdown buttonLabel={selectedTime} isReadOnly={!isFixMode}>
      {enterTime.map((time) => (
        <Dropdown.Item key={time} onClick={() => handleTimeChange(time)}>
          {time}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};
export default EnterTimeDropdown;

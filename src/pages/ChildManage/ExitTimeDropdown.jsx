import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";

const ExitTimeDropdown = ({ defaultTime, isFixMode, onChangeTime }) => {
  const exitTime = ["16시~17시", "17시~18시", "18시~19시"];
  const [selectedTime, setSelectedTime] = useState(exitTime[0]);

  useEffect(() => {
    setSelectedTime(defaultTime);
  }, [defaultTime]);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    onChangeTime(time);
  };

  return (
    <Dropdown buttonLabel={selectedTime} isReadOnly={!isFixMode}>
      {exitTime.map((time) => (
        <Dropdown.Item key={time} onClick={() => handleTimeChange(time)}>
          {time}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};
export default ExitTimeDropdown;

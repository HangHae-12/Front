const getDate = {
  isSaturday: (selectedDate, day) => {
    const date = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      day
    );
    return date.getDay() === 6;
  },
  isSunday: (selectedDate, day) => {
    const date = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      day
    );
    return date.getDay() === 0;
  },
};

export default getDate;

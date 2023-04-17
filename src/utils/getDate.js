const getDate = {
  isSunday: (date) => {
    const day = new Date(date).getDay();
    return day === 0;
  },
};

export default getDate;

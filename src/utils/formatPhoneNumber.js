const formatPhoneNumber = (value) => {
  return value
    .replace(/\D+/g, "")
    .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
    .substring(0, 13);
};

export default formatPhoneNumber;

const formatPhoneNumber = (e) => {
  e.target.value = e.target.value
    .replace(/[^0-9]/g, "")
    .replace(/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g, "$1-$2-$3");
};

export default formatPhoneNumber;

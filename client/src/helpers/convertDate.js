export const convertDate = (date) => {
    if (!date) return date;
    let arr = date.toString().split(" ");
    return `${arr[3]}-${convertMonth(arr[1])}-${arr[2]}`;
  };

export const reverseDate = (date) => {
  if (!date) return date;
  let arr = date.split('-').reverse().join('-')
  return arr
};

const convertMonth = (monthStr) => {
    switch (monthStr) {
      case "Jan":
        return "01";
      case "Feb":
        return "02";
      case "Mar":
        return "03";
      case "Apr":
        return "04";
      case "May":
        return "05";
      case "Jun":
        return "06";
      case "Jul":
        return "07";
      case "Aug":
        return "08";
      case "Sep":
        return "09";
      case "Oct":
        return "10";
      case "Nov":
        return "11";
      case "Dec":
        return "12";
      default:
        return;
    }
  };



  
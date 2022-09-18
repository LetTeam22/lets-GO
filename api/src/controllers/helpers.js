const sortBookings = (bookings) => {
  bookings.sort((a, b) => a.endDate < b.endDate ? -1 : a.endDate > b.endDate ? 1 : 0)
  bookings.sort((a, b) => a.startDate < b.startDate ? -1 : a.startDate > b.startDate ? 1 : 0)
  const arrCamino = []
  const arrFinalizada = []
  const arrCancelada = []
  bookings.forEach(b => {
    if (b.status === 'cancelled') return arrCancelada.push(b)
    const todayToModify = new Date();
    const today = convertDate(todayToModify)
    if (b.endDate < today) return arrFinalizada.push(b)
    arrCamino.push(b)
  });
  const sortedBookings = [...arrCamino, ...arrFinalizada, ...arrCancelada]
  return sortedBookings
}

const convertDate = (date) => {
    if (!date) return date;
    let arr = date.toString().split(" ");
    return `${arr[3]}-${convertMonth(arr[1])}-${arr[2]}`;
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

module.exports = {
  sortBookings
}

  
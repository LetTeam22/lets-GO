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

  const getBookingsPerYear = ({bookings, year}) => {
    // filtra las reservas por un año en particular
    const getFilterBookingsPerYear = ({ bookings, year }) => {
        return bookings.filter(book => {
            const [yearBook] = book.startDate.split("-");
            return yearBook === year
        })
    }

    /* crea un arreglo de objetos que tiene los meses y la cantidad de bicicletas, 
    accesorios o aventuras que se reservaron en ese mes.
    Ej: [{ month: 'Enero', bikes: 5, accesories: 8, adventures: 0}, ...] */
    const getBookingsByMonths = ({ bookings }) => {
      const objElements = {}
      const elements = ['bikes', 'adventures', 'accesories']
      elements.forEach(el => {
        objElements[el] = []
      })
      const allMonths = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre", 
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];
      const objMonth = allMonths.map((month) => {
        return {
          month, 
          ...objElements
        }
      }) 
      bookings.forEach((book) => {
        const month = book.startDate.split('-')[1]
        const index = Number(month)
        elements.forEach(el => {
          objMonth[index][el] = objMonth[index][el].concat(book[el])
        })
      });
      return objMonth;
    };
    const yearBookings = getFilterBookingsPerYear({bookings, year})
    return getBookingsByMonths({ bookings:yearBookings })
  }

  const getCompletedBookings = ({bookings, accesories, adventures, bikes}) => {
    // agrega la cantidad 
    const getUniqueNames = (elements, value) => {
      const element = elements.map(e => e[value])
      const uniques = new Set(element)
      return Array.from(uniques)
    }

    // const typeBikes = bikes.map(bike => bike.type)

    const uniqueAccesories = getUniqueNames(accesories, 'name')

    const uniqueAdventures = getUniqueNames(adventures, 'name')

    const uniqueTypeBikes = getUniqueNames(bikes, 'type')

    const uniqueTractionBikes = getUniqueNames(bikes, 'traction')

    const uniqueColorBikes = getUniqueNames(bikes, 'color')

    const uniqueWheelSize = getUniqueNames(bikes, 'wheelSize')

    return uniqueTypeBikes
  }


module.exports = {
  sortBookings,
  getBookingsPerYear,
  getCompletedBookings
}

  
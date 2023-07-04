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
        const month = book.startDate.split('-')[1] - 1
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
    // obtiene los accesorios, aventuras y las caracteristicas de las bicis
    const getDbNames = (elements, value) => {
      const element = elements.map(e => {
        return value === 'name'? e[value].replaceAll(' ', '_') : e[value]
      })
      const uniques = new Set(element)
      return Array.from(uniques)
    }
    const dbAccesories = getDbNames(accesories, 'name')
    const dbAdventures = getDbNames(adventures, 'name')
    const dbTypeBikes = getDbNames(bikes, 'type')
    const dbTractionBikes = getDbNames(bikes, 'traction')
    const dbColorBikes = getDbNames(bikes, 'color')
    const dbWheelSize = getDbNames(bikes, 'wheelSize')

    // aca empieza la funcion
    
    const result = bookings.map((book) => {
      const { month, accesories, adventures, bikes } = book;

      const getAccAndAdvDescription = (dbElements, bookElements) => {
        return dbElements.map((element) => {
          const count = bookElements.filter((el) => {
            const elementName = el?.name.replaceAll(' ', '_')
            return elementName === element
          }).length
          return { [element]: count };
        });
      }
      const getBikesDescription = ({dbBikes, characteristic}) => {
        return dbBikes.map((charac) => {
          const count = bikes.filter((b) => b[characteristic] === charac).length;
          return { [charac]: count };
        })
      }
        
      const accessoriesDescription = getAccAndAdvDescription(dbAccesories, accesories)
  
      const adventuresDescription = getAccAndAdvDescription(dbAdventures, adventures)
  
      const bikesDescription = {
        type: getBikesDescription({dbBikes: dbTypeBikes, characteristic: 'type'}),
        color: getBikesDescription({dbBikes: dbColorBikes, characteristic: 'color'}),
        traction: getBikesDescription({dbBikes: dbTractionBikes, characteristic: 'traction'}),
        wheelSize: getBikesDescription({dbBikes: dbWheelSize, characteristic: 'wheelSize'})
      };
    
      return {
        month,
        accessories: {
          total: accesories.length,
          description: accessoriesDescription
        },
        adventures: {
          total: adventures.length,
          description: adventuresDescription
        },
        bikes: {
          total: bikes.length,
          description: bikesDescription
        }
      };
    });

    return result;
  }


  const generateAdditionalData = (data, count) => {
    const additionalData = [];
  
    for (let i = 0; i < count; i++) {
      data.forEach((item) => {
        const newItem = { ...item };
  
        // Generar información inventada para las propiedades adicionales
        newItem.startDate = generateRandomDate();
        newItem.endDate = generateRandomDate();
        newItem.userId = generateRandomUserId();
        newItem.bikeIds = generateRandomBikeIds();
        newItem.AccIds = generateRandomAccIds();
        newItem.totalPrice = generateRandomPrice();
        newItem.adventureNames = generateRandomAdventureNames();
  
        additionalData.push(newItem);
      });
    }
  
    return additionalData;
  };
  
  // Funciones para generar información aleatoria
  const generateRandomDate = () => {
    const start = new Date(2022, 0, 1); // 1 de enero de 2022
    const end = new Date(2022, 11, 31); // 31 de diciembre de 2022
    const randomTimestamp = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTimestamp);
  
    // Formatear la fecha como "yyyy-mm-dd"
    const formattedDate = randomDate.toISOString().split('T')[0];
  
    return formattedDate;
  };
  
  const generateRandomUserId = () => {
    return Math.floor(Math.random() * 10) + 1; // Generar un ID de usuario aleatorio del 1 al 10
  };
  
  const generateRandomBikeIds = () => {
    const bikeIds = [];
  
    for (let i = 0; i < 3; i++) {
      const randomId = Math.floor(Math.random() * 33) + 1; // Generar un ID de bicicleta aleatorio del 1 al 33
      bikeIds.push(randomId);
    }
  
    return bikeIds;
  };
  
  const generateRandomAccIds = () => {
    const accIds = [];
  
    for (let i = 0; i < 3; i++) {
      const randomId = Math.floor(Math.random() * 8) + 1; // Generar un ID de accesorio aleatorio del 1 al 8
      accIds.push(randomId);
    }
  
    return accIds;
  };
  
  const generateRandomPrice = () => {
    return Math.floor(Math.random() * 5000) + 1000; // Generar un precio aleatorio entre 1000 y 6000
  };
  
  const generateRandomAdventureNames = () => {
    const adventureNames = [];
  
    const randomNum = Math.random();
  
    if (randomNum < 0.5) {
      adventureNames.push('Trasmontaña');
    } else if (randomNum < 0.8) {
      adventureNames.push('Escapada a Tafí del Valle');
    }
    // Puedes agregar más aventuras inventadas aquí según tus necesidades
  
    return adventureNames;
  };

module.exports = {
  sortBookings,
  getBookingsPerYear,
  getCompletedBookings,
  generateAdditionalData
}

  
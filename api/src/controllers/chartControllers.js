const { User, Experience, Booking, Bike, Contact, Accesories, Adventures } = require("../db.js");
const { sortBookings, getBookingsPerYear, getCompletedBookings } = require('./helpers');

// Devuelve todas las experiencias
async function getSentimentsStats(req, res, next) {
  try {
    const experiences = await Experience.findAll({
      include: {
        model: Booking,
        attributes: ["startDate", "endDate", "userIdUser"],
        include: [
          {
            model: User,
            attributes: ["email"],
          },
          {
            model: Bike,
            attributes: ["name"],
          },
        ],
      },
      order: [["idExperience", "DESC"]],
    });
    const contacts = await Contact.findAll();

    const countSentiments = ({ name, type, arraySentiments }) => {
      const sentiments = {
        type,
        name,
        Positivo: 0,
        Negativo: 0,
        Neutro: 0,
      };
      const copy = { ...sentiments };
      arraySentiments.forEach((element) => {
        copy[element.sentiment] += 1;
      });
      return copy;
    };
    const experienceSentiments = countSentiments({
      name: "Experiencias",
      type: "sentiment",
      arraySentiments: experiences,
    });
    const contactSentiments = countSentiments({
      name: "Contactos",
      type: "sentiment",
      arraySentiments: contacts,
    });

    const data = [experienceSentiments, contactSentiments];
    res.send(data);
  } catch (error) {
    next(error);
  }
}

// devuelve las ganancias en la fecha pasada por params
const getEarnings = async (req, res, next) => {
  const { year } = req.params;
  // LO IDEAL SERIA PONER EL CORRIENTE AÑO   new Date().getFullYear().toString()
  // PERO NO TENEMOS NINGUNA RESERVA EN 2023
  try {
    if (isNaN(Number(year)) || year.length !== 4)
      return res
        .status(400)
        .send({ message: "Debe enviar un año en formato YYYY" });

    const bookings = await Booking.findAll();
    const bookingsFiltered = bookings.filter(
      (book) => book.status === "confirmed"
    );

    const bookingsByDates = ({ year, arrayBookings }) => {
      const sameDate = arrayBookings.filter((book) => {
        const startBooking = book.startDate.split("-")[0];
        return year === startBooking;
      });
      const totalEarnings = sameDate.reduce(
        (acc, curr) => acc + curr.totalPrice,
        0
      );
      const YearEarnings = {
        name: "Ganancias", type: "Year", year, earnings: totalEarnings};
      const allMonths = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];
      const objMonths = allMonths.map((month) => {
        return {
          month,
          earnings: 0,
        };
      });

      sameDate.forEach((book) => {
        const month = book.startDate.split("-")[1];
        objMonths[Number(month)].earnings += book.totalPrice;
      });

      const monthsEarnings = {
        name: "Ganancias",
        type: "Month",
        earnings: objMonths,
      };
      res.send([YearEarnings, monthsEarnings]);
    };
    const bookingsEarnings = bookingsByDates({
      year,
      arrayBookings: bookingsFiltered,
    });
    res.status(200).send(bookingsEarnings);
  } catch (error) {
    next(error);
  }
};

const getYearBookings = async (req, res, next) => {
  const { year } = req.params

  try{

      const allBookings = await Booking.findAll({
        include: [
          {
            model: Bike,
            attributes: ['type', 'traction', 'wheelSize', 'color'],
            through: {
              attributes: []
            }
          },
          {
            model: Accesories,
            attributes: ['name'],
            through: {
              attributes: []
            }
          },
          {
            model: Adventures,
            attributes: ['name'],
            through: {
              attributes: []
            }
          }
        ]
      })
    // ordenar fechas de menor a mayor y por estado
    const sortedBookings = sortBookings (allBookings)

    const monthlyBookings = getBookingsPerYear({bookings:sortedBookings, year })

    // llamar a todas las aventuras y accesorios para tener las cantidades
    const accesories = await Accesories.findAll({
      attributes: ['name']
    })

    const adventures = await Adventures.findAll({
      attributes: ['name']
    })

    const bikes = await Bike.findAll({
      attributes: ['type', 'traction', 'color', 'wheelSize']
    })
    const completeBookings = getCompletedBookings({bookings:monthlyBookings, accesories, adventures, bikes })
    
    res.send(completeBookings)
  } 
  catch (error) {
    next(error);
  }

}

module.exports = {
  getSentimentsStats,
  getEarnings,
  getYearBookings
};

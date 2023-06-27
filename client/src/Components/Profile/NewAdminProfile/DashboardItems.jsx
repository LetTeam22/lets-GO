import React from "react";
import Bookings from "../AdminProfile/Bookings";
import Users from "../AdminProfile/Users";
import Bikes from "../AdminProfile/Bikes";
import Experiences from "../AdminProfile/Experiences";
import Adventures from "../AdminProfile/Adventures";
import Accesories from "../AdminProfile/Accesories";
import Contacto  from "../AdminProfile/Contacto";
import { ChartSentiment }  from "../AdminProfile/ChartSentiment"
import { ChartEarnings } from "../AdminProfile/ChartEarnings";

export const dashboardItems = [
  {
    value: "Reservas",
    table: <Bookings />,
  },
  {
    value: "Inventario",
    table: null,
    childrens: [
      {
        value: "Bicicletas",
        table: <Bikes />,
      },
      {
        value: "Accesorios",
        table: <Accesories />,
      },
      {
        value: "Aventuras",
        table: <Adventures />,
      }
    ]
  },
  {
    value: "Usuarios",
    table: <Users />,
  },
  {
    value: "Interacciones",
    table: null,
    childrens: [
      {
        value: "Experiencias",
        table: <Experiences />,
      },
      {
        value: "Form. Contacto",
        table: <Contacto />,
      }
    ]
  },
  {
    value: "Métricas",
    table: null,
    childrens: [
      {
        value: 'Sentimientos',
        table: <ChartSentiment />,
      },
      {
        value: 'Ganancias',
        table: <ChartEarnings />,
      }
      
    ]
  },
];


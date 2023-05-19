import React from "react";
import Bookings from "../AdminProfile/Bookings";
import Users from "../AdminProfile/Users";
import Bikes from "../AdminProfile/Bikes";
import Experiences from "../AdminProfile/Experiences";
import Adventures from "../AdminProfile/Adventures";
import Accesories from "../AdminProfile/Accesories";

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
    value: "Experiencias",
    table: <Experiences />,
  },
];

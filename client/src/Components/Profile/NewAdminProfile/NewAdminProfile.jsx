import React, { useState } from "react";
import s from "./NewAdminProfile.module.css";
import { Button } from "./Button/Button";
import { dashboardItems } from "./DashboardItems";
import Bookings from "../AdminProfile/Bookings";

export const NewAdminProfile = () => {
  const [showTable, setShowTable] = useState(<Bookings />);
  const [active, setActive] = useState("Reservas");

  const handleClick = (table, value) => {
    setShowTable(table);
    setActive(value);
  };

  return (
    <section className={s.panel}>
      <div className={s.lateral}>
        {dashboardItems.map(({ value, table, childrens }) => {
          return (
            <Button
              onClick={handleClick}
              active={active}
              value={value}
              table={table}
              childrens={childrens}
            >
              {value}
            </Button>
          );
        })}
      </div>
      <aside className={s.tables}>{showTable}</aside>
    </section>
  );
};

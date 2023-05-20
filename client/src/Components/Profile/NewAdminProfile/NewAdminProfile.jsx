import React, { useState } from "react";
import s from "./NewAdminProfile.module.css";
import { Button } from "./Button/Button";
import { dashboardItems } from "./DashboardItems";
import Bookings from "../AdminProfile/Bookings";
import { AdminData } from "./AdminData/AdminData";

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
        <AdminData />
        <div className={s.buttons}>
          {dashboardItems.map(({ value, table, childrens }) => {
            return (
              <Button
                onClick={handleClick}
                active={active}
                value={value}
                table={table}
                childrens={childrens}
                key={value}
              >
                {value}
              </Button>
            );
          })}
        </div>
      </div>

      <aside className={s.tables}>{showTable}</aside>
    </section>
  );
};

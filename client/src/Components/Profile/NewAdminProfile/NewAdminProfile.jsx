import React, { useState } from "react";
import s from "./NewAdminProfile.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "./Button/Button";
import { dashboardItems } from "./DashboardItems";
import Bookings from "../AdminProfile/Bookings";
import RenderProfilePic from '../../Cloudinary/renderProfilePic';


export const NewAdminProfile = () => {

  const image = "https://res.cloudinary.com/pflet/image/upload/v1662686111/Let/image/persona_logeada_hatkhk.png"
  const userLogged = useSelector(state => state.user);
  const [showTable, setShowTable] = useState(<Bookings />);
  const [active, setActive] = useState("Reservas");


  const handleClick = (table, value) => {
    setShowTable(table);
    setActive(value);
  };

  const showedName = (userLogged.firstName && userLogged.lastName)
    ? `${userLogged.firstName} ${userLogged.lastName}`
    : userLogged.firstName ? userLogged.firstName : userLogged?.email

  return (
    <section className={s.panel}>

      <div className={s.lateral}>

        <div className={s.containerUs}>
            <div className={s.containerImg}>
              {userLogged?.profilePic ?
                <Link to='/editProfile'>
                  <RenderProfilePic publicId={userLogged.profilePic} alt={userLogged?.name} />
                </Link>
                :
                <Link to='/editProfile'>
                  <img img className={s.img} src={image} alt={userLogged?.firstName || null} />
                </Link>
              }
            </div>
            <h4 className={s.data}>{showedName}</h4>
            <div className={s.line}></div>
        </div>

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

      <aside className={s.tables}>{showTable}</aside>

    </section>
  );
};

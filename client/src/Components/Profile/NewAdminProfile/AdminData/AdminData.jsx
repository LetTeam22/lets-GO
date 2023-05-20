import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RenderProfilePic from '../../../Cloudinary/renderProfilePic';
import s from './AdminData.module.css'

export const AdminData = () => {
    const image = "https://res.cloudinary.com/pflet/image/upload/v1662686111/Let/image/persona_logeada_hatkhk.png"
    const userLogged = useSelector(state => state.user);

    const showedName = (userLogged.firstName && userLogged.lastName)
    ? `${userLogged.firstName} ${userLogged.lastName}`
    : userLogged.firstName ? userLogged.firstName : userLogged?.email

    return (
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
    )

}
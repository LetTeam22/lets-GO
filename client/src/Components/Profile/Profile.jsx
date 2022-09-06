import React, { useEffect } from "react";
import s from "./Profile.module.css";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import image from "../../image/persona_logeada.png";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { getUser } from "../../Redux/actions";
import { Link } from "react-router-dom";
import { removeFavorite, getBookingsByUserId } from "../../Redux/actions";
import { AiFillHeart, AiFillShopping }  from 'react-icons/ai';
import RenderProfilePic from "../Cloudinary/renderProfilePic";

export const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.user);
  const favorites = useSelector(state => state.favorites);
  const userBookings = useSelector(state => state.userBookings);
  const { isLoading, user } = useAuth0();

  userLogged.isAdmin && history.push('/AdminProfile')

  useEffect(() => {
    dispatch(getUser(user?.email));
    dispatch(getBookingsByUserId(userLogged.idUser))
  }, [dispatch, user?.email, userLogged.idUser]);

  const handleRemoveFav = idBike => {
    dispatch(removeFavorite(idBike));
  };

  const iconStyle = {
    color: 'orange',
    width: '1.5rem',
    height: '1.5rem',
    padding: '0',
    margin: '0',
  };

  const showedName = (userLogged.firstName && userLogged.lastName)?
  `${userLogged.firstName} ${userLogged.lastName}`:
  userLogged.firstName? userLogged.firstName:
  userLogged?.email

  return isLoading ?  <Loading />  :
  (
    <section className={s.allPage}>

      <div className={s.containerLeft}>

      <span className={s.title}><AiFillHeart style= {iconStyle}/>TUS let's GO FAVORITAS:</span>
        <div className={s.box1}>
            {!!favorites.length ?  favorites?.map(f => (
              <div className={s.containerList1} key={f.idBike}>
                <button className={s.btnRemove} onClick={() => handleRemoveFav(f.idBike)}>x</button>
                <ul><Link to={`/bike/${f.idBike}`}><span className={s.list}>{`${f.name} (ver detalle)`}</span></Link></ul>
              </div>
              )) : (
              <span className={s.span}>Todavía no elegiste favoritas</span>
            )}
        </div>

        <span className={s.title}><AiFillShopping style= {iconStyle}></AiFillShopping>TUS RESERVAS:</span>
        <div className={s.box2}>
            {!!userBookings.length ?  userBookings?.map(book => (
              <div className={s.containerLis2} key={book.idBooking} >
                  <span className={s.list2}>Desde: {book.startDate} - Hasta: {book.endDate}</span>
                  <span className={s.list2}>let's GO:
                    { book.bikes.map(bike => (<span key={bike.name} className={s.list2}>{bike.name}</span>)) }
                  </span>
                  <span className={s.list2}>Accesorios:
                    { !!book.accesories.length && book.accesories.map(acc => (<span key={acc.name} className={s.list2}>{acc.name}</span>)) }
                  </span>
                  <span className={s.list2}>Precio Total:{book.totalPrice}</span>
                  <span>Estado:</span>
              </div>
              )) : (
              <span className={s.span}>Todavía no tenés reservas</span>
            )}
        </div>
      </div>

      <div className={s.containerRight}>
        <div className={s.name}>
          {showedName}
        </div>

        <div className={s.infoAndImage}>
          <div className={s.information}>
            <h4 className={s.h4}>Telefono : {userLogged?.cellphone || null}</h4>
            <h4 className={s.h4}>Email: {userLogged?.email || user?.email}</h4>
          </div>
          {userLogged?.profilePic?
            <RenderProfilePic publicId={userLogged.profilePic}
            alt={user?.name}
            />
            :
            <img
              src={image}
              alt={userLogged?.firstName || null}
              className={s.img}
            />
            }
          {/* <img src={userLogged?.profilePic || image} alt={userLogged?.firstName || null} className={s.img} /> */}
        </div>
        <Button variant="contained" color="success" className={s.btnHome} onClick={() => history.push("/home")}>Go Home</Button>
        <Button variant="contained" color="success" className={s.btnEdit} onClick={() => history.push("/editProfile")} > Editar Perfil </Button>
      </div>
      <div className={s.background}></div>
    </section>
  );
};

import React, { useEffect } from "react";
import s from "./Profile.module.css";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { getUser } from "../../Redux/actions";
import { Link } from "react-router-dom";
import { removeFavoriteFromDb, getBookingsByUserId, bookingToQualify } from "../../Redux/actions";
import { AiFillHeart, AiFillShopping }  from 'react-icons/ai';
import RenderProfilePic from "../Cloudinary/renderProfilePic";
import { convertDate, reverseDate } from '../../helpers/convertDate.js';

export const Profile = () => {
  const image = "https://res.cloudinary.com/pflet/image/upload/v1662686111/Let/image/persona_logeada_hatkhk.png"
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogged = useSelector(state => state.user);
  const favorites = useSelector(state => state.favorites);
  const userBookings = useSelector(state => state.userBookings);
  const { isLoading, user } = useAuth0();
   
  useEffect(() => {
    dispatch(getUser(user?.email));
    dispatch(getBookingsByUserId(userLogged.idUser)); 
  }, [dispatch, user?.email, userLogged.idUser]);

  const handleRemoveFav = idBike => {
    dispatch(removeFavoriteFromDb({bikeId:idBike,email:userLogged.email}));
  };

  const handleBookingToQualify = idBooking => {
    dispatch(bookingToQualify(idBooking));
  }

  const bookingStatus = endDate => {
      let todayToModify = new Date();
      const today = convertDate(todayToModify);
      const arrToday = today.split('-')
      const arrEndDate = endDate.split('-')
      if(arrToday[0] < arrEndDate[0]) return 'En camino'
      if(arrToday[0] > arrEndDate[0]) return 'Finalizada'
      if(arrToday[0] === arrEndDate[0]) {
        if(arrToday[1] < arrEndDate[1]) return 'En camino'
        if(arrToday[1] > arrEndDate[1]) return 'Finalizada'
        if(arrToday[1] === arrEndDate[1]) {
          if(arrToday[2] < arrEndDate[2]) return 'En camino'
          if(arrToday[2] > arrEndDate[2]) return'Finalizada'
          if(arrToday[2] === arrEndDate[2]) return 'Tu viaje es hoy'
        }
      }
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
            {!!favorites.length ? favorites?.map(f => (
              <div className={s.containerList1} key={f.idBike}>
                <button className={s.btnRemove} onClick={() => handleRemoveFav(f.idBike)}>x</button>
                <ul><Link to={`/bike/${f.idBike}`}><span className={s.list}>{`${f.name} (ver detalle)`}</span></Link></ul>
              </div>
              )) : <span className={s.span}>Todavía no elegiste favoritas</span>
            }
        </div>

        <span className={s.title}><AiFillShopping style= {iconStyle}></AiFillShopping>TUS RESERVAS:</span>
        <div className={s.box2}>
            {!!userBookings.length ?  userBookings?.map(b => (
              <div className={s.containerLis2} key={b.idBooking} >              
                  <span className={s.list2}>● Desde: {reverseDate(b.startDate)} - Hasta: {reverseDate(b.endDate)}</span>
                  <span className={s.list2}>» Bici:
                    { b.bikes.map(bike => <span key={bike.name} className={s.list2}>{bike.name} - </span>) }
                  </span>
                  <span className={s.list2}>» Accesorios:
                    { !!b.accesories.length && b.accesories.map(acc => (<span key={acc.name} className={s.list2}>{acc.name} - </span>)) }
                  </span>
                  <span className={s.list2}>» Precio Total: ${b.totalPrice}</span>
                  <div>
                    <span className={s.list2}>» Estado: {bookingStatus(b.endDate)}</span>
                    {bookingStatus(b.endDate) === 'Finalizada' && 
                    <div>
                      <span className={s.list2}>Nos gustaría conocer tu opinión con bicis let's GO, entra al siguiente enlace para puntuar la bici que usaste y compartir tu experiencia! </span>
                        <Link to={'/qualifyExperience'}>
                          <button className={s.btnGo} onClick={() => handleBookingToQualify(b.idBooking)}>GO!</button>
                        </Link>
                      </div>
                    }
                  </div>
              </div>
              )) : <span className={s.span}>Todavía no tenés reservas</span>
            }
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
        </div>
        <Button variant="contained" color="success" className={s.btnHome} onClick={() => history.push("/home")}>Go Home</Button>
        <Button variant="contained" color="success" className={s.btnEdit} onClick={() => history.push("/editProfile")} > Editar Perfil </Button>
      </div>
      <div className={s.background}></div>
    </section>
  );
};

import React, { useEffect } from "react";
import s from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllFavorites, getBookingsByUserEmail, getUser, updateBooking } from "../../Redux/actions";
import { Link, useHistory } from "react-router-dom";
import { removeFavoriteFromDb, bookingToQualify } from "../../Redux/actions";
import { AiFillHeart, AiFillShopping } from 'react-icons/ai';
import RenderProfilePic from "../Cloudinary/renderProfilePic";
import { convertDate, reverseDate } from '../../helpers/convertDate.js';
import { useState } from "react";
import { RenderFavorite } from '../Cloudinary/renderFavorite';
import swal from "sweetalert";
import ChatBot from "../ChatBot/ChatBot";
import emailjs from '@emailjs/browser';

export const Profile = () => {
  const image = "https://res.cloudinary.com/pflet/image/upload/v1662686111/Let/image/persona_logeada_hatkhk.png"
  const dispatch = useDispatch();
  const userLogged = useSelector(state => state.user);
  const favorites = useSelector(state => state.favorites);
  const userBookings = useSelector(state => state.userBookings);
  const { isLoading, user, isAuthenticated } = useAuth0();
  const [booking, setBooking] = useState({});
  const history = useHistory();
  const PUBLIC_KEY_BOOKING = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const SERVICE_ID_BOOKING = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID_BOOKING = process.env.REACT_APP_EMAILJS_TEMPLATE_ID5;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!userLogged) dispatch(getUser(user?.email))
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect( () => {
    if (user?.email) dispatch(getBookingsByUserEmail(user?.email))
    if (user?.email) dispatch(getAllFavorites(user?.email))
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  if(isLoading) return <Loading/>
  if(!isAuthenticated) history.push('/home')

  const sendEmailCanceledBook = (email) => {
    emailjs.send(SERVICE_ID_BOOKING, TEMPLATE_ID_BOOKING, { email: email }, PUBLIC_KEY_BOOKING)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
  };

  const handleRemoveFav = idBike => {
    dispatch(removeFavoriteFromDb({ bikeId: idBike, email: userLogged.email }))
    swal({
      title: "let's GO eliminada de favoritos",
      icon: "success",
      button: { confirm: { text: "Ok", value: true, visible: true, closeModal: true } }
    })
  };

  const handleBookingToQualify = idBooking => {
    dispatch(bookingToQualify(idBooking))
  };

  const handleClick = b => {
    window.scrollTo(0, 0);
    setBooking({
      idBooking: b.idBooking,
      startDate: b.startDate,
      endDate: b.endDate,
      totalPrice: b.totalPrice,
      adventures: b.adventures,
      status: 'cancelled'
    })
  };

  const handleCancelled = async e => {
    e.preventDefault()
    await dispatch(updateBooking(booking))
    swal("Reserva cancelada. El equipo de let's GO se contactará con vos")
    sendEmailCanceledBook(user?.email);
    dispatch(getBookingsByUserEmail(user?.email))
    setBooking({})
  };

  const handleBack = () => {
    setBooking({})
  }

  const bookingStatus = (endDate, idBooking) => {
    const todayToModify = new Date();
    const today = convertDate(todayToModify)
    const cancelled = userBookings.find(b => b.status === 'cancelled' && b.idBooking === idBooking)
    if(endDate === null) return ''
    if(cancelled) return 'CANCELADA'
    if(today < endDate) return 'EN CAMINO'
    if(today > endDate) return 'FINALIZADA'
    if(today === endDate) return 'Tu viaje es hoy'
  };

  const iconStyle = {
    color: 'orange',
    width: '1.7rem',
    height: '1.7rem',
    padding: '0',
    margin: '0',
  };


  const showedName = (userLogged.firstName && userLogged.lastName) ? `${userLogged.firstName} ${userLogged.lastName}` : userLogged.firstName ? userLogged.firstName : userLogged?.email

  return (
      <>
      <ChatBot/>
        <div className={s.containerUs}>
          <div className={s.infoUs}>
            <h4 className={s.usLet}>USUARIO LETER:</h4>
            <h4 className={s.data}>{showedName}</h4>
            {userLogged.cellphone && <h4 className={s.data}>teléfono: {userLogged?.cellphone}</h4>}
            {showedName !== userLogged?.email && <h4 className={s.data}>e-mail: {userLogged?.email}</h4>}
          </div>
          <div className={s.containerImg}>
            {userLogged?.profilePic
              ? <Link to='/editProfile'><RenderProfilePic publicId={userLogged.profilePic} alt={user?.name} /></Link>
              : <Link to='/editProfile'><img className={s.img} src={image} alt={userLogged?.firstName || null} /></Link>
            }
          </div>
        </div>
        <Link to='/editProfile'><span className={s.edit} >editar</span></Link>

        <div className={s.mainContainer}>

          <div className={s.containerFav}>
            <AiFillHeart style={iconStyle} />
            <span className={s.title}>TUS let's GO FAVORITAS:</span>
            {!!favorites.length ? favorites?.map(f => (
             <React.Fragment key={f.idBike}>
                <span className={s.btnRemove} onClick={() => handleRemoveFav(f.idBike)}>x ELIMINAR DE FAVORITOS x</span>
                <Link className={s.box1} to={`/bike/${f.idBike}`}>
                  <div className={s.containBike}>
                    <span className={s.titleBike}>{f.name}</span>
                    <span className={s.detail}>Tipo: {f.type}</span>
                    <span className={s.detail}>Tracción: {f.traction}</span>
                    <span className={s.detail}>Rodado: {f.wheelSize}</span>
                    <span className={s.detail}>Precio: ${f.price}</span>
                  </div>
                  <RenderFavorite publicId={f.image} />
                </Link>
              </React.Fragment>
            ))
              :<>
                <span className={s.span}>Todavía no elegiste favoritas</span>
                <Link to='/home'><button className={s.btnChoose}>ELEGIR</button></Link>
              </>
            }
          </div>

          <div className={s.containerRes}>
            <AiFillShopping style={iconStyle} />
            <span className={s.title}>TUS RESERVAS:</span>
            {!!Object.keys(booking).length &&
              <div className={s.box2cancel}>
                <h3 className={s.cancel}>Estas a punto de cancelar la siguiente reserva </h3>
                {
                  booking.startDate === null ? <span className={s.cancelText}>Aventura: {booking.adventures.map(ad => ad.name)}</span> :
                  <>
                    <span className={s.cancelText}>Fecha: {booking.startDate} / {booking.endDate} </span>
                    <span className={s.cancelText}>Precio: ${booking.totalPrice}</span>                  
                  </>
                }
                <span className={s.cancel}>¿CONFIRMÁS LA CANCELACIÓN?</span>
                <div className={s.containBtn}>
                  <button className={s.btnCanc} onClick={handleCancelled}>OK</button>
                  <button className={s.btnBack} onClick={handleBack}>DESHACER</button>
                </div>
              </div>
            }
            {!!userBookings.length ? userBookings?.map(b => (

              <div className={b.status === 'cancelled' ? s.boxCancel : s.box2} key={b.idBooking} >
                <div className={s.flex}>
                  { b.startDate === null ? <></> :
                    <>
                      <span className={b.status === 'cancelled' ? s.titleCancel : s.titleList2}>● FECHA:&nbsp;</span>
                      <span className={b.status === 'cancelled' ? s.list2Cancel : s.list2}>{reverseDate(b.startDate)} /&nbsp;</span>
                      <span className={b.status === 'cancelled' ? s.list2Cancel : s.list2}>{reverseDate(b.endDate)}</span>
                    </>
                  }
                </div>

                <div className={s.flex}>
                { b.startDate === null ? <></> :
                  <>
                    <span className={b.status === 'cancelled' ? s.titleCancel : s.titleList2}>● BICI:&nbsp;</span>
                    <div>
                      {b.bikes.map((bike, i) => (
                        <span key={bike.name} className={b.status === 'cancelled' ? s.list2Cancel : s.list2}>{bike.name} {i < b.bikes.length - 1 && '-'}&nbsp;</span>
                      ))}
                    </div>
                  </>
                }
                </div>
                
                <div className={s.flex}>
                { b.startDate === null ? <></> :
                  <>
                      <span className={b.status === 'cancelled' ? s.titleCancel : s.titleList2}>● ACCESORIOS:&nbsp;</span>
                      <div>
                        {!!b.accesories.length && b.accesories.map((acc, i) => (
                          <span key={acc.list2} className={b.status === 'cancelled' ? s.list2Cancel : s.list2}>{acc.name} {i < b.accesories.length - 1 && '-'}&nbsp;</span>
                        ))}
                      </div>
                  </>
                }
                </div>

                <div className={s.flex}>
                  <span className={b.status === 'cancelled' ? s.titleCancel : s.titleList2}>● AVENTURAS:&nbsp;</span>
                  {!!b.adventures.length && b.adventures.map((adv, i) => (
                    <span key={adv.list2} className={b.status === 'cancelled' ? s.list2Cancel : s.list2}>{adv.name} {i < b.adventures.length - 1 && '-'}&nbsp;</span>
                  ))}
                </div>

                <div className={s.flex}>
                  <span className={b.status === 'cancelled' ? s.titleCancel : s.titleList2}>● PRECIO TOTAL:&nbsp;</span>
                  <span className={b.status === 'cancelled' ? s.list2Cancel : s.list2}> ${b.totalPrice}</span>
                </div>

                <div className={s.flex}>
                { b.startDate === null && b.status === "confirmed" ? 
                  <span className={s.titleList2}>Nos contactaremos para coordinar los detalles de tu Aventura</span>
                  :
                  <>
                    <span className={b.status === 'cancelled' ? s.titleCancel : s.titleList2}>● ESTADO:&nbsp;</span>
                    <span className={b.status === 'cancelled' ? s.titleCancel : s.status}>⇢ &nbsp;{bookingStatus(b.endDate, b.idBooking)}</span>
                  </>
                }
                {
                  b.startDate === null && b.status === "cancelled" && <span className={s.titleCancel}>CANCELADA</span>
                }
                </div>

                {bookingStatus(b.endDate, b.idBooking) === 'FINALIZADA' &&
                  <>
                    <div className={s.flex1}>
                      <span className={s.opinion}>¡NOS GUSTARÍA CONOCER TU OPINIÓN! PODÉS DAR UNA CALIFICACIÓN A LA BICI let's GO QUE USASTE Y COMPARTIR TU EXPERIENCIAS CON OTROS LETERS </span>
                    </div>
                    <Link to={'/qualifyExperience'}>
                      <button className={s.btnGo} onClick={() => handleBookingToQualify(b.idBooking)}>IR</button>
                    </Link>
                  </>
                }
                {(bookingStatus(b.endDate, b.idBooking) === 'EN CAMINO' || b.startDate === null) && b.status === 'confirmed' &&
                  <>
                    <div className={s.flexCancel}>
                      <span className={s.opinion}>PODÉS CANCELAR TU RESERVA HACIENDO CLICK EN EL SIGUIENTE ENLACE</span>
                    </div>
                    {!Object.keys(booking).length && <button className={s.btnCancel} onClick={() => handleClick(b)}>CANCELAR</button>}
                  </>
                }
              </div>
            ))
              :
              <>
                <span className={s.span}>Todavía no tenés reservas</span>
                <Link to='/home'><button className={s.btnChoose}>RESERVAR</button></Link>
              </>
            }
          </div>
        </div>
      </>
    );
};

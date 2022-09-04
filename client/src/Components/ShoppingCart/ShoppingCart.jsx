import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  getAccesories,
  getBikes,
  getUser,
  postBookings,
  setParameters,
} from "../../Redux/actions";
import s from "./ShoppingCart.module.css";
import Dates from "../Dates/Dates";
import swal from "sweetalert";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";
import sincarrito from '../../image/sincarrito.png'
import RenderOneImage from '../Cloudinary/renderOneImage';
import RenderAccCart from "../Cloudinary/renderAccCart";



export const ShoppingCart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const bookings = JSON.parse(localStorage.getItem("booking")) || [];
  console.log(bookings);
  const date = useSelector((state) => state.parameters.date);
  const userLogged = useSelector((state) => state.user);
  const allAccs = useSelector((state) => state.accesories);
  const allBikes = useSelector((state) => state.allBikes);
  let cartBikes = [];
  const { user, isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getBikes());
    dispatch(getAccesories());
    dispatch(getUser(user?.email));
  }, [dispatch]);

  if (isLoading) return <Loading />;

  for (let bike of allBikes) {
    for (let book of bookings)
      if (bike.idBike === parseInt(book.bike, 10)) {
        let pushedbike = {
          idBike: bike.idBike,
          name: bike.name,
          price: parseInt(bike.price, 10),
          image: bike.image,
          accesories: {
            canasto: book.canasto,
            silla: book.silla,
            luces: book.luces,
            casco: book.casco,
            candado: book.candado,
            lentes: book.lentes,
            botella: book.botella,
            calzado: book.calzado,
            totalAcc: book.totalAcc,
          },
        };
        cartBikes.push(pushedbike);
      }
  }

  console.log(cartBikes);

  let postbikeIds = cartBikes.map((bikes) => bikes.idBike);

  let postedBooking = {
    startDate: date.from,
    endDate: date.to,
    userId: userLogged?.idUser,
    bikeIds: postbikeIds,
  };

  const llenarAccs = (accs) => {
    let accesories = [];
    for (let acc in accs) {
      if (accs[acc] === true) {
        for (let acces of allAccs) {
          if (acces.name.toLowerCase() === acc) {
            accesories.push(acces);
          }
        }
      }
    }
    console.log(accesories);
    return accesories;
  };

  const totalDias = (from, to) => {
    const date1 = new Date(from);
    const date2 = new Date(to);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const totalPerBike = (price) => {
    const days = totalDias(date.from, date.to);
    return price * days;
  };

  const total = cartBikes.reduce((acc, cur) => {
    return (
      acc +
      (cur.price + cur.accesories.totalAcc) * totalDias(date.from, date.to)
    );
  }, 0);

  const handleBooking = (e) => {
    if (!isAuthenticated) {
      swal({
        title: "PRECAUCION",
        text: "Debes loguearte primero",
        icon: "warning",
        button: {
          text: "Ok",
          value: true,
          visible: true,
          className: s.btnSwal,
          closeModal: true,
        },
      });
    } else {
      dispatch(setParameters("resetAll"));
      dispatch(postBookings({...postedBooking, totalPrice:total}));
      localStorage.removeItem("booking");
      swal({
        title: "Tu reserva fue confirmada!",
        text: "Disfruta tu aventura!",
        icon: "success",
        button: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: s.btnSwal,
            closeModal: true,
          },
        },
      });
      history.push("/home");
    }
  };

  const handleResetDate = () => {
    dispatch(setParameters("resetAll"));
  };
  return (
    <div className={s.container}>
      {/* <h1 className={s.title}>Carrito de compras</h1> */}

      <div className={s.bikes}>
        {cartBikes.length ? (
          cartBikes.map((bike) => {
            return (
              <div key={bike.idBike}>
                <div className={s.cardBike}>
                  <h2 className={s.bikeName}>{bike.name}</h2>
                  {/* <img src={bike.image} alt="not found" className={s.img} /> */}
                  <RenderOneImage publicId={bike.image} className={s.img} />
                  <p className={s.prices}>$ {bike.price} / día </p>
                  <div className={s.accesories}>
                    {llenarAccs(bike.accesories)?.map((el) => (
                      <div>
                        <p className={s.accs} key={el.name}>
                          {el.name}
                        </p>
                        {/* <img src={el.image} alt="not" found /> */}
                        <RenderAccCart
                      className={s.imgCloud}
                      publicId={el.image}
                    />
                        <p> $ {el.price} / día </p>
                      </div>
                    ))}
                  </div>
                  <p className={s.prices}>{`Subtotal: $ ${
                    isNaN(totalPerBike(bike.price))
                      ? 0
                      : totalPerBike(bike.price + bike.accesories.totalAcc)
                  }`}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className={s.empty}>
            <img src={sincarrito} className={s.sincarrito} alt={sincarrito} />
            {/* <h2 className={s.titleEmpty}>
              Aún no cargaste nada en el carrito{" "}
            </h2> */}
            <Link to="/home">
              <button className={s.btn}> Volver al Home</button>
            </Link>
          </div>
        )}
      </div>

      {cartBikes.length ? (
        <div className={s.totalPrice}>
          <Dates />

          <div className={s.containerBtn}>
            <Link to="/home">
              <button onClick={handleResetDate} className={s.reserveBtn}>
                Buscar mas Bicicletas
              </button>
            </Link>
            {!isNaN(total) ? (
              <h2 className={s.total}>{`Total $ ${total}`}</h2>
            ) : (
              <></>
            )}
            <button
              disabled={
                postedBooking.startDate === "" ||
                postedBooking.endDate === "" ||
                !postedBooking.bikeIds.length
                  ? true
                  : false
              }
              onClick={(e) => handleBooking(e)}
              className={s.reserveBtn}
            >
              RESERVAR
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

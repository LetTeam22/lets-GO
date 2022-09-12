import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAccesories, getBikes, getUser, setParameters, getDisabledDates, sendMpInfo } from "../../Redux/actions";
import s from "./ShoppingCart.module.css";
import Dates from "../Dates/Dates";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";
import RenderOneImage from '../Cloudinary/renderOneImage';
import RenderAccCart from "../Cloudinary/renderAccCart";
import { BiTrash } from 'react-icons/bi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Mp from '../MercadoPago/MercadoPago';
import { finalPrice } from '../../helpers/applyDiscount';

export const ShoppingCart = () => {

  const dispatch = useDispatch();

  const bookings = JSON.parse(localStorage.getItem("booking")) || [];

  const parameters = useSelector(state => state.parameters);
  const date = useSelector(state => state.parameters.date);
  const userLogged = useSelector((state) => state.user);
  const allAccs = useSelector((state) => state.accesories);
  const allBikes = useSelector((state) => state.allBikes);
  const userBoking = useSelector(state => state.bookings);
  const mpInfo = useSelector(state => state.mpInfo);
  let cartBikes = [];
  const { user, isLoading } = useAuth0();

  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem('email');

  for (let bike of allBikes) {
    for (let book of bookings)
      if (bike.idBike === book.bike) {
        let pushedbike = {
          idBike: bike.idBike,
          name: bike.name,
          price: bike.price,
          discount: bike.discount,
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

  let postbikeIds = cartBikes.map((bikes) => bikes.idBike);

  // Obtengo fechas deshabilitadas para el calendario segun las reservas de las bicis en el carrito
  const strBikeIds = postbikeIds.join()
  if (strBikeIds !== date.bikeIds) {
    const newBikeIds = strBikeIds ? strBikeIds : 0
    dispatch(setParameters({ ...parameters, date: { ...parameters.date, bikeIds: strBikeIds } }))
    dispatch(getDisabledDates(newBikeIds))
  }

  let ids = useMemo(() => {
    return [];
  }, []);

  
  userBoking.forEach(e => {
    !!e.canasto.length && ids.push([e.canasto])
    !!e.silla.length && ids.push([e.silla])
    !!e.luces.length && ids.push([e.luces])
    !!e.casco.length && ids.push([e.casco])
    !!e.candado.length && ids.push([e.candado])
    !!e.lentes.length && ids.push([e.lentes])
    !!e.botella.length && ids.push([e.botella])
    !!e.calzado.length && ids.push([e.calzado])
    ids = ids.map(e => e)
  });

  let postedBooking = useMemo(() => {
    return {
      startDate: date.from,
      endDate: date.to,
      userId: userLogged?.idUser,
      bikeIds: postbikeIds,
      AccIds: ids, 
    }
  }, [date.from, date.to, ids, userLogged?.idUser, postbikeIds]);

  const llenarAccs = (accs) => {
    let accesories = [];
    for (let acc in accs) {
      if (accs[acc] !== '') {
        for (let acces of allAccs) {
          if (acces.name.toLowerCase() === acc) {
            accesories.push(acces);
          }
        }
      }
    }
    return accesories;
  };

  const totalDias = (from, to) => {
    const date1 = new Date(from);
    const date2 = new Date(to);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  const totalPerBike = (price) => {
    const days = totalDias(date.from, date.to);
    return price * days;
  };

  const subTotalBike = cartBikes.reduce((acc, cur) => {
    return (
      acc + finalPrice(cur.price, cur.discount) * totalDias(date.from, date.to)
    );
  }, 0);

  const subTotalItems = cartBikes.map(bike => {
    let subTotal = 0;
    llenarAccs(bike.accesories)?.map(el => {
      return subTotal += el.price * totalDias(date.from, date.to)
    });
    return subTotal;
  });

  const subTotal = parseInt(subTotalBike) + parseInt(subTotalItems);

  const total = Math.floor(subTotal * 1.02);

  let preference = {
    items: [{
      title: 'Reserva',
      unit_price: total,
      quantity: 1,
      currency_id: 'ARS',
      id: 1
    }],
    client_id: userLogged.idUser,
    payer: {
      name: userLogged.firstName,
      surname: userLogged.lastName,
      email: userLogged.email
    },
    total_amount: total * 1.05
  }

  const deleteItem = (e, id) => {
    e.preventDefault();
    setLoading(true);
    cartBikes = cartBikes.filter(b => b.idBike !== id)
    localStorage.setItem('booking', JSON.stringify(bookings.filter(booking => booking.bike !== id)));
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getBikes());
    dispatch(getAccesories());
    dispatch(getUser(user?.email));
    dispatch(
      setParameters({
        ...parameters,
        date: { ...parameters.date, from: localStorage.getItem('date') ? JSON.parse(localStorage.getItem('date')).from : '', to: localStorage.getItem('date') ? JSON.parse(localStorage.getItem('date')).to : "" },
      })
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  useEffect(() => {
    localStorage.setItem('postedBooking', JSON.stringify({...postedBooking, totalPrice: total}))
  }, [total, postedBooking])

  useEffect(() => {
    if (email && !isNaN(total)) {
      dispatch(sendMpInfo(total, email));
    }
  }, [total, dispatch, email]);

  if (isLoading) return <Loading />;

  return (
    !loading && cartBikes.length
      ? <div className={s.container} id={s.cart}>
        <div className={s.titleDiv}>
          <h1 className={s.title}>Carrito de compras</h1>
        </div>
        <hr color="#595858" size='0.5px' />

        <Dates component='cart' />

        <div className={s.containerDiv}>
          <TableContainer className={s.table} sx={{ minWidth: 700, width: '30%', marginLeft: '2rem' }} >
            <Table sx={{ minWidth: 700, width: '30%' }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="center">Cantidad</TableCell>
                  <TableCell align="center">Precio/dia</TableCell>
                  <TableCell align="center">Precio Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  cartBikes.length
                    ? cartBikes.map((bike) => {
                      return (
                        <TableRow key={bike.bikeId} >
                          <TableCell>{bike.name}</TableCell>
                          <TableCell align="center">1</TableCell>
                          <TableCell align="center">{finalPrice(bike.price, bike.discount)}</TableCell>
                          <TableCell align="center">{!isNaN(totalPerBike(finalPrice(bike.price, bike.discount))) ? totalPerBike(finalPrice(bike.price, bike.discount)) : 0}</TableCell>
                        </TableRow>
                      )
                    })
                    : <></>
                }
                {
                  cartBikes.length
                    ? cartBikes.map(bike => {
                      return llenarAccs(bike.accesories)?.map(el => {
                        return (
                          <TableRow key={el.idAcc} >
                            <TableCell>{el.name}</TableCell>
                            <TableCell align="center">1</TableCell>
                            <TableCell align="center">{el.price}</TableCell>
                            <TableCell align="center">{!isNaN(totalPerBike(el.price)) ? totalPerBike(el.price) : 0}</TableCell>
                          </TableRow>
                        )
                      })
                    })
                    : <></>
                }
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell align="left" colSpan={2}>Subtotal</TableCell>
                  <TableCell align="center">{!isNaN(subTotal) ? subTotal : 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} align="left">Tax</TableCell>
                  <TableCell align="center">{!isNaN(subTotal) ? parseInt(subTotal * 0.02) : 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" colSpan={2}>Total</TableCell>
                  <TableCell align="center">{!isNaN(total) ? parseInt(total) : 0}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div className={s.previewItems}>
            {
              cartBikes.length
                ? cartBikes.map(bike => {
                  return (
                    <div className={s.cardBike} key={bike.idBike} >
                      <h2 className={s.bikeName}>{bike.name}</h2>
                      <RenderOneImage publicId={bike.image} className={s.img} />
                      <div className={s.accesoriesPreview}>
                        {llenarAccs(bike.accesories)?.map((el) => (
                          <div>
                            <RenderAccCart
                              className={s.imgCloud}
                              publicId={el.image}
                            />
                          </div>
                        ))}
                      </div>
                      <button onClick={(e) => deleteItem(e, bike.idBike)} className={s.deleteBtn}><BiTrash color='#F9B621' size='2rem' className={s.trashIcon} /></button>
                    </div>
                  )
                })
                : <></>
            }
          </div>
        </div>
        {
          cartBikes.length
            ? (
              <div className={s.totalPrice}>
                <div className={s.containerBtn}>
                  <Link to="/home">
                    <button className={s.reserveBtn}>
                      BUSCAR MAS BICICLETAS
                    </button>
                  </Link>
                  {
                    postedBooking.startDate === '' || postedBooking.endDate === '' || !postedBooking.bikeIds.length 
                    ? <></>
                    : <Mp preference={preference} mpInfo={mpInfo} postedBooking={postedBooking} total={total}/>
                  }

                </div>
              </div>
            )
            : <></>
        }
      </div>
      : !cartBikes.length
        ? <div className={s.containerEmptyCart}>
          <img src="https://res.cloudinary.com/pflet/image/upload/v1662686140/Let/image/sincarrito_wrpmlx.png" alt="sin carrito" className={s.sincarrito} />
          <div className={s.div}>
            <Link to='/home' className={s.containerBtnHome}>
              <button className={s.returnBtn}>VOLVER AL HOME</button>
            </Link>
          </div>
        </div>
        : <Loading />
  )
};

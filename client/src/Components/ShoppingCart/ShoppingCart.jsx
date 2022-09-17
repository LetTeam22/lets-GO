import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom";
import { getAccesories, getBikes, getUser, setParameters, getDisabledDates, sendMpInfo } from "../../Redux/actions";
import s from "./ShoppingCart.module.css";
import Dates from "../Dates/Dates";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";
import RenderOneImage from '../Cloudinary/renderOneImage';
import RenderAccCart from "../Cloudinary/renderAccCart";
import { BiTrash, BiEdit } from 'react-icons/bi';
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
  const history = useHistory()
  const imgEmpty = 'https://res.cloudinary.com/pflet/image/upload/v1662686140/Let/image/sincarrito_wrpmlx.png'
  const bookings = JSON.parse(localStorage.getItem("booking")) || [];
  const Adventures = JSON.parse(localStorage.getItem("adventure")) || [];

  const parameters = useSelector(state => state.parameters);
  const date = useSelector(state => state.parameters.date);
  const userLogged = useSelector((state) => state.user);
  const allAccs = useSelector((state) => state.accesories);
  const allBikes = useSelector((state) => state.allBikes);
  const mpInfo = useSelector((state) => state.mpInfo);
  const allAdventures = useSelector(state => state.allAdventures)
  let cartBikes = [];
  let cartAdventures = [];
  const { user, isLoading } = useAuth0();

  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem('email');

  allBikes.length && bookings.forEach(book => {
    const bike = allBikes.find(b => b.idBike === book.bike)
    const pushedbike = {
      idBike: bike.idBike,
      name: bike.name,
      price: bike.price,
      discount: bike.discount,
      image: bike.image,
      accesories: book.accs
    }
    cartBikes.push(pushedbike);
  })

  Adventures.length && Adventures.forEach(adv => {
    const advFound = allAdventures.find(a => a.idAdv === adv.adv[0])
    if (advFound) {
      const pushedAdv = {
        id: advFound.idAdv,
        name: advFound.name,
        price: advFound.price,
        image: advFound.image,
      }
      cartAdventures.push(pushedAdv)
    }
  })

  let postbikeIds = cartBikes.map((bikes) => bikes.idBike);

  const accs = allAccs.map(acc => {
    return {
      name: acc.name,
      price: acc.price,
      id: acc.idAcc,
      cantidad: 0,
    }
  });

  accs.map(acc => {
    return bookings.map(book => {
      if (book.accs.includes(acc.id)) {
        acc.cantidad++;
      }
      return null
    });
  });


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

  bookings.length && bookings.forEach(book => {
    book.hasOwnProperty('accs') && book.accs.length && book.accs.forEach(acc => {
      !ids.includes(acc) && ids.push(acc)
    })
  })

  let postedBooking = useMemo(() => {
    return {
      startDate: date.from,
      endDate: date.to,
      userId: userLogged?.idUser,
      bikeIds: postbikeIds,
      AccIds: ids,
    }
  }, [date.from, date.to, ids, userLogged?.idUser, postbikeIds]);

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

  let subTotalAdv = 0
  cartAdventures.reduce((acc, cur) => {
    return (
      subTotalAdv = acc + Number(cur.price)
    )
  }, 0)

  const subTotalBike = cartBikes.reduce((acc, cur) => {
    return (
      acc + finalPrice(cur.price, cur.discount) * totalDias(date.from, date.to)
    );
  }, 0);

  const subTotalPerItems = (price, cantidad) => {
    return price * cantidad * totalDias(date.from, date.to)
  }

  let subTotalItems = 0
  cartBikes.forEach(bike => {
    allAccs.length && bike.accesories.forEach(el => {
      const objAcc = allAccs.find(a => a.idAcc === el)
      const price = Number(objAcc.price)
      subTotalItems += price * totalDias(date.from, date.to)
    });
  });

  const subTotal = parseInt(subTotalBike) + parseInt(subTotalItems) + subTotalAdv;

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

  const editItem = (e, id) => {
    e.preventDefault();
    setLoading(true);
    history.push(`/bike/${id}`)
  }

  const deleteItem = (e, id) => {
    e.preventDefault();
    setLoading(true);
    cartBikes = cartBikes.filter(b => b.idBike !== id)
    localStorage.setItem('booking', JSON.stringify(bookings.filter(booking => booking.bike !== id)));
  }

  const deleteAdventure = (e, id) => {
    e.preventDefault();
    setLoading(true);
    cartAdventures = cartAdventures.filter(a => a.id !== id);
    localStorage.setItem("adventure", JSON.stringify(Adventures.filter(ad => ad.adv[0] !== id)))
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
    localStorage.setItem('postedBooking', JSON.stringify({ ...postedBooking, totalPrice: total }))
  }, [total, postedBooking])

  useEffect(() => {
    if (email && !isNaN(total)) {
      dispatch(sendMpInfo(total, email));
    }
  }, [total, dispatch, email]);

  if (isLoading) return <Loading />;

  return (
    !loading && (cartBikes.length || cartAdventures.length)
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
                          <TableCell align="center">{`$ ${finalPrice(bike.price, bike.discount).toLocaleString('es-AR')}`}</TableCell>
                          <TableCell align="center">{!isNaN(totalPerBike(finalPrice(bike.price, bike.discount))) ? `$ ${totalPerBike(finalPrice(bike.price, bike.discount)).toLocaleString('es-AR')}` : '$ 0'}</TableCell>
                        </TableRow>
                      )
                    })
                    : <></>
                }
                {
                  cartBikes.length && accs.length

                  ? accs.map(acc => {
                    if(acc.cantidad > 0) {
                      return (
                        <TableRow key={acc.id} >
                          <TableCell>{acc.name}</TableCell>
                          <TableCell align="center">{acc.cantidad}</TableCell>
                          <TableCell align="center">{`$ ${Number(acc.price).toLocaleString('es-AR')}`}</TableCell>
                          <TableCell align="center">{!isNaN(subTotalPerItems(acc.price, acc.cantidad)) ? `$ ${subTotalPerItems(acc.price, acc.cantidad).toLocaleString('es-AR')}` : '$ 0'}</TableCell>
                        </TableRow>
                      )
                    }
                    return null
                  })
                  : <></> 
                }
                {
                  cartAdventures.length
                    ? cartAdventures.map((adventure) => {
                      return (
                        <TableRow key={adventure.id} >
                          <TableCell>{adventure.name}</TableCell>
                          <TableCell align="center">1</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">{adventure.price}</TableCell>
                        </TableRow>
                      )
                    })
                    : <></>
                }
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell align="left" colSpan={2}>Subtotal</TableCell>
                  <TableCell align="center">{!isNaN(subTotal) ? `$ ${subTotal.toLocaleString('es-AR')}` : '$ 0'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} align="left">Tax</TableCell>
                  <TableCell align="center">{!isNaN(subTotal) ? `$ ${parseInt(subTotal * 0.02).toLocaleString('es-AR')}` : '$ 0'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" colSpan={2}>Total</TableCell>
                  <TableCell align="center">{!isNaN(total) ? `$ ${parseInt(total).toLocaleString('es-AR')}` : '$ 0'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div className={s.previewItems}>
            {
              cartBikes.length && allAccs.length
                ? cartBikes.map(bike => {
                  return (
                    <div className={s.cardBike} key={bike.idBike} >
                      <RenderOneImage publicId={bike.image} alt={bike.name} className={s.img} />
                      <h2 className={s.bikeName}>{bike.name}</h2>
                      <div className={s.accesoriesPreview}>
                        {bike.accesories?.map((el) => {
                          const objAcc = allAccs.find(a => a.idAcc === el)
                          return (
                            <div key={objAcc.idAcc}>
                              <RenderAccCart
                                className={s.imgCloud}
                                publicId={objAcc.image}
                              />
                            </div>
                          )
                        })}
                      </div>
                      <div className={s.buttonCont}>
                        <button onClick={(e) => editItem(e, bike.idBike)} className={s.deleteBtn}><BiEdit color='#F9B621' size='2rem' className={s.trashIcon} /></button>
                        <button onClick={(e) => deleteItem(e, bike.idBike)} className={s.deleteBtn}><BiTrash color='#F9B621' size='2rem' className={s.trashIcon} /></button>
                      </div>
                    </div>
                  )
                })
                : <></>
            }
            {
              cartAdventures.length ? cartAdventures.map(adv => {
                return (
                  <div className={s.cardAdventure} key={adv.idAdv} >
                    <img src={adv.image} alt="" />
                    <h2 className={s.advName}>{adv.name}</h2>
                    <div className={s.advBtn}>
                      <button onClick={(e) => deleteAdventure(e, adv.id)} className={s.deleteBtn}><BiTrash color='#F9B621' size='2rem' className={s.trashIcon} /></button>
                    </div>
                  </div>
                )
              })
                : <></>
            }
          </div>
        </div>
        {
          cartBikes.length || cartAdventures.length
            ? (
              <div className={s.totalPrice}>
                <div className={s.containerBtn}>
                  <Link to="/home">
                    <button className={s.reserveBtn}>
                      BUSCAR MAS BICICLETAS
                    </button>
                  </Link>
                  {
                    postedBooking.startDate === '' || postedBooking.endDate === ''
                      ? <></>
                      : <Mp preference={preference} mpInfo={mpInfo} postedBooking={postedBooking} total={total} />
                  }

                </div>
              </div>
            )
            : <></>
        }
      </div>
      : !cartBikes.length
        ? <div className={s.containerEmptyCart}>
          <Link to='/home'><button className={s.returnBtn}>VOLVER AL HOME</button></Link>
          <img src={imgEmpty} alt="sin carrito" className={s.sincarrito} />
        </div>
        : <Loading />
  )
};

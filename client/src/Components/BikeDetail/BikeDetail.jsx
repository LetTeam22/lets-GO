import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getBikeDetail,
  addBooking,
  getAccesories,
  setBikeDetail,
} from "../../Redux/actions";
import Loading from "../Loading/Loading";
import s from "./BikeDetail.module.css";
import icon from "../../image/bicisDestacadas/icon.png";
import swal from "sweetalert";
import RenderBikeDetail from "../Cloudinary/renderBikeDetail";
import { finalPrice } from "../../helpers/applyDiscount";
import { Accesory } from "./Accesory";

export const BikeDetail = () => {
  const dispatch = useDispatch();
  const bike = useSelector((state) => state.bikeDetail);
  const allAccs = useSelector((state) => state.accesories);
  const { bikeId } = useParams();
  const history = useHistory();
  const bookings = JSON.parse(localStorage.getItem("booking")) || [];

  // me fijo si la bici ya esta en el carrito para ver si hay accesorios ya seleccionados que tienen que aparecer checked
  const biciEnCarrito = bookings.find((b) => b.bike === Number(bikeId));

  const [input, setInput] = useState({
    bike: parseInt(bikeId, 10),
    accs: [],
    totalAcc: 0,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAccesories());
    dispatch(getBikeDetail(bikeId));
    fillInput();
    return () => {
      dispatch(setBikeDetail([]));
    };
  }, [dispatch, bikeId]); // eslint-disable-line react-hooks/exhaustive-deps

  // lleno el input si la bici está en el carrito y tiene accesorios
  const fillInput = () => {
    if (biciEnCarrito && biciEnCarrito.accs.length) {
      setInput({ ...input, accs: [...biciEnCarrito.accs] });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const filteredBikes = bookings.filter((b) => b.bike !== Number(bikeId));
    localStorage.setItem("booking", JSON.stringify([...filteredBikes, input]));
    dispatch(addBooking(input));
    setInput({
      accs: [],
      totalAcc: 0,
    });
    swal({
      title: "Bicicleta añadida al carrito",
      icon: "success",
      buttons: {
        cancel: {
          text: "Seguir buscando",
          value: null,
          visible: true,
          className: "",
          closeModal: true,
        },
        confirm: {
          text: "Ir al carrito",
          value: true,
          visible: true,
          className: s.btnSwal,
          closeModal: true,
        },
      },
    }).then((goCart) => {
      if (goCart) {
        history.push("/cart");
      } else {
        history.push("/home");
      }
    });
  };

  const handleCheck = (e) => {
    setInput({
      ...input,
      accs: e.target.checked
        ? [...input.accs, Number(e.target.id)]
        : [...input.accs].filter((a) => a !== Number(e.target.id)),
    });
  };

  const adicional = () => {
    let adic = 0;
    allAccs.length &&
      input.accs.forEach((acc) => {
        const objAcc = allAccs.find((a) => a.idAcc === acc);
        const price = Number(objAcc.price);
        adic += price;
      });
    input.totalAcc = adic;
    return input.totalAcc;
  };

  return (
    <>
      {!!bike.length ? (
        <Loading />
      ) : (
        <div className={s.container}>
          <div className={s.initial}>
            <div className={s.name}>
              <h3 className={s.title}>{bike.name}</h3>
              <p>Estás a punto de hacer tu mejor elección...</p>
            </div>
            <div className={s.row}>
              <div className={s.txt}>
                <div className={s.desc}>
                  <p className={s.ph}>{bike.description}</p>
                </div>
                <br />
                <div className={s.containerDetails}>
                  <div className={s.cont}>
                    <img className={s.icon} src={icon} alt="" />
                    <p className={s.parameters}>Tipo {bike.type} </p>
                  </div>
                  <div className={s.cont}>
                    <img className={s.icon} src={icon} alt="" />
                    <p className={s.parameters}>Tracción {bike.traction}</p>
                  </div>
                  <div className={s.cont}>
                    <img className={s.icon} src={icon} alt="" />
                    <p className={s.parameters}> Rodado {bike.wheelSize}</p>
                  </div>
                  <div className={s.cont}>
                    <img className={s.icon} src={icon} alt="" />
                    <p className={s.parameters}> Puntuación {bike.rating}/10</p>
                  </div>
                </div>
                <div className={s.prCont}>
                  <h4 className={s.pr}>¡Llevala con vos por</h4>
                  <h4 className={Number(bike.discount) ? s.prOld : s.pr}>
                    ${bike.price}
                  </h4>
                  {!!Number(bike.discount) && (
                    <h4 className={s.pr}>
                      ${finalPrice(bike.price, bike.discount)}
                    </h4>
                  )}
                  <h4 className={s.pr}>por día!</h4>
                </div>
              </div>

              <div className={s.image1}>
                  <RenderBikeDetail publicId={bike.image} />
              </div>
            </div>
          </div>
          <div>
            <div className={s.titleAccAndTech}>
              <h2 className={s.titleTA}>Accesorios opcionales</h2>
            </div>
            {/* <div className={s.containerGral}>
              <div className={s.containerAcc}>
                {allAccs
                  ?.filter((acc) => acc.status === "active")
                  .map((acc) => {
                    return (
                      <Accesory
                        key={acc.idAcc}
                        id={acc.idAcc}
                        name={acc.name}
                        handleCheck={handleCheck}
                        price={acc.price}
                        image={acc.image}
                        defaultChecked={
                          biciEnCarrito &&
                          biciEnCarrito.accs.includes(acc.idAcc)
                        }
                      />
                    );
                  })}
              </div>
              <div className={s.containerAccesories}>
                .
                <div>
                  <p className={s.precioTotal}>Total adicional</p>
                  <p className={s.precioTotal}>$ {adicional()} / dia</p>
                </div>
                <button
                  className={s.btn2}
                  onClick={(e) => {
                    handleClick(e);
                  }}
                >
                  {" "}
                  Agregar al carrito{" "}
                </button>
              </div>
            </div> */}
          </div>
          <div className={s.gallery}>
            <div>
              <img
                className={s.photo}
                src="https://www.ternbicycles.com/sites/default/files/styles/small_rectangle_2x/public/images/bikes/other/2020/07/tn-photo-verge-s8i-belt-drive-web.jpg.webp?itok=UGa8TR7B"
                alt="img not found"
              />
            </div>
            <div>
              <img
                className={s.photo}
                src="https://www.ternbicycles.com/sites/default/files/styles/small_rectangle_2x/public/images/bikes/other/2015/09/noded7i-highlight-3-0.jpg.webp?itok=NcKQBP4q"
                alt="img not found"
              />
            </div>
            <div>
              <img
                className={s.photo}
                src="https://www.ternbicycles.com/sites/default/files/styles/small_rectangle_2x/public/images/bikes/other/2020/07/tn-photo-verge-s8i-andros-valo-web.jpg.webp?itok=ZPRHKwen"
                alt="img not found"
              />
            </div>
          </div>
          <div className={s.titleAccAndTech}>
            <h2 className={s.titleTA}>Tecnología</h2>
          </div>
          <img
            className={s.tech}
            src="https://res.cloudinary.com/pflet/image/upload/v1662686159/Let/image/Technology_h3knbm.png"
            alt=""
          />
        </div>
      )}
    </>
  );
};

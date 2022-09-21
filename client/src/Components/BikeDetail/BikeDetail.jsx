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
import Chatbot from "../ChatBot/ChatBot";

export const BikeDetail = () => {
  const dispatch = useDispatch();
  const bike = useSelector((state) => state.bikeDetail);
  const allAccs = useSelector((state) => state.accesories);
  const { bikeId } = useParams();
  const history = useHistory();
  const bookings = JSON.parse(localStorage.getItem("booking")) || [];

  //para renderizar video por tipo de bici
  const videoTouring = "https://res.cloudinary.com/pflet/video/upload/v1663533446/Let/TecnologyBikes/touring_oh9l1o.mp4"
  const videoMTB = "https://res.cloudinary.com/pflet/video/upload/v1663531860/Let/TecnologyBikes/mtb_mssr6o.mp4"
  const videoTandem = "https://res.cloudinary.com/pflet/video/upload/v1663534192/Let/TecnologyBikes/ta%CC%81ndem_sm4olo.mp4"
  const videoCity = "https://res.cloudinary.com/pflet/video/upload/v1663533477/Let/TecnologyBikes/city_sgwxk7.mp4"
  const videoBMX = "https://res.cloudinary.com/pflet/video/upload/v1663547587/Let/TecnologyBikes/bmxShort_wwmkzt.mp4"
  const videoFolding = "https://res.cloudinary.com/pflet/video/upload/v1663547870/Let/TecnologyBikes/folding_x0izl7.mp4"

  const bikeVideo = (video) => {
    if (video === 'touring') return videoTouring
    if (video === "mtb") return videoMTB
    if (video === "tandem") return videoTandem
    if (video === "city") return videoCity
    if (video === "bmx") return videoBMX
    if (video === "folding") return videoFolding
  }

  //para renderizar tecnologías por tipo de bici

  const techTouring = "https://res.cloudinary.com/pflet/image/upload/v1663555014/Let/TecnologyBikes/TechTouring_jzqkrg.png"
  const techMTB = "https://res.cloudinary.com/pflet/image/upload/v1663553069/Let/TecnologyBikes/TechMTB_jfne9z.png"
  const techTandem = "https://res.cloudinary.com/pflet/image/upload/v1663562939/Let/TecnologyBikes/TechTandem_iqp4yw.png"
  const techCity = "https://res.cloudinary.com/pflet/image/upload/v1663558628/Let/TecnologyBikes/TechCity_qdb8se.png"
  const techBMX = "https://res.cloudinary.com/pflet/image/upload/v1663560790/Let/TecnologyBikes/TechBMX_yxhr7c.png"
  const techFolding = "https://res.cloudinary.com/pflet/image/upload/v1662686159/Let/image/Technology_h3knbm.png"

  const bikeTech = (tech) => {
    if (tech === 'touring') return techTouring
    if (tech === "mtb") return techMTB
    if (tech === "tandem") return techTandem
    if (tech === "city") return techCity
    if (tech === "bmx") return techBMX
    if (tech === "folding") return techFolding
  }

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
      <Chatbot />
      {
        !!bike.length 
        ? <Loading /> 
        :
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
                  <p className={s.parameters}> Puntuación {bike.rating}/10</p>
                </div>
                <div className={s.prCont}>
                  <h4 className={s.pr}>¡Llevala con vos por</h4>
                  <h4 className={Number(bike.discount) ? s.prOld : s.pr}>${bike.price}</h4>
                  {!!Number(bike.discount) && <h4 className={s.pr}>${finalPrice(bike.price, bike.discount)}</h4>}
                  <h4 className={s.pr}>por día!</h4>
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
              <div className={s.containerGral}>
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
                    AGREGAR AL CARRITO{" "}
                  </button>
                </div>
              </div>
            </div>
            <div className={s.titleAccAndTech} style={{marginTop:"3rem"}}>
              <h2 className={s.titleTA} >En acción</h2>
            </div>
            <div className={s.video}>
              <video style={{ width: "100%" }} autoPlay muted loop src={bikeVideo(bike.type)}></video>
            </div>
            <div className={s.titleAccAndTech}>
              <h2 className={s.titleTA}>Tecnología</h2>
            </div>
            <img className={s.tech} src={bikeTech(bike.type)} alt="Detalles de la bicicleta" />
          </div>
      }
    </>
  );
};

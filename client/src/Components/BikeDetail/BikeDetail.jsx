import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getBikeDetail, addBooking, getAccesories, setBikeDetail } from "../../Redux/actions";
import Loading from "../Loading/Loading";
import s from "./BikeDetail.module.css";
import icon from "../../image/bicisDestacadas/icon.png";
import tech from "../../image/Technology.png";
import swal from "sweetalert";
import RenderAccesories from "../Cloudinary/renderAccesories";
import RenderBikeDetail from "../Cloudinary/renderBikeDetail";
// import { image } from "@cloudinary/url-gen/qualifiers/source";

export const BikeDetail = () => {
  const dispatch = useDispatch();
  const bike = useSelector((state) => state.bikeDetail);
  const allAccs = useSelector((state) => state.accesories);
  const { bikeId } = useParams();
  const history = useHistory();

  const [input, setInput] = useState({
    bike: bikeId,
    canasto: '',
    silla: '',
    luces: '',
    casco: '',
    candado: '',
    lentes: '',
    botella: '',
    calzado: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAccesories());
    dispatch(getBikeDetail(bikeId));
    return () => { 
      dispatch(setBikeDetail([]))
    } 
  }, [dispatch, bikeId]);


  const handleClick = (e) => {
    e.preventDefault();
    const bookedBikes = JSON.parse(localStorage.getItem("booking") || "[]");
    localStorage.setItem("booking", JSON.stringify([...bookedBikes, input]));
    dispatch(addBooking(input));
    setInput({
      canasto: '',
      silla: '',
      luces: '',
      casco: '',
      candado: '',
      lentes: '',
      botella: '',
      calzado: '',
      totalAcc: 0
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
      [e.target.name]: e.target.value,
    });
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
    // console.log(accesories);
    return accesories;
  };

  const adicional = () => {
    let adic = 0;
    if (llenarAccs(input).length > 0) {
      llenarAccs(input).forEach((acc) => (adic += parseInt(acc.price, 10)));
    }
    input.totalAcc = adic
    return input.totalAcc;
  };

  return (
    <>
      { !!bike.length ? <Loading /> :
        <div className={s.container}>
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

              <div className={s.cont}>
                <div className={s.contimg}>
                  <img className={s.icon} src={icon} alt="" />
                </div>
                <div className={s.contp}>
                  <p className={s.parameters}>Tipo {bike.type} </p>
                </div>
              </div>

              <div className={s.cont}>
                <div className={s.contimg}>
                  <img className={s.icon} src={icon} alt="" />
                </div>
                <p className={s.parameters}>Tracción {bike.traction}</p>
              </div>

              <div className={s.cont}>
                <div className={s.contimg}>
                  <img className={s.icon} src={icon} alt="" />
                </div>
                <p className={s.parameters}> Rodado {bike.wheelSize}</p>
              </div>

              <div className={s.cont}>
                <div className={s.contimg}>
                  <img className={s.icon} src={icon} alt="" />
                </div>
                <p className={s.parameters}> Puntuación {bike.rating}/10</p>
              </div>
              <h4 className={s.pr}>¡Llevala con vos por ${bike.price} por día!</h4>
            </div>

            <div className={s.image1}>
              <div className={s.image2}>
                <RenderBikeDetail publicId={bike.image}/>
                {console.log(bike.image)}
              </div>
            </div>
          </div>
          <div>
            <div className={s.titleAccAndTech}>
              <h2>Accesorios opcionales</h2>
            </div>
            <div className={s.containerGral}>
              <div className={s.containerAcc}>
                <div className={s.boxes}>
                  <input
                    id="box-1"
                    value='5'
                    type="checkbox"
                    name="canasto"
                    onClick={(e) => {
                      handleCheck(e);
                    }}
                  />
                  <label htmlFor="box-1">Canasto</label>
                  {/* <img src={allAccs[4]?.image} alt="not found" /> */}
                  {allAccs[4] ? (
                    <RenderAccesories
                      className={s.imgCloud}
                      publicId={allAccs[4].image}
                    />
                  ) : null}
                  <p className={s.precio}>$ {allAccs[4]?.price} / día</p>
                </div>

                <div className={s.boxes}>
                  <input
                    id="box-2"
                    value='3'
                    type="checkbox"
                    name="silla"
                    onClick={(e) => {
                      handleCheck(e);
                    }}
                  />
                  <label htmlFor="box-2">Silla portabebés</label>
                  {/* <img src={allAccs[2]?.image} alt="not found" /> */}
                  {allAccs[2] ? (
                    <RenderAccesories publicId={allAccs[2].image} />
                  ) : null}
                  <p className={s.precio}>$ {allAccs[2]?.price} / día</p>
                </div>

                <div className={s.boxes}>
                  <input
                    id="box-3"
                    value='6'
                    type="checkbox"
                    name="luces"
                    onClick={(e) => {
                      handleCheck(e);
                    }}
                  />
                  <label htmlFor="box-3">Luces</label>
                  {/* <img src={allAccs[5]?.image} alt="not found" /> */}
                  {allAccs[5] ? (
                    <RenderAccesories publicId={allAccs[5].image} />
                  ) : null}
                  <p className={s.precio}>$ {allAccs[5]?.price} / día</p>
                </div>

                <div className={s.boxes}>
                  <input
                    id="box-4"
                    value='1'
                    type="checkbox"
                    name="casco"
                    onClick={(e) => {
                      handleCheck(e);
                    }}
                  />
                  <label htmlFor="box-4">Casco</label>
                  {/* <img src={allAccs[0]?.image} alt="not found" /> */}
                  {allAccs[0] ? (
                    <RenderAccesories publicId={allAccs[0].image} />
                  ) : null}
                  <p className={s.precio}>$ {allAccs[0]?.price} / día</p>
                </div>

                <div className={s.boxes}>
                  <input
                    id="box-5"
                    value='7'
                    type="checkbox"
                    name="candado"
                    onClick={(e) => {
                      handleCheck(e);
                    }}
                  />
                  <label htmlFor="box-5">Candado</label>
                  {/* <img src={allAccs[6]?.image} alt="not found" /> */}
                  {allAccs[6] ? (
                    <RenderAccesories publicId={allAccs[6].image} />
                  ) : null}
                  <p className={s.precio}>$ {allAccs[6]?.price} / día</p>
                </div>

                <div className={s.boxes}>
                  <input
                    id="box-6"
                    value='8'
                    type="checkbox"
                    name="lentes"
                    onClick={(e) => {
                      handleCheck(e);
                    }}
                  />
                  <label htmlFor="box-6">Lentes</label>
                  {/* <img src={allAccs[7]?.image} alt="not found" /> */}
                  {allAccs[7] ? (
                    <RenderAccesories publicId={allAccs[7].image} />
                  ) : null}
                  <p className={s.precio}>$ {allAccs[7]?.price} / día</p>
                </div>

                <div className={s.boxes}>
                  <input
                    id="box-7"
                    value='2'
                    type="checkbox"
                    name="botellita"
                    onClick={(e) => {
                      handleCheck(e);
                    }}
                  />
                  <label htmlFor="box-7">Botella</label>
                  {/* <img src={allAccs[1]?.image} alt="not found" /> */}
                  {allAccs[1] ? (
                    <RenderAccesories publicId={allAccs[1].image} />
                  ) : null}
                  <p className={s.precio}>$ {allAccs[1]?.price} / día</p>
                </div>

                <div className={s.boxes}>
                  <input
                    type="checkbox"
                    value='4'
                    id="box-8"
                    name="calzado"
                    onClick={(e) => {
                      handleCheck(e);
                    }}
                  />
                  <label htmlFor="box-8">Calzado</label>
                  {/* <img src={allAccs[3]?.image} alt="not found" /> */}
                  {allAccs[3] ? (
                    <RenderAccesories publicId={allAccs[3].image} />
                  ) : null}
                  <p className={s.precio}>$ {allAccs[3]?.price} / día</p>
                </div>
              </div>
              <div className={s.containerAccesories}>
                <button
                  className={s.btn2}
                  onClick={(e) => {
                    handleClick(e);
                  }}
                >
                  {" "}
                  Agregar al carrito{" "}
                </button>
                {/* <div>
                      <p>Accesorios seleccionados</p>
                      <ul>
                        {llenarAccs(input)?.map((acc) => {
                          return (
                            <li key={acc.name}>
                              {acc.name} + ${acc.price} / día
                            </li>
                          );
                        })}
                      </ul>
                    </div> */}

                    <div>
                      <p className={s.precio}>Total adicional</p>
                      <p className={s.precio}>$ {adicional()} / dia</p>
                    </div>
                  {/* </div> */}

              </div>
            </div>
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
            <h2>Tecnología</h2>
          </div>
          <img className={s.tech} src={tech} alt="" />
        </div>
      }
    </>
  );
};

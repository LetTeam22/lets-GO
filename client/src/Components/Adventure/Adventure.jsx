import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import s from "./Adventure.module.css";
import { addAdventure, getAllAdventures } from "../../Redux/actions";
import CardAdventures from "./CardAdventures";
import Chatbot from "../ChatBot/ChatBot";
import swal from "sweetalert";
import Loading from "../Loading/Loading";

export const Adventure = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    adv: [],
    totalAdv: 0,
  });
  const history = useHistory();
  let adventures = useSelector((state) => state.allAdventures);
  const bookedAdventures = JSON.parse(
    localStorage.getItem("adventure") || "{}"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllAdventures());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = (e) => {
    e.preventDefault();
    if (!input.adv.length) return swal({
      title: "Debes seleccionar una aventura",
      icon: "warning",
      button: {
          text: "Ok",
          value: true,
          visible: true,
          className: s.btnSwal,
          closeModal: true,
      },
    });
    const adventureLS = bookedAdventures.hasOwnProperty("adv")
      ? {
          adv: [...bookedAdventures.adv, ...input.adv],
          totalAdv: bookedAdventures.totalAdv + input.totalAdv,
        }
      : input;
    localStorage.setItem("adventure", JSON.stringify(adventureLS));
    dispatch(addAdventure(input));
    setInput({
      adv: [],
      totalAdv: 0,
    });
    history.push("/cart");
  };

  const handleCheck = (e) => {
    setInput({
      ...input,
      adv: e.target.checked
        ? [...input.adv, Number(e.target.id)]
        : [...input.adv].filter((a) => a !== Number(e.target.id)),
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const adicional = () => {
    let adic = 0;
    input.adv.forEach((ad) => {
      adic += Number(adventures.find((a) => a.idAdv === ad).price);
    });
    input.totalAdv = adic;
    return input.totalAdv;
  };

  // filtro aventuras ya agregadas al carrito
  if (bookedAdventures.hasOwnProperty("adv") && bookedAdventures.adv.length)
    adventures = adventures.filter(
      (a) => !bookedAdventures.adv.includes(a.idAdv)
    );

  if(!adventures.length) return <Loading />

  return (
    <>
      <Chatbot />
      <div className={s.left} />
      <div className={s.right} />
      <h1 className={s.h1}>EXCLUSIVO PARA LETERS AVENTUREROS</h1>
      <div className={s.containerBtn}>
        <button className={s.btn2} onClick={handleClick}>
          AGREGAR AL CARRITO
        </button>
        <p className={s.precioTotal}>Total ${adicional()}</p>
      </div>
      {/* <div className={s.container}>
        
      </div> */}
      {adventures
        .filter((a) => a.status === "active")
        .map((a) => (
          <CardAdventures
            key={a.idAdv}
            id={a.idAdv}
            name={a.name}
            date={a.date}
            image={a.image}
            description={a.description}
            conditions={a.conditions}
            price={a.price}
            difficulty={a.difficulty}
            handleCheck={handleCheck}
          />
        ))}
    </>
  );
};

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import s from './Adventure.module.css';
import { addAdventure, getAllAdventures } from '../../Redux/actions';
import CardAdventures from './CardAdventures';
import Chatbot from "../ChatBot/ChatBot";

export const Adventure = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    adv: [],
    totalAdv: 0
  })
  const history = useHistory()
  const adventures = useSelector((state) => state.allAdventures)

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllAdventures())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = (e) => {
    e.preventDefault()
    const bookedAdventures = JSON.parse(localStorage.getItem("adventure") || "[]");
    localStorage.setItem("adventure", JSON.stringify([...bookedAdventures, input]));
    dispatch(addAdventure(input));
    setInput({
      adv: [],
      totalAdv: 0
    })
    history.push('/cart')
  }

  const handleCheck = (e) => {
    setInput({
      ...input,
      adv: e.target.checked ? [...input.adv, Number(e.target.id)] : [...input.adv].filter(a => a !== Number(e.target.id))
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  const adicional = () => {
    let adic = 0
    input.adv.forEach(ad => {
      adic += Number(adventures[(ad - 1)].price)
    })
    input.totalAdv = adic
    return input.totalAdv;
  };

  return (
    <>
      <Chatbot />
      <div className={s.left} />
      <div className={s.right} />
      <h1 className={s.h1}>EXCLUSIVO PARA LETERS AVENTUREROS</h1>
      <div className={s.containerBtn}>
        <button className={s.btn2} onClick={handleClick}>Agregar al carrito</button>
      </div>
      {adventures.map(a => <CardAdventures
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
      )}
      <div className={s.container}>
        <p className={s.precioTotal}>Total ${adicional()}</p>
      </div>

    </>
  )
};
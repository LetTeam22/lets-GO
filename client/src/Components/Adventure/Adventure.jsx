import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import s from './Adventure.module.css';
import { addAdventure } from '../../Redux/actions';
import { adventures } from './data';
import CardAdventures from './CardAdventures';

export const Adventure = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    adv: [],
    totalAdv: 0
  })
  const history = useHistory()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
      <div className={s.left} />
      <div className={s.right} />
      <h1 className={s.h1}>EXCLUSIVO PARA LETERS AVENTUREROS</h1>
      { adventures.map(a => <CardAdventures
          key={a.id}
          id={a.id}
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
        <div className={s.containerBtn}>
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
    </>
  )
};
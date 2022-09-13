import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import s from './Adventure.module.css';
import { addAdventure } from '../../Redux/actions';
import { adventures } from './data';
import CardAdventures from './CardAdventures';
// import aux_aventuras from '../../image/aux_/aux_aventuras.png';

export const Adventure = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    adv: [],
    totalAdv: 0
  })
  const history = useHistory()


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
    // <img src="https://res.cloudinary.com/pflet/image/upload/v1662686120/Let/image/aux_/aux_aventuras_ir3wap.png" alt='aux_aventuras' className={s.img_aux} />
    <div>

      <div className={s.container}>
        <h1 className={s.h1}>Exclusivo para leters aventureros</h1>
      </div>

      {
        adventures.map(a => <CardAdventures
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
        />)
      }
      <div>
        <div className={s.containerAdic}>
          <p className={s.precioTotal}>Total adicional ${adicional()}</p>
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
      </div>
    </div>
  )
};
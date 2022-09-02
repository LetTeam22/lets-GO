import React from "react";
import s from "./Destacados.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getFamousBikes } from "../../Redux/actions";
import rodado from '../../image/rueda_bici.png';
import mecanica from '../../image/mecanica.png';
import electrica from '../../image/electrica.png';

export const Destacados = () => {

  const bikes = useSelector(state => state.famousBikes);
  console.log(bikes);
  
  useEffect(() => {
    getFamousBikes();
  }, []);

  return (
    bikes.length 
    ? <>
        <div className={s.container}>
          <span className={s.title}>DESTACADAS</span>
          {
            bikes.map(bike => {
              return (
                <div className={s.destacadas} id={s.one}>
                  <img src={bike.image} alt="bici1" className={s.images} />
                  <h4>{bike.name}</h4>
                  <div className={s.dataCont}>
                    <span className={s.type}>{bike.type} </span>
                    <img className={bike.traction === 'eléctrica' ? s.electrica : s.mecanica} src={bike.traction === 'eléctrica' ? electrica : mecanica} alt='Tracción '/>
                    <div className={s.rodadoCont}>
                        <img className={s.rueda} src={rodado} alt='Rodado '/>
                        <span className={s.rodado}>{bike.wheelSize}</span>
                    </div>
                  </div>    
                  <h4 className={s.price}>${bike.price}/día</h4>
                </div>
              )
            })
          }
        </div>
      </>
    : <></>
    
  );
};

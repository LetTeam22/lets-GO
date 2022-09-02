import React, { useEffect } from "react";
import s from "./Destacados.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getFamousBikes } from "../../Redux/actions";
import rodado from '../../image/rueda_bici.png';
import gear from '../../image/gear.png'
import ray from '../../image/ray.png'
import { Link } from "react-router-dom";
// import { VscChevronRight, VscChevronLeft } from "react-icons/vsc";



export const Destacados = () => {

  const bikes = useSelector(state => state.famousBikes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFamousBikes());
  }, [dispatch]);

  return (
    bikes.length 
    ? <>
        <div className={s.container}>
          <span className={s.title}>DESTACADAS</span>
          <div className={s.slider}>
            <div className={s.slider_track}>
              {
                bikes.map(bike => {
                  return (
                    <div className={`${s.destacadas} ${s.slide}`} id={s.one}>
                        <Link to={`/bike/${bike.idBike}`}>
                          <img src={bike.image} alt="bicis" className={s.images} />
                        </Link>
                        <h4>{bike.name}</h4>
                        <div className={s.dataCont}>
                          <span className={s.type}>{bike.type} </span>
                          <img className={bike.traction === 'eléctrica' ? s.electrica : s.mecanica} src={bike.traction === 'eléctrica' ? ray : gear} alt='Tracción '/>
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
          </div>
        </div>
      </>
    : <></>
    
  );
};
import React, { useEffect } from "react";
import s from "./Destacados.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getFamousBikes } from "../../Redux/actions";
import { Link } from "react-router-dom";
import RenderOneImage from "../Cloudinary/renderOneImage";
import { GiElectric } from 'react-icons/gi';
import { GoGear } from 'react-icons/go';



export const Destacados = () => {

  const bikes = useSelector(state => state.famousBikes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFamousBikes());
  }, [dispatch]);

  const imgRat0 = "https://res.cloudinary.com/pflet/image/upload/v1662686116/Let/image/stars/0stars_e0ehyc.png"
  const imgRat05 = "https://res.cloudinary.com/pflet/image/upload/v1662686112/Let/image/stars/0.5star_kbkxqg.png"
  const imgRat1 = "https://res.cloudinary.com/pflet/image/upload/v1662686133/Let/image/stars/1star_cbqaj3.png"
  const imgRat15 = "https://res.cloudinary.com/pflet/image/upload/v1662686119/Let/image/stars/1.5stars_gwm63h.png"
  const imgRat2 = "https://res.cloudinary.com/pflet/image/upload/v1662686133/Let/image/stars/2stars_nnodhd.png"
  const imgRat25 = "https://res.cloudinary.com/pflet/image/upload/v1662686133/Let/image/stars/2.5stars_tzskis.png"
  const imgRat3 = "https://res.cloudinary.com/pflet/image/upload/v1662686134/Let/image/stars/3stars_mfspbx.png"
  const imgRat35 = "https://res.cloudinary.com/pflet/image/upload/v1662686133/Let/image/stars/3.5stars_wbsdlh.png"
  const imgRat4 = "https://res.cloudinary.com/pflet/image/upload/v1662686135/Let/image/stars/4stars_duh9ag.png"
  const imgRat45 = "https://res.cloudinary.com/pflet/image/upload/v1662686135/Let/image/stars/4.5stars_wjm9o0.png"
  const imgRat5 = "https://res.cloudinary.com/pflet/image/upload/v1662686135/Let/image/stars/5stars_dphk3f.png"

  const imgRating = rat => {
    if (rat < 0.5) return imgRat0
    if (rat < 1.5) return imgRat05
    if (rat < 2.5) return imgRat1
    if (rat < 3.5) return imgRat15
    if (rat < 4.5) return imgRat2
    if (rat < 5.5) return imgRat25
    if (rat < 6.5) return imgRat3
    if (rat < 7.5) return imgRat35
    if (rat < 8.5) return imgRat4
    if (rat < 9.5) return imgRat45
    return imgRat5
}


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
                    <div key= {bike.idBike} className={`${s.destacadas} ${s.slide}`} id={s.one}>
                        <Link to={`/bike/${bike.idBike}`}>
                          <RenderOneImage publicId={bike.image} alt={bike.name} />
                        </Link>
                        <Link to={`/bike/${bike.idBike}`}><h4 className={s.name}>{bike.name}</h4></Link>
                        <div className={s.dataCont}>
                          <span className={s.type}>{bike.type}</span>
                          {
                            bike.traction === 'eléctrica' ? <GiElectric size='2.5rem' className={s.icon} /> : <GoGear size='2.5rem' className={s.icon} />
                          } 
                          <div className={s.rodadoCont}>
                              <img className={s.rueda} src="https://res.cloudinary.com/pflet/image/upload/v1662686110/Let/image/rueda_bici_kouezn.png" alt='Rodado' />
                              <span className={s.rodado}>{bike.wheelSize}</span>
                          </div>
                        </div>
                        <div className={s.ratingCont}>
                            <img className={s.stars} src={imgRating(bike.rating)} alt='Rating '/>
                            <span className={s.rating}>{bike.rating}</span>
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
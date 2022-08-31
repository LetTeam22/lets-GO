import React from 'react';
import s from './Card.module.css';
import imgRat0 from '../../image/stars/0stars.png'
import imgRat05 from '../../image/stars/0.5star.png'
import imgRat1 from '../../image/stars/1star.png'
import imgRat15 from '../../image/stars/1.5stars.png'
import imgRat2 from '../../image/stars/2stars.png'
import imgRat25 from '../../image/stars/2.5stars.png'
import imgRat3 from '../../image/stars/3stars.png'
import imgRat35 from '../../image/stars/3.5stars.png'
import imgRat4 from '../../image/stars/4stars.png'
import imgRat45 from '../../image/stars/4.5stars.png'
import imgRat5 from '../../image/stars/5stars.png'
import rodado from '../../image/rueda_bici.png'
import mecanica from '../../image/mecanica.png'
import electrica from '../../image/electrica.png'


export const Card = ({ name, type, image, traction, wheelSize, price, rating, id }) => {

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
        <div className={id % 2 === 0 ? `${s.card}` : `${s.cardTwo}`}>
            <img src={image} alt='img not found' className={s.imgCard} /> 
            <div>
                <h3 className={s.name}>{name}</h3>
                <div className={s.dataCont}>
                    <span className={s.type}>{type} </span>
                    {/* <h4 className={s.data}>Tracción: {traction}</h4> */}
                    <img className={traction === 'eléctrica' ? s.electrica : s.mecanica} src={traction === 'eléctrica' ? electrica : mecanica} alt='Tracción '/>
                    {/* <h4 className={s.data}>Rodado: {wheelSize}</h4> */}
                    <div className={s.rodadoCont}>
                        <img className={s.rueda} src={rodado} alt='Rodado '/>
                        <span className={s.rodado}>{wheelSize}</span>
                    </div>
                </div>              
                {/* <h4 className={s.data}>Rating: {rating} ☆</h4> */}
                <div className={s.ratingCont}>
                    <img className={s.stars} src={imgRating(rating)} alt='Rating '/>
                    <span className={s.rating}>{rating}</span>
                </div>
                <h4 className={s.price}>${price}/día</h4>
            </div>
                              
        </div>
    )
};
import { CreateExperiences } from '../QualifyExperience/CreateExperiences/CreateExperiences'
import { BikeRating } from '../QualifyExperience/BikeRating/BikeRating'
import s from '../QualifyExperience/QualifyExperience.module.css'
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from "react";

export const QualifyExperience = () => {

    const userBookings = useSelector(state => state.userBookings);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div className={s.left}></div>
            <div className={s.right}></div>
            <div className={s.containerTit}>
                <h1 className={s.h1}>¡SUMATE A LA COMUNIDAD let's GO!</h1>
                <p className={s.p}>Compartí con otros leters cómo fue tu viaje. Subí la foto de tu aventura, escribí una reseña y califica la bicis que elegiste.</p>
            </div>
            <div className= {s.containerComp}>
                <CreateExperiences />
                { userBookings.bikes?.map(b => (
                    <BikeRating
                        key= {b.idBike}
                        name= {b.name}
                        image= {b.image}
                        idBike={b.idBike}
                        rating={b.rating}
                        idBooking={userBookings.idBooking}
                    />
                ))}
            </div>
        </>
    )
};
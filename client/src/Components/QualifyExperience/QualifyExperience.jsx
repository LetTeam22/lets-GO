import { CreateExperiences } from '../QualifyExperience/CreateExperiences/CreateExperiences'
import { BikeRating } from '../QualifyExperience/BikeRating/BikeRating'
import s from '../QualifyExperience/QualifyExperience.module.css'
import { useSelector } from 'react-redux';
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

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
                <Link className={s.containbtn} to='/bike/profile'><button className={s.btn}>VOLVER</button></Link>
            </div>
            {userBookings.idBooking ? 
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
                :
                <div className= {s.contain}>
                    <h1 className={s.h1}>Tenés que elegir una experiencia para calificar</h1>
                </div>
            }
        </>
    )
};
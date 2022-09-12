import { CreateExperiences } from '../QualifyExperience/CreateExperiences/CreateExperiences'
import { BikeRating } from '../QualifyExperience/BikeRating/BikeRating'
import s from '../QualifyExperience/QualifyExperience.module.css'
import { useSelector } from 'react-redux';

export const QualifyExperience = () => {

    const userBookings = useSelector(state => state.userBookings);

    return (
        <>
            <div className={s.izq}></div>
            <div className={s.der}></div>
            <h1 className={s.h1}>Sumate a la comuinidad let's GO!</h1>
            <p className={s.p}>Compartí con otras personas cómo fue tu viaje usando bicis let's Go. Podés subir la imágen de tu aventura, escribir una reseña y calificar la  bicis que elegiste.</p>
            <div className= {s.container}>
                <CreateExperiences />
                { userBookings.bikes.map(b => <BikeRating key= {b.idBike} name= {b.name} image= {b.image} idBike={b.idBike} />) }
            </div>
            
        </>
    )
};
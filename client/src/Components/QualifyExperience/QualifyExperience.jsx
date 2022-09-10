import { CreateExperiences } from '../QualifyExperience/CreateExperiences/CreateExperiences'
import { BikeRating } from '../QualifyExperience/BikeRating/BikeRating'
import s from '../QualifyExperience/QualifyExperience.module.css'

export const QualifyExperience = () => {


return (
    <>
        <h1 className={s.h1}>Sumate a la comuinidad let's GO!</h1>
        <p className={s.p}>Compartí con otras personas cómo fue tu viaje usando bicis let's Go. Podés subir la imágen de tu aventura, escribir una reseña y calificar la  bicis que elegiste.</p>
        <div className= {s.container}>
            <CreateExperiences />
            <BikeRating />
        </div>
    </>
)
};
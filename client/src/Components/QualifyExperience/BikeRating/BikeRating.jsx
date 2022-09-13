import s from '../BikeRating/BikeRating.module.css'
import { RenderBikeRating } from '../../Cloudinary/renderBikeRating'
// import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postBikeRating } from '../../../Redux/actions';


export const BikeRating = ({ name, image, idBike, rating }) => {

    const dispatch = useDispatch();
    const bikeRating = useSelector(state => state.bikeRating);
    const [ratingBike, setRating] = useState({ idBike, rating: 0 });
    const [disabled, setDisabled] = useState(false);

    const handleRatingClick = e => {
        setRating({...ratingBike, rating: parseInt(e.target.defaultValue)});
    };

    const handleClick = e => {
        e.preventDefault();
        dispatch(postBikeRating(ratingBike));
        setRating({ idBike, rating: 0 });
        setDisabled(true);
    };

    // me falta esto!
    const alreadyQualified = bikeRating.find(e => e.idBike === idBike)
    console.log(alreadyQualified)
    //

    return (
        <>
            <div className={s.container}>
                <RenderBikeRating publicId={image}/>
                <div className={s.card}>
                    <span className={s.name}>{name}</span>
                    <span className={s.spanActual}>Rating actual: {rating}</span>
                    <span className={s.spanUs}>Calificala según tu exeriencia!</span>
                    {/* <Typography component="legend" /> */}
                    <Rating  disabled={disabled} name="customized-10" defaultValue={0} max={10} onClick={handleRatingClick}/>
                    <div className={s.ratingUs}>              
                        { ratingBike.rating === 0 ? <span className={s.spanUs} /> :
                        <>
                            <button className={s.btn} onClick={handleClick}>OK</button>
                            <span className={s.spanUs}>Calificar con: {ratingBike.rating} puntos</span>
                        </>
                        }
                        { disabled && <span className={s.name}>¡Gracias por tu calificación!</span> }
                    </div>
                </div>
            </div>
        </>
    )
};
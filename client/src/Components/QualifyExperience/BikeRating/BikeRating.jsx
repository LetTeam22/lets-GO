import s from '../BikeRating/BikeRating.module.css'
import { RenderBikeRating } from '../../Cloudinary/renderBikeRating'
import Rating from '@mui/material/Rating'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postBikeRating, getBikes, getHistoryRatings } from '../../../Redux/actions';


export const BikeRating = ({ name, image, idBike, rating, idBooking }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHistoryRatings(idBooking))
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const bikeRating = useSelector(state => state.bikeRating);
    const [ratingBike, setRatingBike] = useState({ idBike, rating: 0, idBooking });
    const handleRatingClick = e => {
        setRatingBike({...ratingBike, rating: parseInt(e.target.defaultValue)});
    };

    const handleClick = e => {
        e.preventDefault();
        dispatch(postBikeRating(ratingBike));
        dispatch(getBikes());
        setRatingBike({ idBike, rating: 0, idBooking });
    };

    const alreadyQualified = bikeRating.find(e => e.idBike === idBike);
    // console.log(alreadyQualified);

    return (
        <>
            { !alreadyQualified ?
                <div className={s.container}>
                    <RenderBikeRating publicId={image}/>
                    <div className={s.card}>
                        <span className={s.name}>{name}</span>
                        <span className={s.spanActual}>Rating actual: {rating}</span>
                        <span className={s.spanUs}>Calificá según tu experiencia</span>
                        <Rating  name="customized-10" defaultValue={0} max={10} onClick={handleRatingClick}/>
                        <div className={s.ratingUs}>              
                            { ratingBike.rating === 0 ? <span className={s.spanUs} /> :
                            <>
                                <button className={s.btn} onClick={handleClick}>OK</button>
                                <span className={s.point}> {ratingBike.rating} puntos</span>
                            </>
                            }
                            {/* { disabled && <span className={s.name}>¡Gracias por tu calificación!</span> } */}
                        </div>
                    </div>
                </div>
                :
                <div className={s.container}>
                    <RenderBikeRating publicId={image}/>
                    <div className={s.card}>
                        <span className={s.name}>{name}</span>
                        <span className={s.spanActual1}>Rating actualizado: {alreadyQualified.rating}</span>
                        <span className={s.spanUs1}>.</span>
                        <Rating  disabled={true} name="customized-10" defaultValue={0} max={10} />
                        <div className={s.ratingUs}>              
                            <span className={s.thanks}>¡Gracias por tu calificación!</span>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};
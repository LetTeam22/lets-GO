import s from '../BikeRating/BikeRating.module.css'
import { RenderBikeRating } from '../../Cloudinary/renderBikeRating'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postBikeRating } from '../../../Redux/actions';


export const BikeRating = ({ name, image, idBike }) => {

    const dispatch = useDispatch();
    const [ratingBike, setRating] = useState({ idBike, rating: 0 });

    const handleRatingClick = e => {
        setRating({...ratingBike, rating: parseInt(e.target.defaultValue)});
    };

    const handleClick = e => {
        e.preventDefault();
        console.log(ratingBike);
        dispatch(postBikeRating(ratingBike));
        setRating({ idBike, rating: 0 });
    };

    return (
        <div className={s.container}>
            <div className={s.card}>
                <span className={s.name}>{name}</span>
                <RenderBikeRating publicId={image}/>
                <Typography component="legend" />
                <Rating  name="customized-10" defaultValue={2} max={10} onClick={handleRatingClick}/>
                <span className={s.span}>{ratingBike.rating}</span>
                <button onClick={handleClick}>puntuar</button>
            </div>
        </div>
    )
};
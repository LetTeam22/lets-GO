import s from '../BikeRating/BikeRating.module.css'
import { RenderBikeRating } from '../../Cloudinary/renderBikeRating'
import { useSelector } from 'react-redux';


export const BikeRating = () => {

const userBookings = useSelector(state => state.userBookings);

return (
    <div className={s.container}>
        {
            userBookings.bikes.map( i => (
                <div key= {i.name} className={s.card}>
                    <span className={s.name}>{i.name}</span>
                    <RenderBikeRating publicId={i.image}/>
                </div>
            ))
        }
    </div>
)
};
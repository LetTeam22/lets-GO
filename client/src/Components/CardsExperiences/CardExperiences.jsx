import React from 'react';
import RenderAllExperiences from '../Cloudinary/renderAllExperiences';
import s from './CardExperiences.module.css'





const CardExperience = ({ imgExperience, textExperience, idExperience, userIdUser, bookingIdBooking }) => {

    return (
        <div className={s.blogCard} >
            {/* <img className={s.imgcard} src={img} alt='img not found' />  */}

            
                <RenderAllExperiences
                    publicId={imgExperience}
                />
            
            <div className={s.description}>
                {/* <h1 className={s.h1}>Aquí recibiría el userId</h1> */}
                <h2 className={s.h2}>Los leters andan diciendo...</h2>
                <p className={s.p}>{textExperience}</p>
            </div>


        </div >
    )
};

export default CardExperience
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import s from './Experiencies.module.css';


export const Experiencies = () => {
    
    const allExperiences = useSelector((state) => state.allExperiences);

    console.log(allExperiences);

    return (
        <div className={s.experiencies}>
            <span className={s.title}>EXPERIENCIAS</span>
            <p className={s.text}>Conocé las experiencias de otras personas y compartí tu aventura con bicis let's GO</p>
            <h1 className={s.h1}>0% emisión 100% emoción</h1>
            <div className={s.experiencesImg}>
                {
                    allExperiences?.slice(0, 5).map(experience => {
                        return (
                            <div className={s.img}>
                                <img src={experience.imgExperience} alt="img" className={s.experienceImg} />
                                <div className={s.hoverDiv}>
                                    <h3>{experience.firstName}</h3>
                                    <span>{experience.booking.endDate}</span>
                                    <p>{experience.textExperience}</p>
                                </div>
                            </div>    
                        )
                    })
                }
                <div className={s.experiencesBtn}>
                    <Link to='/allExperiencies'>
                        <div className={s.btn}>VER TODAS LAS EXPERIENCIAS</div>
                    </Link>
                </div>
            </div>
        </div>
    )
};
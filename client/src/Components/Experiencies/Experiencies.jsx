import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllExperiences } from '../../Redux/actions';
import s from './Experiencies.module.css';


export const Experiencies = () => {

    const allExperiences = useSelector((state) => state.allExperiences);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllExperiences());
    }, [dispatch])

    return (
        <div className={s.experiencies}>
            <span className={s.title}>EXPERIENCIAS</span>
            <p className={s.text}>Conocé las experiencias de otras personas y compartí tu aventura con bicis let's GO</p>
            <h1 className={s.h1}>0% emisión 100% emoción</h1>
            <Link to='/allExperiencies'>
                <div className={s.experiencesImg}>
                    {
                        allExperiences?.filter(e => e.status === 'active').slice(0, 6).map(experience => {
                            return (
                                <div className={s.img} key={experience.bookingIdBooking}>
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
                </div>
            </Link>
        </div>
    )
};
import React, { useEffect } from 'react';
import s from './AllExperiencies.module.css';
import { CardExperience } from './CardExperiences';
import { useDispatch, useSelector } from 'react-redux';
import { getAllExperiences } from '../../Redux/actions';
import Loading from '../Loading/Loading';

export const AllExperiencies = ({socket}) => {

    const dispatch= useDispatch();
    const allExperiences = useSelector((state) => state.allExperiences)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() =>{
        dispatch(getAllExperiences())
    }, [dispatch])
    
    return (
        <>
            <div className={s.left}></div>
            <div className={s.right}></div>
            <div className={s.container}>
                <h1 className={s.h1}>LOS LET EN PRIMERA PERSONA</h1>
            </div>
            { allExperiences.length ? allExperiences.map((e) =>{
                    return (
                        <CardExperience
                            key = {e.idExperience}
                            firstName= {e.firstName}
                            imgExperience={e.imgExperience}
                            textExperience={e.textExperience}
                            startDate={e.booking.startDate}
                            endDate={e.booking.endDate}
                            bikes={e.booking.bikes}
                            socket={socket}
                            email={e.email}
                        />
                    )
            }) : <Loading/> }
        </>
    )
};

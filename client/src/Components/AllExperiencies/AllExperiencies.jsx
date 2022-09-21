import React, { useEffect } from 'react';
import s from './AllExperiencies.module.css';
import { CardExperience } from './CardExperiences';
import { useDispatch, useSelector } from 'react-redux';
import { getAllExperiences, getAllLikes } from '../../Redux/actions';
import Loading from '../Loading/Loading';
import { reverseDate } from '../../helpers/convertDate.js';
import CalendarE from './CalendarExperiences/CalendarE';
import { ExperiencesNotFound } from './ExperiencesNotFound/ExperiencesNotFound';
import OrderingsE from './OrderingsE/OrderingsE';
import Chatbot from "../ChatBot/ChatBot";
import { useAuth0 } from '@auth0/auth0-react';


export const AllExperiencies = ({socket}) => {

    const dispatch= useDispatch();
    const allExperiences = useSelector((state) => state.allExperiences)
    const { user } = useAuth0();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    useEffect(() =>{
        dispatch(getAllExperiences());
        if(user?.email) dispatch(getAllLikes(user?.email))
    }, [dispatch, user]);
    
    return (
        <>
        <Chatbot/>
            <div className={s.left}></div>
            <div className={s.right}></div>
            <div className={s.divSticky}>
                <div className={s.divDateAndOrder}>
                    <CalendarE/>
                    <OrderingsE/>
                </div>
            </div>
            <div className={s.container}>
                <h1 className={s.h1}>LAS LET EN PRIMERA PERSONA</h1>
            </div>
            <div className={s.containerCards}>
                { 
                allExperiences==='nothing'?<ExperiencesNotFound/>:
                allExperiences?.length ? allExperiences?.filter(e => e.status === 'active').map((e) =>{
                        return (
                            <CardExperience
                                key = {e.idExperience}
                                idExperience={e.idExperience}
                                firstName= {e.firstName}
                                imgExperience={e.imgExperience}
                                textExperience={e.textExperience}
                                startDate={reverseDate(e.booking.startDate)}
                                endDate={reverseDate(e.booking.endDate)}
                                bikes={e.booking.bikes}
                                socket={socket}
                                email={e.email}
                                numberOfLikes={e.numberOfLikes}
                            />
                        )
                }) : <Loading/> 
                }
            </div>
        </>
    )
};

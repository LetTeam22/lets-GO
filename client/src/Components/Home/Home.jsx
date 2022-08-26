import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getBikes } from '../../Redux/actions/'
// import s from './Home.module.css';





export const Home = () => {

    const dispatch = useDispatch();
    const bikes =  useSelector(state => state.bikes);

    if(!bikes.length) {
        dispatch(getBikes());
    }



    return (
        <>
            <div>Componente Home</div>
        </>

    )
};
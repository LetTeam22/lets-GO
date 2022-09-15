import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccesories } from '../../Redux/actions';
import s from './AllAccessories.module.css';
import EachAccesory from './EachAccesory';
import Loading from '../Loading/Loading';
import { Link } from "react-router-dom";

// import aux_axesorios from '../../image/aux_/aux_axesorios.png';

export const AllAccesories = () => {
    const dispatch = useDispatch();
    const allAccs = useSelector(state => state.accesories)
console.log(allAccs)
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getAccesories())
    }, [dispatch])

    return (
        <>
            <div className={s.left} />
            <div className={s.right} />
            <div className={s.container}>
                <h1 className={s.h1}>TODO LO QUE NECESITAS PARA TU AVENTURA</h1>  
            </div>     
            { allAccs.length ? allAccs.filter(acc => acc.status === 'active').map((a) => {
                    return (
                        <EachAccesory
                            key={a.idAcc}
                            Name={a.name}
                            imgAcc={a.image}
                            Description={a.description}
                            Price={a.price}
                        />
                    )
            }) : <Loading /> }
        <div className={s.containerBtn}>
            <Link to= '/home'><button className={s.btn}>BUSCAR BICI</button></Link>
        </div>
        </>
    )
};

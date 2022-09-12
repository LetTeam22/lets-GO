import React, { useEffect } from 'react'
import s from './Adventure.module.css';
import adventures from './data';
import CardAdventures from './CardAdventures';
// import aux_aventuras from '../../image/aux_/aux_aventuras.png';

export const Adventure = () => {

console.log(adventures)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        // <img src="https://res.cloudinary.com/pflet/image/upload/v1662686120/Let/image/aux_/aux_aventuras_ir3wap.png" alt='aux_aventuras' className={s.img_aux} />
        <div>

            <div className={s.container}>
                <h1 className={s.h1}>Exclusivo para leters aventureros</h1>
            </div>

            {
                adventures.map(a => <CardAdventures
                    name={a.name}
                    date={a.date}
                    image={a.image}
                    description={a.description}
                    conditions={a.conditions}
                    price={a.price}
                    difficulty={a.difficulty}
                    />)
                }
                
        </div>
    )
};
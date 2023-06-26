import React from 'react';
import { ChartSentiment } from './ChartSentiment';
import s from './Metricas.module.css';



export default function Metricas () {

    return(
        <div className={s.container}>
            <ChartSentiment/>
        </div>
    )
};

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import s from "./ChartExpSentiment.module.css";
import { getDataChartSentimentExp } from "../../../Redux/actions";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis} from 'recharts'

export const ChartSentiment = () => {
  const data = useSelector(state => state.dataChartSentimentExp);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getDataChartSentimentExp())
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(data)
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <h4 style={{color:'#ffffff'}}>Análisis de sentimientos (Experiencia y Contactos)</h4>
      <ResponsiveContainer width={700} aspect={2}>
        <BarChart data={data} width={200} height={200} margin={{top:5,left:10,right:30,bottom:5}}> 
          <CartesianGrid strokeDasharray={"4 1"}/>
          <XAxis dataKey={"Sentimiento"}/>
          <YAxis/>
          <Legend/>
          <Bar dataKey={"positivo"} fill="#000000"/>
          <Bar dataKey={"negativo"} fill="#f9b621"/>
          <Bar dataKey={"neutro"} fill="#787877"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
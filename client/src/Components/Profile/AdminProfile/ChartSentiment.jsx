import React from "react";
import { getDataChartSentimentExp } from "../../../Redux/actions";
import { CardChartSentiment } from "./CardChartSentiment";
import s from './ChartSentiment.module.css';
import { useGetElements } from "./usehooks";

export const ChartSentiment = () => {
  const data = useGetElements({ getElements: getDataChartSentimentExp, elements: 'dataChartSentimentExp' })
  const totalSentiments = data?.reduce(
    (curr, {...acc}) => {
      if (curr.type === "sentiment") {
        acc.Positivo += curr.Positivo;
        acc.Negativo += curr.Negativo;
        acc.Neutro += curr.Neutro;
        delete acc.name
      }
      return acc;
    },
    { Positivo: 0, Negativo: 0, Neutro: 0 }
  );
  const sentiments = data?.filter(chart => chart.type === 'sentiment')
  const bars = [
    {value:'Positivo', color:'#377539'}, 
    {value:'Negativo', color:'#753737'},
    {value:'Neutro', color:'#1c1a1a'}
  ]
  return (
    <div className={s.container}>
      <CardChartSentiment title={"Totales"} data={[totalSentiments]} bars={bars}/>
      <CardChartSentiment title={'Comparativo'} data={sentiments} bars={bars} />
    </div>
  );
};

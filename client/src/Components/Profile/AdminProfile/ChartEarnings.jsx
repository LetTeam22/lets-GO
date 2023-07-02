import React from 'react';
import { getDataChartEarnings } from '../../../Redux/actions';
import { useGetElements } from './usehooks';
import s from './ChartEarnings.module.css';
import { CardLineChart } from './CardLineChart';

export const ChartEarnings = () => {
  const data = useGetElements({
    getElements: getDataChartEarnings,
    elements: 'dataChartEarnings',
  });
  const perMonth = data[1]?.earnings;
  return (
    <div className={s.mainContainerData}>
      <CardLineChart 
        data={perMonth} 
        filterElement={'earnings'} 
        title={`Ganancias en el ${data[0]?.year}`}
      />
      <div>
        <span>Acumulado: ${data[0]?.earnings}.-</span>
      </div>
    </div>
  );
};
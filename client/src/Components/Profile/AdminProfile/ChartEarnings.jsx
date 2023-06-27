import React from 'react';
import { getDataChartEarnings } from '../../../Redux/actions';
import { useGetElements } from './usehooks';
import s from './ChartEarnings.module.css';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export const ChartEarnings = () => {
  const data = useGetElements({
    getElements: getDataChartEarnings,
    elements: 'dataChartEarnings',
  });
  const perMonth = data[1]?.earnings;
  console.log(perMonth);

  return (
    <div className={s.mainContainerData}>
      <div className={s.containerGraph}>
        <h4 className={s.title}>Ganancias en el {data[0]?.year}</h4>
        <LineChart
          width={600}
          height={300}
          data={perMonth}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type='monotone' dataKey='earnings' stroke='#8884d8' />
          <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
      <div className={s.containerData}>
        <span>Acumulado: ${data[0]?.earnings}.-</span>
      </div>
    </div>
  );
};
import React from "react";
import s from './CardBarChart.module.css';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export const CardBarChart = ({ title, data, bars }) => {
  const size = bars.length > 4 ? 400 : 200
  return (
    <div className={s.cardContainer}>
      <h4 className={s.title}>{title}</h4>
      <ResponsiveContainer width={500} height={300}>
        <BarChart
          data={data}
          width={size}
          height={size}
          margin={{ top: 5, left: 0, right: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray={"4 1"} />
          <XAxis dataKey={"name" || 'sentiment'} />
          <YAxis />
          <Legend />
          {bars?.map(bar => {
            return (
              <Bar 
                dataKey={bar.value} 
                fill={bar.color} 
                key={bar.value}
              />
            )
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

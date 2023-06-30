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
  return (
    <div className={s.cardContainer}>
      <h4 className={s.title}>{title}</h4>
      <ResponsiveContainer width={500} aspect={2}>
        <BarChart
          data={data}
          width={200}
          height={200}
          margin={{ top: 5, left: 10, right: 30, bottom: 5 }}
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

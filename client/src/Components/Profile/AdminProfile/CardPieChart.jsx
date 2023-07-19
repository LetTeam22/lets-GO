import React, { useState } from "react";
import { PieChart, Pie, Cell, LabelList } from "recharts";
import s from "./CardPieChart.module.css";
import { CardPieShape } from "./CardPieShape";

export const CardPieChart = ({ data, COLORS, title }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    
    const onPieEnter = (_, index) => {
        setActiveIndex(index)
      };

  return (
    <section className={s.containerCard}>
      <div className={s.title}>{title}</div>
      <PieChart width={730} height={500}>
        <Pie
          data={data}
          activeIndex={activeIndex}
          activeShape={CardPieShape}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          onMouseEnter={onPieEnter}
        >
          <LabelList dataKey="name" position="inside" stroke="black" />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </section>
  );
};

import React from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import { COLORS } from "./ChartBikes";
import { elements } from "./ChartBookings";
import s from "./ChartEarnings.module.css";



export const CardLineChart = ({data, filterElement, title}) => {
    return (
        <div className={s.containerGraph}>
        <h4 className={s.title}>{title}</h4>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 35, bottom: 5, left: 5 }}
        >
            {filterElement === 'all'? 
              elements.map((element, index) => {
                return (
                    <Line
                    key={index}
                    type="monotone"
                    dataKey={element}
                    stroke={COLORS[index]}
                    strokeWidth={2}
                  />
                )
              })
              :
              <Line
              type="monotone"
              dataKey={filterElement}
              stroke={'#F9B621'}
              strokeWidth={2}
            />
            }
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    )
}
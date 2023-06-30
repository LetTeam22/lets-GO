import React, { useState } from "react";
import { CardPieChart } from "./CardPieChart";
import s from "./ChartBikes.module.css";
import { getBikes } from "../../../Redux/actions";
import { useGetElements } from "./usehooks";
import { ChartBikesSelect } from "./ChartBikesSelect";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", '#5F9EA0', '#9370D8', '#008080', '#708090'];
const properties = [
  {
    value:'type',
    name:'Tipo'
  },
  { 
    value:'color',
    name:'Color',
  },
  { 
    value:'traction',
    name:'Tracción'
  },
  {
    value:'wheelSize',
    name: 'Rodado'
  }
]

export const ChartBikes = () => {
  const [property, setProperty] = useState({
    value: 'type',
    name:'Tipo'
  })
  const bikes = useGetElements({ getElements:getBikes, elements:'allBikes'})
  const objBikes = {}

  bikes?.forEach(bike => {
    if(!objBikes[bike[property.value]]) objBikes[bike[property.value]] = 1
    else objBikes[bike[property.value]] ++
    return {
      character: bike[property.value]
    }
  })
  const arrayFilteredBikes = Object.entries(objBikes).map(([name, value]) => {
    return {
      name,
      value
    }
  })

  return (
    <div className={s.container}>
      <CardPieChart data={arrayFilteredBikes} COLORS={COLORS} title={`Bicicletas por ${property.name}`}/>
      <aside className={s.aside}>
        <h2>Selecciona propiedad</h2>
        <ChartBikesSelect value={property} setValue={setProperty} properties={properties}/>
        <h3>{`Total: ${bikes.length} bicicletas`}</h3>
      </aside>
    </div>
  );
};

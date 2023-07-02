import React, { useState } from "react";
import { CardPieChart } from "./CardPieChart";
import s from "./ChartBikes.module.css";
import { getBikes } from "../../../Redux/actions";
import { useGetElements } from "./usehooks";
import { ChartBikesSelect } from "./ChartBikesSelect";
import { CardBarChart } from "./CardBarChart";

export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", '#5F9EA0', '#9370D8', '#008080', '#708090'];
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
const modality = [
  {
    value:'stock',
    name:'Stock'
  },
  {
    value:'rating',
    name:'rating'
  }
]

export const ChartBikes = () => {
  const [property, setProperty] = useState({
    value: 'type',
    name:'Tipo'
  })
  const [mode, setMode] = useState({
    value: 'stock',
    name:'Stock'
  })

  const bikes = useGetElements({ getElements:getBikes, elements:'allBikes'})

  const getFilteredBikes = (bikes, property) => {
    const objBikes = {}
    
    bikes?.forEach(bike => {
      const nameProperty = bike[property.value]
      if(!objBikes[nameProperty]) objBikes[nameProperty] = 1
      else objBikes[nameProperty] ++
    })

    return Object.entries(objBikes).map(([name, value]) => {
      return {
        name,
        value
      }
    })
  }
  const filteredBikes = getFilteredBikes(bikes, property)

  const getRatedBikes = (bikes) => {
    const rating = {}
    
    bikes?.forEach(bike => {
      const nameProperty = bike[property.value]
      if(!rating[nameProperty]) rating[nameProperty] = [bike.rating]
      else rating[nameProperty].push(bike.rating)
    })
    
    return Object.entries(rating).map(([name, value]) => {
      const overageRating = value.reduce((acc, curr) => acc + curr, 0) / value.length
      return {
        [name]: Number(overageRating.toFixed(1))
      }
    })
  }
  const ratedBikes = getRatedBikes(bikes)
  const bars = ratedBikes?.map((bike, index) => {
    const [value] = Object.entries(bike)[0]
    return {
      value,
      color: COLORS[index]
    }
  })
  console.log({bars})

  return (
    <div className={s.container}>
      {mode.value === 'stock' ?
      <CardPieChart data={filteredBikes} COLORS={COLORS} title={`Bicicletas por ${property.name}`}/>
      :
      <CardBarChart title={`Bicicletas por ${property.name}`} data={ratedBikes} bars={bars} />
    }
      <aside className={s.aside}>
        <section className={s.besideSection}>
          <h3>Selecciona propiedad</h3>
          <ChartBikesSelect value={property} setValue={setProperty} properties={properties} title={'Propiedad'}/>
        </section>
        <section className={s.besideSection}>
          <h3>Selecciona modalidad</h3>
          <ChartBikesSelect value={mode} setValue={setMode} properties={modality} title={'Modalidad'}/>
        </section>
        <h4 className={s.total}>{`Total: ${bikes.length} bicicletas`}</h4>
      </aside>
    </div>
  );
};

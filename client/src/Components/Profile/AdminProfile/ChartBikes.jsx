import React, { useState } from "react";
import { CardPieChart } from "./CardPieChart";
import s from "./ChartBikes.module.css";
import { getBikes } from "../../../Redux/actions";
import { useGetElements } from "./usehooks";
import { ChartBikesSelect } from "./ChartBikesSelect";
import { CardBarChart } from "./CardBarChart";

export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", '#5F9EA0', '#9370D8', '#008080', '#708090'];
export const properties = [
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
    name:'Rating'
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

  const handleChangeProperty = (e) => {
      const prop = properties.find(p => p.value === e.target.value)
      setProperty({...property, name: prop.name, value:e.target.value})
  }

  const handleChangeMode = (e) => {
    const prop = modality.find(p => p.value === e.target.value)
    setMode({...mode, name: prop.name, value:e.target.value})
}

  return (
    <div className={s.container}>
      {mode.value === 'stock' ?
      <CardPieChart data={filteredBikes} title={`Bicicletas por ${property.name}`}  COLORS={COLORS}/>
      :
      <CardBarChart data={ratedBikes} title={`Bicicletas por ${property.name}`} bars={bars} />
    }
      <aside className={s.aside}>
          <ChartBikesSelect value={property.value} handleChange={handleChangeProperty} properties={properties} title={'Propiedad'}/>
          <ChartBikesSelect value={mode.value} handleChange={handleChangeMode} properties={modality} title={'Modalidad'}/>
        <h4 className={s.total}>{`Total: ${bikes.length} bicicletas`}</h4>
      </aside>
    </div>
  );
};

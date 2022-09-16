import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterExperiencesByDate, setSortFilterExperience } from "../../../Redux/actions";
import s from "./OrderingsE.module.css";

const OrderingsE = () => {

  const filterExperience = useSelector((state) => state.filterExperience);
  const dispatch = useDispatch()

  const handleNameSort = (e) => {
    dispatch(
        setSortFilterExperience({
          sort:e.target.value,
        })
    );
    dispatch(filterExperiencesByDate({...filterExperience, sort:e.target.value}))
  };

  return (
    <section className={s.container}>
      <span className={s.spanOrderings}>Ordenar por nombre:</span>
      <select
        value="name"
        onChange={handleNameSort}
        className={
          filterExperience.sort === 'nameASC' ||
          filterExperience.sort === 'nameDESC'? 
          `${s.orderings} ${s.act}` : s.orderings
        }
        id="nameSort"
      >
        <option value=""></option>
        <option value="nameASC">A-Z</option>
        <option value="nameDESC">Z-A</option>
      </select>
    </section>
  );
};

export default OrderingsE;

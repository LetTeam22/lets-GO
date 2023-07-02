import React from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
  } from "@mui/material";
import s from "./ChartBikes.module.css";

export const ChartBikesSelect = ({value, handleChange, properties, title}) => {
  return (
    <section className={s.besideSection}>
    <h3>Selecciona {title}</h3>
    <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
      <InputLabel id={title}>{title}</InputLabel>
      <Select
        labelId={title}
        id={title}
        value={value}
        label={title}
        onChange={handleChange}
      >
        {properties.map(property => <MenuItem value={property.value} key={property.value}>{property.name}</MenuItem>)}
      </Select>
    </FormControl>
    </section>
  );
};

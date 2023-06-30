import React from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem
  } from "@mui/material";
import theme from "../MaterialUIColors";
import { ThemeProvider } from "@emotion/react";

export const ChartBikesSelect = ({value, setValue, properties, title}) => {
  return (
    <ThemeProvider theme={theme}>
    <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
      <InputLabel id={title}>{title}</InputLabel>
      <Select
        labelId={title}
        id={title}
        value={value.value}
        label={title}
        onChange={(e) => {
            const prop = properties.find(p => p.value === e.target.value)
            setValue({...value, name: prop.name, value:e.target.value})}
        }
      >
        {properties.map(property => <MenuItem value={property.value}>{property.name}</MenuItem>)}
      </Select>
    </FormControl>
    </ThemeProvider>
  );
};

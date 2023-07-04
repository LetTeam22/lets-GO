import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";

export const RadioSection = ({ value, handleChange, show }) => {
  return (
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="label"
          name="element"
          value={value}
          onChange={handleChange}
        >
          {show && <FormControlLabel
            value="all"
            control={<Radio />}
            label="Todos"
            labelPlacement="bottom"
          />}
          <FormControlLabel
            value="bikes"
            control={<Radio />}
            label="Bicicletas"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="adventures"
            control={<Radio />}
            label="Aventuras"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="accessories"
            control={<Radio />}
            label="Accesorios"
            labelPlacement="bottom"
          />
        </RadioGroup>
      </FormControl>
  );
};

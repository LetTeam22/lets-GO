import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  // FormLabel,
} from "@mui/material";
import theme from "../MaterialUIColors";
import { ThemeProvider } from "@emotion/react";

export const RadioSection = ({ value, handleChange }) => {
  return (
    <ThemeProvider theme={theme}>
      <FormControl>
        {/* <FormLabel id="label">Elije lo que quieres evaluar</FormLabel> */}
        <RadioGroup
          row
          aria-labelledby="label"
          name="elements"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="all"
            control={<Radio />}
            label="Todos"
            labelPlacement="bottom"
          />
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
            value="accesories"
            control={<Radio />}
            label="Accesorios"
            labelPlacement="bottom"
          />
        </RadioGroup>
      </FormControl>
    </ThemeProvider>
  );
};

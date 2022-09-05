import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ffce65",
      main: "#F9B621",
      dark: "#d39307",
      contrastText: "#333333",
    },
    secondary: {
      light: "#494949",
      main: "#333333",
      dark: "#191616",
      contrastText: "#F9B621",
    },
  },
});

export default theme;

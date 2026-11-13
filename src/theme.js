import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#11f6e3",
      light: "#636ff5",
      dark: "#e75959",
      contrastText: "#fff",
    },
    success: {
      main: "#ff00dd",
    },
    error: {
      main: "#ddff44",
    },
    info: {
      main: "#24f1e0",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

export default theme;
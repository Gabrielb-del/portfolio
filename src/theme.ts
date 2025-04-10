import { createTheme, responsiveFontSizes } from "@mui/material";
let theme = createTheme({
    palette: {
      primary: {
        main: 	"#363636",
      },
      secondary: {
        main: "#6A5ACD",
      },
    },
    typography: {
        fontFamily: "monospace"
    },

  });

theme = responsiveFontSizes(theme);

export default theme
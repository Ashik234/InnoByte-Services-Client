import { createTheme } from "@mui/material/styles";

export const muiCustomTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: ".5px",
            borderRadius: "7px",
           
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1B85E7",
            outline: "none",
          },
          input: {
            padding: "10px",
            outline: "none",
            
          },
        },
      },
    },
  },
  
});

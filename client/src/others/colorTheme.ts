import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // light: '#ff9d3f',
      main: '#EC8034',
      // dark: '#b53d00',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff9d3f',
      main: '#ef6c00',
      dark: '#b53d00',
      contrastText: '#000',
    },
  },
});

export default theme;

import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import './global.css'
import Routes from './routes';

const theme = createMuiTheme({
  palette: {
    primary: {
     main: '#283593'
    }
  },
  spacing: 4
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  )
}

export default App;

import React, { useEffect } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import './global.css'
import Routes from './routes';
import ErrorBoundary from './Pages/ErrorBoundary';
import Context from './context';
import ModalStickyOffline from './Component/ModalStickyOffline';
import { useIsOnline } from 'react-use-is-online';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#283593'
    }
  },
  spacing: 4
});

function App() {
  const { isOffline } = useIsOnline();
  console.log('isOffline')
  console.log(isOffline)

  return (
    <ErrorBoundary>
      {isOffline ?
        (<ModalStickyOffline />) : null
      }
      <ThemeProvider theme={theme}>
        <Context>
          <Routes />
        </Context>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App;
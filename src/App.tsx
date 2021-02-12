import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { useGeolocation } from 'react-use';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import NowWhat from './components/NowWhat';

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});


const App = () => {
  const state = useGeolocation();

  return (
    <div>
      {JSON.stringify(state, null, 2)}
    </div>
  );
}

export default App;
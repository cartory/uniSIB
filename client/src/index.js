import React from 'react';
import ReactDOM from 'react-dom';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline'

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ScopedCssBaseline>
      <App />
    </ScopedCssBaseline>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

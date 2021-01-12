import React from 'react';
import ReactDOM from 'react-dom';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline'

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ScopedCssBaseline>
    <App />
  </ScopedCssBaseline>,
  document.getElementById('root')
);

reportWebVitals();

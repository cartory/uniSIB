import React from 'react';
import ReactDOM from 'react-dom';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline'

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ScopedCssBaseline>
      <App />
    </ScopedCssBaseline>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

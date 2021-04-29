import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppLanguageProvider } from './cotexts/AppLanguageProvider';

ReactDOM.render(
  <BrowserRouter>
    <AppLanguageProvider>
      <App />
    </AppLanguageProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

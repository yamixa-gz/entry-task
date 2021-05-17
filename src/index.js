import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppLanguageProvider } from './cotexts/AppLanguageProvider';
import './i18n';
import store from './store/store';

ReactDOM.render(
  <BrowserRouter>
    <AppLanguageProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AppLanguageProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

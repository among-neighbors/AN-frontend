import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { GlobalStyle } from './others/cssLibrary';
import { store } from './others/store';
import Router from './Router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <GlobalStyle />
    <Router />
  </Provider>,
);

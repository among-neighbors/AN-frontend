import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserHeader from './components/organisms/Header';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserHeader />
    <App />
  </React.StrictMode>,
);

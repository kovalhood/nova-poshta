import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import 'modern-normalize/modern-normalize.css'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
    {/* <BrowserRouter basename="/nova-poshta/"> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
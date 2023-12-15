import React from 'react';
import{BrowserRouter} from "react-router-dom"
import ReactDOM from 'react-dom/client';
import App from './App';

import store from './reducer/store';
import { Provider } from 'react-redux';

import './assets/scss/style.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);


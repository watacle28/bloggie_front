import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './normalize.css'
import './bootstrap.min.css'
import './index.css';


//redux staff
import {Provider} from 'react-redux'
import store from './redux/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
       <App />
    </Provider>
   
  </React.StrictMode>,
  document.getElementById('root')
);


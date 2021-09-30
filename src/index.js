import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Viestit from './Viestit'
import DigitalWatch from './DigitalWatch'
import AnalogWatch from './AnalogWatch'
import reportWebVitals from './reportWebVitals'
import TypicodeFetch from './TypicodeFetch'
import NWCustomerFetch from './NWCustomerFetch'
import MD5demo from './MD5demo'
import NWUserFetch from './NWUserFetch'

ReactDOM.render(
  <React.StrictMode>

    <NWUserFetch />
    <MD5demo />
    <NWCustomerFetch />
    <TypicodeFetch />
    <App />
    <AnalogWatch />
    <Viestit />
    <DigitalWatch />

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

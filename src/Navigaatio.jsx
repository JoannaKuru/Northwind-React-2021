import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import AnalogWatch from './AnalogWatch'
import NWCustomerFetch from './NWCustomerFetch'
// import NWProductsFetch from './NWProductsFetch'
import NWUserFetch from './NWUserFetch'
// import Login from './Login';
import App from './App'
import Viestit from './Viestit'
import DigitalWatch from './DigitalWatch'
import TypicodeFetch from './TypicodeFetch'
import MD5demo from './MD5demo'

class Navigaatio extends Component {
    render() {
      return (
        <Router>
          <div>
            <h2 style={{ marginLeft: '2%' }}>Northwind React Application </h2>
  
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
              <ul className='navbar-nav mr-auto'>
                <li style={{ marginLeft: '10%' }}><Link to={'/'} className='nav-link'> Etusivu </Link></li>
                <li><Link to={'/NWCustomerFetch'} className='nav-link'>Asiakashallinta</Link></li>
                <li><Link to={'/NWProductsFetch'} className='nav-link'>Tuotehallinta</Link></li>
                <li><Link to={'/NWUserFetch'} className='nav-link'>Käyttäjähallinta</Link></li>
                <li><Link to={'/App'} className='nav-link'>App</Link></li>
                <li><Link to={'/Viestit'} className='nav-link'>Viestit</Link></li>
                <li><Link to={'/DigitalWatch'} className='nav-link'>Digital</Link></li>
                <li><Link to={'/TypicodeFetch'} className='nav-link'>Typicode</Link></li>
                <li><Link to={'/MD5demo'} className='nav-link'>MD5</Link></li>
              </ul>
            </nav>
            <hr />
            <Switch>
              <Route exact path='/' component={AnalogWatch} />
              <Route path='/NWCustomerFetch' component={NWCustomerFetch} />
              <Route path='/NWProductsFetch' component={NWCustomerFetch} />
              <Route path='/NWUserFetch' component={NWUserFetch} />
              <Route path='/App' component={App} />
              <Route path='/Viestit' component={Viestit} />
              <Route path='/DigitalWatch' component={DigitalWatch} />
              <Route path='/TypicodeFetch' component={TypicodeFetch} />
              <Route path='/MD5demo' component={MD5demo} />
            </Switch>
          </div>
        </Router>
      )
    }
  }
  export default Navigaatio



//   <NWUserFetch />
//   <MD5demo />
//   <NWCustomerFetch />
//   <TypicodeFetch />
//   <App />
//   <AnalogWatch />
//   <Viestit />
//   <DigitalWatch />
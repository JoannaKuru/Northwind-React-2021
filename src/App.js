import logo from './logo.svg';
import './App.css';
import Viestit from './Viestit'
// import { Component } from 'react'; automaagisesti syntynyt
import React, { Component } from 'react';

// Jätän alkuperäisen tähän malliksi, lisäsin X:t vain et eroaa allaolevasta kopiosta
// function AppX() {
//   return (
//     <div className="AppX">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// Tunnilla tehty komponentti: Luokka on "kuollut" se tarvii life cycle metodin eli esim. renderöinnin
class App extends Component {

  // tekee alertin
  componentDidMount () {
    alert("Hei")
  }
 
  //jsx, jonka sisällä javascriptiä aaltosuluissa 2+4
  render () {
    return (
      <div className="App">

        <Viestit />

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Tämä on minun ensimmäinen React-sovellus!
          </p>
          <p>
            Laskutoimituksen tulos on {2 + 4} 
          </p>
        </header>
      </div>
    )
  }
}

export default App

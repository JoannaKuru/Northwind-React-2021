import React, { Component } from 'react';
import './App.css';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css' // Tämä tarvitaan nykyään!
import Helpit from './Helpit'

class AnalogWatch extends Component { //tila-objekti
    constructor(props) {
        super(props);
        console.log("AnalogWatch: constructor-metodissa");
        this.state = {
            pvm: new Date(),
            näytäHelppi: false //ominaisuus
        };
    }

    näytäHelppiPainettu = (event) => {
        if (this.state.näytäHelppi === false) {
            this.setState({
                näytäHelppi: true
            })
        }
        else {
            this.setState({
                näytäHelppi: false
            })
        }
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            5000
        );
        console.log("AnalogWatch: componentDidMount-metodissa");
    }
    tick() {
        console.log("AnalogWatch: tickissä");
        this.setState({
            pvm: new Date()
        });
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
        console.log("AnalogWatch: componentWillUnmount-metodissa");
    }
    render() { //javascriptiä jsx koodin sisällä
        console.log("AnalogWatch: tultiin render-metodiin");
        return (
            <div className="Kello">
                <Clock value={this.state.pvm} size={100} hourMarksLength={20} />
                <br />
                {this.state.näytäHelppi === false && <button onClick={this.näytäHelppiPainettu}>Näytä helppi</button>}
                {this.state.näytäHelppi === true && <button onClick={this.näytäHelppiPainettu}>Piilota helppi</button>}
                
                {this.state.näytäHelppi === true && <Helpit moduli={"kello"} />}
            </div>
        );
    }
}

export default AnalogWatch;
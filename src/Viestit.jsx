import './App.css';
import React, { Component } from 'react';
import DigitalWatch from './DigitalWatch'
import Helpit from './Helpit'

class Viesti extends Component {
    
    render () {
        return (
        <p>
            Tässä on oma vakioviesti.
            <DigitalWatch />
        </p>
        )
    }
}

class ViestiPrp extends Component {
    render () {
        return (
            <>
                <p>Autoni on {this.props.auto}</p>
                <p>Lempikukkani on {this.props.kukka}</p>
                <button onClick={this.props.info}>Paina tästä</button>
            </>
        )
    }
}

class Viestit extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    render () {
        let automerkki = "Ford"

        function info() {
            alert("React on kivaa!")
        }

        function info2() {
            alert("React on todella kivaa!")
        }

        return (
            <div className="App">
                <h3>Viestit-sovellusikkuna</h3>
                <p>Tähän tulee viestejä</p>
                <Viesti />
                <ViestiPrp info={info} kukka={"Ruusu"} auto={automerkki}/>
                <ViestiPrp info={info2} kukka={"Pelargonia"} auto={"BMW"}/>

                {this.state.näytäHelppi === false && <button onClick={this.näytäHelppiPainettu}>Näytä helppi</button>}
                {this.state.näytäHelppi === true && <button onClick={this.näytäHelppiPainettu}>Piilota helppi</button>}
                
                {this.state.näytäHelppi === true && <Helpit moduli={"viestit"} />}
            </div>
        )
    }
}

export default Viestit
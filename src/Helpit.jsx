import React, { Component} from "react"
import './App.css'

class Helpit extends Component {
    render() {
        if (this.props.moduli === "viestit") {
            return(
                <div className="helppi">
                    <h4>Helppi</h4>
                    <p>Viestit -toiminto välittää käyttäjälle viestejä.</p>
                </div>
            )
        }
        if (this.props.moduli === "kello") {
            return(
                <div className="helppi">
                    <h4>Helppi</h4>
                    <p>Kello näyttää käyttäjälle ajan.</p>
                </div>
            )
        }
    }
}

export default Helpit

//AnalogWatch state

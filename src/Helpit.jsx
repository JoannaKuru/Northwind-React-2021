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
        if (this.props.moduli === "user") {
            return(
                <div className="helppi">
                    <h4>Helppi</h4>
                    <p>Toiminto listaa käyttäjät tai voit lisätä käyttäjän.</p>
                </div>
            )
        }
        if (this.props.moduli === "customer") {
            return(
                <div className="helppi">
                    <h4>Helppi</h4>
                    <p>Toiminto listaa asiakkaat tai voit lisätä asiakkaan.</p>
                </div>
            )
        }
    }
}

export default Helpit

//AnalogWatch state

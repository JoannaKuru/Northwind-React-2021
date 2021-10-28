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

        if (this.props.moduli === "product") {
            return(
                <div className="helppi">
                    <h4>Helppi</h4>
                    <p>You may view 10 products at a time.</p>
                </div>
            )
        }
        if (this.props.moduli === "productAdd") {
            return(
                <div className="helppi">
                    <h4>Helppi</h4>
                    <p>You may add a new product.</p>
                </div>
            )
        }
        if (this.props.moduli === "productEdit") {
            return(
                <div className="helppi">
                    <h4>Helppi</h4>
                    <p>You may edit the product.</p>
                </div>
            )
        }
        if (this.props.moduli === "productDelete") {
            return(
                <div className="helppi">
                    <h4>Helppi</h4>
                    <p>You may delete the product.</p>
                </div>
            )
        }

        if (this.props.moduli === "user") {
            return(
                <div className="helppi">
                    <h4>Helppi</h4>
                    <p>Toiminto listaa käyttäjiä kymmenen kerrallaan.</p>
                </div>
            )
        }
        if (this.props.moduli === "userAdd") {
            return(
                <div className="helppi">
                    <h4>Helppi</h4>
                    <p>Voit lisätä käyttäjän.</p>
                </div>
            )
        }
        if (this.props.moduli === "userEdit") {
            return(
                <div className="helppi">
                    <h4>Helppi</h4>
                    <p>Voit muokata käyttäjän tietoja.</p>
                </div>
            )
        }
        if (this.props.moduli === "userDelete") {
            return(
                <div className="helppi">
                    <h4>Helppi</h4>
                    <p>Voit poistaa käyttäjän.</p>
                </div>
            )
        }

        if (this.props.moduli === "customer") {
            return(
                <div className="helppi">
                    <h4>Helppi</h4>
                    <p>Toiminto listaa asiakkaita kymmenen kerrallaan.</p>
                </div>
            )
        }
        if (this.props.moduli === "customerAdd") {
            return(
                <div className="helppi">
                    <h4>Helppi</h4>
                    <p>Voit lisätä asiakkaan.</p>
                </div>
            )
        }
        if (this.props.moduli === "customerEdit") {
            return(
                <div className="helppi">
                    <h4>Helppi</h4>
                    <p>Voit muokata asiakkaan tietoja.</p>
                </div>
            )
        }
        if (this.props.moduli === "customerDelete") {
            return(
                <div className="helppi">
                    <h4>Helppi</h4>
                    <p>Voit poistaa asiakkaan.</p>
                </div>
            )
        }
    }
}

export default Helpit

//AnalogWatch state
// if (this.props.moduli === "viestit") {
//     return (<div className="helppi">
//         <h4>Helppi</h4>
//         <p>Viestit toiminto välittää käyttäjälle viestejä.</p>
//     </div>
//     )
// }
// if (this.props.moduli === "kello") {
//     return (<div className="helppi">
//         <h4>Helppi</h4>
//         <p>Kello näyttää käyttäjälle ajan.</p>
//     </div>
//     )
// }

// if (this.props.moduli === "customerFetch") {
//     return (<div className="helppi">
//         <h4>Helppi</h4>
//         <p>Tällä toiminnolla voidaan selata asiakkaita 10 kerrallaan.</p>
//     </div>
//     )
// }

// if (this.props.moduli === "customerAdd") {
//     return (<div className="helppi">
//         <h4>Helppi</h4>
//         <p>Tällä toiminnolla voidaan lisätä uusi asiakas.</p>
//         <p>Huomaa, että ID on annettava, ja sen tulee olla 5 isoa kirjainta.</p>
//     </div>
//     )
// }

// if (this.props.moduli === "customerDelete") {
//     return (<div className="helppi">
//         <h4>Helppi</h4>
//         <p>Tällä toiminnolla voidaan poistaa asiakas.</p>
//         <p>Huomaa, että asiakkaita, joilla on tilauksia ei voi poistaa.</p>
//     </div>
//     )
// }

// if (this.props.moduli === "customerEdit") {
//     return (<div className="helppi">
//         <h4>Helppi</h4>
//         <p>Tällä toiminnolla voidaan muokata asiakkaan tietoja.</p>
//         <p>ID tietoa ei kuitenkaan voi muokata.</p>
//     </div>
//     )
// }

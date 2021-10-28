import React, { Component } from 'react'
import './App.css'
import MD5 from 'md5'

class NWUserAdd extends Component {

    constructor(props) {
        super(props)

        this.state = { LoginId: '', Firstname: '', Lastname: '', Email: '',
            Username: '', Password: '', PasswordAgain: '', AccesslevelId: '', Tarkistus: ''

        }
        this.handleChangeLoginId = this.handleChangeLoginId.bind(this);
        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangeLastname = this.handleChangeLastname.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangePasswordAgain = this.handleChangePasswordAgain.bind(this);
        this.handleChangeAccesslevelId = this.handleChangeAccesslevelId.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Input kenttien onChange tapahtumankäsittelijät
    handleChangeLoginId(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, LoginId: syöte.toUpperCase() });
    }
    handleChangeFirstname(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Firstname: syöte });
    }
    handleChangeLastname(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Lastname: syöte });
    }
    handleChangeEmail(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Email: syöte });
    }
    handleChangeUsername(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Username: syöte });
    }
    handleChangePassword(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Password: syöte });
    }
    handleChangePasswordAgain(event) {
        var syöte = event.target.value;
        if (syöte !== this.state.Password) {
            this.setState( {...this.state, Tarkistus: 'Salasanat eivät täsmää.' });
        }
        else {
            this.setState( {...this.state, Tarkistus: 'Salasanat täsmäävät.' });
        }
    }
    handleChangeAccesslevelId(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, AccesslevelId: syöte });
    }

    // Lomakkeen onSubmit tapahtumankäsittelijä
    handleSubmit(event) {
        if (this.state.Tarkistus === "Salasanat eivät täsmää.") {
            alert('Salasanat eivät täsmää.');
            event.preventDefault();
            return;
        }
        alert('Lähetettiin käyttäjä: ' + this.state.Username);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    InsertoiKantaan() {
        // Luodaan Javascript käyttäjäobjekti, johon haetaan state:sta tiedot                     
        const kayttaja = {
            // LoginId: this.state.LoginId,
            Firstname: this.state.Firstname,
            Lastname: this.state.Lastname,
            Email: this.state.Email,
            Username: this.state.Username,
            Password: MD5(this.state.Password),
            // AccesslevelId: this.state.AccesslevelId, (tämäkin toimii, outoa kyllä)
            AccesslevelId: parseInt(this.state.AccesslevelId),
        };

        // send an asynchronous request to the backend
        const kayttajaJson = JSON.stringify(kayttaja);
        console.log("kayttajaJson = " + kayttajaJson);

        // let apiUrl = 'https://localhost:5001/api/users/'
        let apiUrl = 'https://northwindrestapi2021azure.azurewebsites.net/api/users/'

        let jwtoken = localStorage.getItem('token')

        //request
        fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + jwtoken,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: kayttajaJson
        }).then((response) => response.json()) //palautus=vastaus=vain infoa, ei pakollinen -> muuttaa jsonin javascriptiksi
            .then((jsResponse) => {
                console.log(`Response from server: ${jsResponse}.`);
                if (jsResponse) {
                    console.log("Pyyntö käyttäjän tallettamiseksi tehty -- -- -- -- --");
                    this.props.unmountMe()
                }
            });
    }

    render() {
        return(
            <div>
            <form className="box13" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Etunimi" onChange={this.handleChangeFirstname} />
                <input type="text" placeholder="Sukunimi" onChange={this.handleChangeLastname} />
                <input type="text" placeholder="Email" onChange={this.handleChangeEmail} />
                <input type="text" placeholder="Käyttäjätunnus" onChange={this.handleChangeUsername} />
                <input type="password" placeholder="Salasana" onChange={this.handleChangePassword} />
                <input type="password" placeholder="Salasana uudelleen" onChange={this.handleChangePasswordAgain} />
                <input type="text" placeholder="Accesslevel" onChange={this.handleChangeAccesslevelId} />
                <p>{this.state.Tarkistus}</p>
                <br />
                <button type="submit">Tallenna uudet tiedot</button>
            </form>
        </div>
        )
    }
}

export default NWUserAdd
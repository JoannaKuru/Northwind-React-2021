import React, { Component } from 'react'
import './App.css'
import MD5 from 'md5'

class NWUserEdit extends Component {
    constructor(props) {
        super(props)
         this.state = { käyttäjäObj: {}, LoginID: '', Firstname: '', Lastname: '', Email: '',
          Username: '', Password: '', PasswordAgain: '', AccesslevelID: '', Tarkistus: '' }

        this.handleChangeLoginID = this.handleChangeLoginID.bind(this);
        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangeLastname = this.handleChangeLastname.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangePasswordAgain = this.handleChangePasswordAgain.bind(this);
        this.handleChangeAccesslevelID = this.handleChangeAccesslevelID.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Input kenttien onChange tapahtumankäsittelijät
    handleChangeLoginID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, LoginID: syöte.toUpperCase() });
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
    handleChangeAccesslevelID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, AccesslevelID: syöte });
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

    componentDidMount() {
        this.setState({
            LoginID: this.props.käyttäjäObj.loginId,
            Firstname: this.props.käyttäjäObj.firstname,
            Lastname: this.props.käyttäjäObj.lastname,
            Email: this.props.käyttäjäObj.email,
            Username: this.props.käyttäjäObj.username,
            // Password: MD5(this.props.käyttäjäObj.password),
            AccesslevelID: parseInt(this.props.käyttäjäObj.accesslevelId),
        } )
    }

    InsertoiKantaan() {
        // Luodaan asiakasobjekti, johon haetaan state:sta inputkentiltä tulleet tiedot                     
        const käyttäjä = {
            Firstname: this.state.Firstname,
            Lastname: this.state.Lastname,
            Email: this.state.Email,
            Username: this.state.Username,
            Password: MD5(this.state.Password),
            AccesslevelID: parseInt(this.state.AccesslevelId),
        }
       
        const käyttäjäJson = JSON.stringify(käyttäjä)
        console.log("asiakasJson = ", käyttäjäJson)

        // let apiUrl = 'https://localhost:5001/api/users/' + this.state.LoginID
        let apiUrl = 'https://northwindrestapi2021azure.azurewebsites.net/api/users/' + this.state.LoginID
        console.log(apiUrl)

        let jwtoken = localStorage.getItem('token')

        fetch(apiUrl, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + jwtoken,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: käyttäjäJson
        }).then((res) => res.json()) // Vastaus muutetaan javascriptiksi jsonista
            .then((vastaus) => {
                console.log(`Response from server: ${vastaus}.`)
                if (vastaus) {
                    this.props.unmountMe()
                }
            })
    }

    render() {
        return (
            <form className="box3" onSubmit={this.handleSubmit}>
                <label>Etunimi</label><br />
                <input type="text" value={this.state.Firstname} placeholder="Etunimi" onChange={this.handleChangeFirstname} />
                <label>Sukunimi</label><br />
                <input type="text" value={this.state.Lastname} placeholder="Sukunimi" onChange={this.handleChangeLastname} /><br />
                <label>Email</label><br />
                <input type="text" value={this.state.Email} placeholder="Email" onChange={this.handleChangeEmail} /><br />
                <label>Käyttäjätunnus</label><br />
                <input type="text" value={this.state.Username} placeholder="Käyttäjätunnus" onChange={this.handleChangeUsername} /><br />
                <label>Salasana</label><br />
                <input type="password" value={this.state.Password} placeholder="Salasana" onChange={this.handleChangePassword} /><br />
                <label>Salasana uudelleen</label><br />
                <input type="password" value={this.state.PasswordAgain} placeholder="Salasana uudelleen" onChange={this.handleChangePasswordAgain} /><br />
                <label>Access level</label><br />
                <input type="text" value={this.state.AccesslevelID} placeholder="Accesslevel" onChange={this.handleChangeAccesslevelID} /><br />
                <p>{this.state.Tarkistus}</p>
                <br />
                <button type="submit">Talleta muutokset</button>
            </form>
        )
    }
}
export default NWUserEdit
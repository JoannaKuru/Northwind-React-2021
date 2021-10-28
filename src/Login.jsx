import React, { Component } from 'react'
import md5 from 'md5'
import './App.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            Password: '',
            ShowLoginForm: true,
            LoggedInUser: ''
        }
        this.handleChangeUserName = this.handleChangeUserName.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const userFromLS = localStorage.getItem('user')
        if (userFromLS) {
            this.setState({ ...this.state, ShowLoginForm: false, LoggedInUser: userFromLS })
        }
    }

    logout() {
        localStorage.clear()
        this.setState({ ...this.state, LoggedInUser: '', ShowLoginForm: true })
    }

    handleChangeUserName(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, Username: syöte })
    }
    handleChangePassword(event) {
        //var syöte = md5(event.target.value)
        var syöte = (event.target.value)
        this.setState({ ...this.state, Password: syöte })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.authenticate()
    }

    authenticate() {
        const tunnukset = {
            username: this.state.Username,
            password: md5(this.state.Password)
        }

        // send an asynchronous request to the backend
        const tunnuksetJson = JSON.stringify(tunnukset)

        // let apiUrl = 'https://localhost:5001/api/authentication/'
        let apiUrl = 'https://northwindrestapi2021azure.azurewebsites.net/api/authentication/'

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: tunnuksetJson
        }).then((response) => response.json()) // Muutetaan Javascriptiksi
            .then((vastaus) => {
                if (vastaus.username === undefined) {
                    alert("Kirjautuminen epäonnistui")
                }
                else {
                    localStorage.setItem('user', vastaus.username)
                    localStorage.setItem('token', vastaus.token)
                    localStorage.setItem('AccesslevelId', vastaus.accesslevelId)
                    this.setState({ ...this.state, LoggedInUser: vastaus.username, ShowLoginForm: false })
                }
            })
    }

    render() {
        if (this.state.ShowLoginForm === true) {
            return (
                <form onSubmit={this.handleSubmit}>

                    <input type="text" placeholder="UserName"
                        onChange={this.handleChangeUserName} />

                    <input type="password" placeholder="Password" onChange={this.handleChangePassword} />

                    <br />
                    <button type="submit">Kirjaudu</button>
                </form>
            )
        }
        else {
            return (
                <>
                    <h4>Kirjautunut käyttäjä: {this.state.LoggedInUser}</h4>
                    <button onClick={() => this.logout()}>Kirjaudu ulos</button>
                </>
            )
        }
    }
}

export default Login
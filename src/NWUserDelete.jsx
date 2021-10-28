import React from 'react'
import './App.css'

const NWUserDelete = ({käyttäjäObj, unmountMe}) => {

    const handlePerformDelete = e => {
        e.preventDefault()
        NWDeleteRestApista()
    }

    const NWDeleteRestApista = () => {

        let jwtoken = localStorage.getItem('token')

        let apiUrl = 'https://northwindrestapi2021azure.azurewebsites.net/api/users/' + käyttäjäObj.loginId
        // let apiUrl = 'https://localhost:5001/api/users/' + käyttäjäObj.loginId

        fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + jwtoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: null
        })
        
        .then((res) => res.json()) // Json responce muutetaan javascriptiksi nimelle vastaus
        .then((vastaus) => {
            console.log('Response from server: ', vastaus);
            if (vastaus) {
                unmountMe()
            }
        })
    }

    return(

        <form className="box4" key={käyttäjäObj.LoginId} onSubmit={handlePerformDelete}>
            <table id="deletetbl">
                <tbody >
                    <label>Poistettava käyttäjä</label>
                    {/* <tr><td className="otsikko">Käyttäjätunnus:</td><td>{käyttäjäObj.loginId}</td></tr> */}
                    <tr><td className="otsikko">Käyttäjä:</td><td>{käyttäjäObj.firstname}</td><td>{käyttäjäObj.lastname}</td></tr>
                </tbody>
            </table>
            <br />
            <h5>Seuraavaksi suoritetaan tarkistus tietokannassa.</h5>
            <br />
            <button type="submit">Poista käyttäjä</button>
        </form>
    )
}

export default NWUserDelete
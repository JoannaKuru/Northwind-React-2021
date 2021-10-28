import React from 'react'
import './App.css'

const NWCustomerDelete = ({asiakasObj, unmountMe}) => {

    const handlePerformDelete = e => {
        e.preventDefault()
        NWDeleteRestApista()
    }

    const NWDeleteRestApista = () => {

        let jwtoken = localStorage.getItem('token')

        let apiUrl = 'https://northwindrestapi2021azure.azurewebsites.net/api/customers/' + asiakasObj.customerId
        // let apiUrl = 'https://localhost:5001/api/customers/' + asiakasObj.customerId

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

        <form className="box4" key={asiakasObj.customerId} onSubmit={handlePerformDelete}>
            <table id="deletetbl">
                <tbody >
                    <label>Poistettava asiakas</label>
                    <tr><td className="otsikko">Asiakastunnus:</td><td>{asiakasObj.customerId}</td></tr>
                    <tr><td className="otsikko">Firman nimi:</td><td>{asiakasObj.companyName}</td></tr>
                    <tr><td className="otsikko">Maa:</td><td>{asiakasObj.country}</td></tr>
                </tbody>
            </table>
            <br />
            <h5>Seuraavaksi suoritetaan tarkistus tietokannassa.
            Mikäli asiakkaalla on esim. tilauksia, ei poistoa suoriteta.</h5>
            <br />
            <button type="submit">Poista asiakas</button>
        </form>
    )
}

export default NWCustomerDelete
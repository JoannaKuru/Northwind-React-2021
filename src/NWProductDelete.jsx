import React from 'react'
import './App.css'

const NWProductDelete = ({tuoteObj, unmountMe}) => {

    const handlePerformDelete = e => {
        e.preventDefault()
        NWDeleteRestApista()
    }

    const NWDeleteRestApista = () => {

        // let apiUrl = 'https://northwindrestapi2021azure.azurewebsites.net/api/products/' + tuoteObj.productId
        let apiUrl = 'https://localhost:5001/api/products/' + tuoteObj.productId

        fetch(apiUrl, {
            method: 'DELETE',
            headers: {
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

        <form className="box4" key={tuoteObj.productId} onSubmit={handlePerformDelete}>
            <table id="deletetbl">
                <tbody >
                    <label>Poistettava tuote</label>
                    <tr><td className="otsikko">Product id:</td><td>{tuoteObj.productId}</td></tr>
                    <tr><td className="otsikko">Product:</td><td>{tuoteObj.productName}</td></tr>
                    {/* <tr><td className="otsikko">Maa:</td><td>{tuoteObj.country}</td></tr> */}
                </tbody>
            </table>
            <br />
            <h5>Checking the database.</h5>
            <br />
            <button type="submit">Delete product</button>
        </form>
    )
}

export default NWProductDelete
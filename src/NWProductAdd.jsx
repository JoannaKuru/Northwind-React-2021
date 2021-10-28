import React, { Component } from 'react'
import './App.css'

class NWProductAdd extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ProductID: '', ProductName: '', SupplierID: '', CategoryID: '', QuantityPerUnit: '',
            UnitPrice: '', UnitsInStock: '', UnitsOnOrder: '', ReorderLevel: '', Discontinued: '', ImageLink: ''
        }
        this.handleChangeProductID = this.handleChangeProductID.bind(this);
        this.handleChangeProductName = this.handleChangeProductName.bind(this);
        this.handleChangeSupplierID = this.handleChangeSupplierID.bind(this);
        this.handleChangeCategoryID = this.handleChangeCategoryID.bind(this);
        this.handleChangeQuantityPerUnit = this.handleChangeQuantityPerUnit.bind(this);
        this.handleChangeUnitPrice = this.handleChangeUnitPrice.bind(this);
        this.handleChangeUnitsInStock = this.handleChangeUnitsInStock.bind(this);
        this.handleChangeUnitsOnOrder = this.handleChangeUnitsInOrder.bind(this);
        this.handleChangeReorderLevel = this.handleChangeReorderLevel.bind(this);
        this.handleChangeDiscontinued = this.handleChangeDiscontinued.bind(this);
        this.handleChangeImageLink = this.handleChangeImageLink.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Input kenttien onChange tapahtumankäsittelijät
    handleChangeProductID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, ProductID: syöte.toUpperCase() });
    }
    handleChangeProductName(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, ProductName: syöte });
    }
    handleChangeSupplierID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, SupplierID: syöte });
    }
    handleChangeCategoryID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, CategoryID: syöte });
    }
    handleChangeQuantityPerUnit(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, QuantityPerUnit: syöte });
    }
    handleChangeUnitPrice(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, UnitPrice: syöte });
    }
    handleChangeUnitsInStock(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, UnitsInStock: syöte });
    }
    handleChangeUnitsInOrder(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, UnitsInOrder: syöte });
    }
    handleChangeReorderLevel(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, ReorderLevel: syöte });
    }
    // handleChangeDiscontinued(event) {
    //     var syöte = event.target.value;
    //     this.setState({ ...this.state, Discontinued: syöte });
    // }
    handleChangeDiscontinued(event) {
        var syöte = event.target.value
        if (syöte === "true") {
         
        this.setState({ ...this.state, Discontinued: false })
         
        }
        else {
        this.setState({ ...this.state, Discontinued: true })
        }
        console.log('setStaten jälkeen: ', this.state.Discontinued)
    }
    handleChangeImageLink(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, ImageLink: syöte });
    }

    // Lomakkeen onSubmit tapahtumankäsittelijä
    handleSubmit(event) {
        alert('Lähetettiin tuote: ' + this.state.ProductID);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    InsertoiKantaan() {
        // Luodaan Javascript tuoteobjekti, johon haetaan state:sta tiedot                     
        const tuote = {
            ProductID: this.state.ProductID,
            ProductName: this.state.ProductName,
            SupplierID: this.state.SupplierID,
            CategoryID: this.state.CategoryID,
            QuantityPerUnit: this.state.QuantityPerUnit,
            UnitPrice: this.state.UnitPrice,
            UnitsInStock: this.state.UnitsInStock,
            UnitsOnOrder: this.state.UnitsOnOrder,
            ReorderLevel: this.state.ReorderLevel,
            Discontinued: this.state.Discontinued,
            ImageLink: this.state.ImageLink
        };

        // send an asynchronous request to the backend
        const tuoteJson = JSON.stringify(tuote);
        console.log("tuoteJson = " + tuoteJson);

        let apiUrl = 'https://northwindrestapi2021azure.azurewebsites.net/api/products/'
        // let apiUrl = 'https://localhost:5001/api/products/'

        //request
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: tuoteJson
        }).then((response) => response.json()) //palautus=vastaus=vain infoa, ei pakollinen -> muuttaa jsonin javascriptiksi
            .then((jsResponse) => {
                console.log(`Response from server: ${jsResponse}.`);
                if (jsResponse) {
                    console.log("Pyyntö tuotteen tallettamiseksi tehty -- -- -- -- --");
                    this.props.unmountMe()
                }
            });

    }

    render() {
        return(
        <div>
            <form className="box1" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="ProductName" onChange={this.handleChangeProductName} />
                <input type="text" placeholder="SupplierID" onChange={this.handleChangeSupplierID} />
                <input type="text" placeholder="Category id" onChange={this.handleChangeCategoryID} />
                <input type="text" placeholder="Quantity per unit" onChange={this.handleChangeQuantityPerUnit} />
                <input type="text" placeholder="Units in stock" onChange={this.handleChangeUnitsInStock} />
                <input type="text" placeholder="Unit price" onChange={this.handleChangeUnitPrice} />
                <input type="text" placeholder="Units in order" onChange={this.handleChangeUnitsInOrder} />
                <input type="text" placeholder="Reorder level" onChange={this.handleChangeReorderLevel} />
                <label>Discontinued:</label><br />
                <div className="box7" onChange={this.handleChangeDiscontinued.bind(this)}>
                <input type="radio" value="true" name="disc" /> Yes <br />
                <input type="radio" value="false" name="disc" /> No
                </div>
                {/* <input type="text" placeholder="Discontinued" onChange={this.handleChangeDiscontinued} /> */}
                <input type="text" placeholder="Image link" onChange={this.handleChangeImageLink} />
                <br />
                <br />
                <button type="submit">Tallenna uudet tiedot</button>
            </form>
        </div>
        )
    }
}

export default NWProductAdd
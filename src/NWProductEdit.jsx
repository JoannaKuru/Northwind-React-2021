import React, { Component } from 'react'
import './App.css'

class NWProductEdit extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ProductID: '', ProductName: '', SupplierID: '', CategoryID: '', QuantityPerUnit: '',
            UnitPrice: '', UnitsInStock: '', UnitsOnOrder: '', ReorderLevel: '', Discontinued: '', ImageLink: ''
        }
         //aaltosulkeet = objekti

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
    // handleChangeDiscontinued(event) {
    //     var syöte = event.target.value;
    //     this.setState({ ...this.state, Discontinued: syöte });
    // }
    handleChangeImageLink(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, ImageLink: syöte });
    }

    handleSubmit(event) {
        alert('Päivitettävä tuote: ' + this.state.ProductID)
        event.preventDefault()
        this.InsertoiKantaan()
    }

    componentDidMount() {
        this.setState({
            ProductID: this.props.tuoteObj.productId,
            ProductName: this.props.tuoteObj.productName,
            SupplierID: this.props.tuoteObj.supplierId,
            CategoryID: this.props.tuoteObj.categoryId,
            QuantityPerUnit: this.props.tuoteObj.quantityPerUnit,
            UnitPrice: this.props.tuoteObj.unitPrice,
            UnitsInStock: this.props.tuoteObj.unitsInStock,
            UnitsOnOrder: this.props.tuoteObj.unitsOnOrder,
            ReorderLevel: this.props.tuoteObj.reorderLevel,
            Discontinued: this.props.tuoteObj.discontinued,
            ImageLink: this.props.tuoteObj.imageLink
        }
        )
    }

    InsertoiKantaan() {
        // Luodaan asiakasobjekti, johon haetaan state:sta inputkentiltä tulleet tiedot                     
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
        }
       
        const tuoteJson = JSON.stringify(tuote)
        console.log("tuoteJson = ", tuoteJson)

        let apiUrl = 'https://localhost:5001/api/products/' + this.state.ProductID
        // let apiUrl = 'https://northwindrestapi2021azure.azurewebsites.net/api/products/' + this.state.ProductID
        console.log(apiUrl)

        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: tuoteJson
        }).then((res) => res.json()) // Vastaus muutetaan javascriptiksi jsonista
            .then((vastaus) => {
                alert(`Responce from server: ${vastaus}.`)
                console.log(`Response from server: ${vastaus}.`)
                if (vastaus) {
                    this.props.unmountMe()
                }
            })
    }

    //maxLenght="30" min="10" max="100"
    render() {
        return (
            <form className="box5" onSubmit={this.handleSubmit}>
                <label>Company</label><br /> 
                <input type="text" value={this.state.ProductName} placeholder="ProductName" onChange={this.handleChangeProductName} />
                <label>Supplier id</label><br />
                <input type="text" value={this.state.SupplierID} placeholder="Supplier id" onChange={this.handleChangeSupplierID} />
                <label>Category id</label><br />
                <input type="text" value={this.state.CategoryID} placeholder="Category id" onChange={this.handleChangeCategoryID} />
                <label>Quantity per unit</label><br />
                <input type="text" value={this.state.QuantityPerUnit} placeholder="Quantity per unit" onChange={this.handleChangeQuantityPerUnit} />
                <label>Units in stock</label><br />
                <input type="text" value={this.state.UnitsInStock} placeholder="Units in stock" onChange={this.handleChangeUnitsInStock} />
                <label>Unit price</label><br />
                <input type="text" value={this.state.UnitPrice} placeholder="Unit price" onChange={this.handleChangeUnitPrice} />
                <label>Units in order</label><br />
                <input type="text" value={this.state.UnitsOnOrder} placeholder="Units in order" onChange={this.handleChangeUnitsInOrder} />
                <label>Reorder level</label><br />
                <input type="text" value={this.state.ReorderLevel} placeholder="Reorder level" onChange={this.handleChangeReorderLevel} />
                <label>Discontinued</label><br />
                <div className="box7" onChange={this.handleChangeDiscontinued.bind(this)}>
                <input type="radio" value="true" name="disc" /> Yes <br />
                <input type="radio" value="false" name="disc" /> No
                </div>
                {/* <input type="text" value={this.state.Discontinued} placeholder="Discontinued" onChange={this.handleChangeDiscontinued} /> */}
                <label>Image link</label><br />
                <input type="text" value={this.state.ImageLink} placeholder="Image link" onChange={this.handleChangeImageLink} />
                <br />
                <br />
                <button type="submit">Talleta muutokset</button>
            </form>
        )
    }
}
export default NWProductEdit
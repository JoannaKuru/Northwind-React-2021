import React, { Component } from 'react'
import './App.css'
import NWProductAdd from './NWProductAdd'
import Helpit from './Helpit';
import NWProductEdit from './NWProductEdit'
import NWProductDelete from './NWProductDelete'

class NWProductFetch extends Component {
    constructor(props) {
        super(props);
        this.state = { //state on olio
            Products: [],
            recordcount: 0,
            start: 0,
            take: 10,
            show: "table", //Oletuksena näytetään asiakaslistaus, eli "table"
            näytäHelppi: false, //ominaisuus,
            muokattavaTuote: {}, //asetetaan kokonainen olio
            poistettavaTuote: {}

        }
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this)
        this.handleClickDelete = this.handleClickDelete.bind(this)
    }

    //kaikkien eri lomakkeiden muokkaamiseen, lisäämiseen ym. 
    handleChildUnmount() {
        // console.log("Ollaan NWProductFetch-handleChildUnmountAdd-rutiinissa - - - - - - ");
        this.setState({ show: "table" });
        this.haeNwRestApista();
    }

    //property, jonka arvona funktio:
    handleClickAddForm = () => {
        this.setState({show: 'addForm'})
    }

    handleClickEdit = (dataObj) => {
        this.setState({
            show: "editForm",
            muokattavaTuote: dataObj
        })
        console.log(this.state.muokattavaTuote)
    }

    handleClickDelete = (dataObj) => {
        this.setState({
            show: "deleteForm",
            poistettavaTuote: dataObj
        })
        console.log(this.state.poistettavaTuote)
    }

    //vaihtaa boolean tilan aina päinvastaiseksi
    näytäHelppiPainettu = () => {
        this.setState({näytäHelppi: !this.state.näytäHelppi})
    }

    handleClickPrev = () => {
        let startvalue = this.state.start;
        if (startvalue > 0) {
          startvalue = startvalue - 10;
        }
        this.setState({ start: startvalue }, this.haeNwRestApista);
      }
    
      handleClickNext = () => {
        this.setState({ start: this.state.start + 10 }, this.haeNwRestApista);
      }
    

    // fetch: haetaan dataa (ent. https://jsonplaceholder.typicode.com/todos )
    componentDidMount() {
        this.haeNwRestApista()
    }

    haeNwRestApista() {

        let jwtoken = localStorage.getItem('token')

        // let uri = `https://localhost:5001/api/Products/r?offset= ${this.state.start} &limit= ${this.state.take}`
        let uri = `https://northwindrestapi2021azure.azurewebsites.net/api/Products/r?offset= ${this.state.start} &limit= ${this.state.take}`
    
        fetch(uri, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + jwtoken,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json()) //muutetaan jsonista javascriptiksi
        .then(oliot => this.setState({Products: oliot}))
    }

    render() {

        // ADD____________________________________________________
        if (this.state.show === 'addForm') //voi nimetä itse "lisäyslomake" tässä tapauksessa
        {
            return(
                <div className="box1">
                    <h2>Add product</h2>
                    <div>
                        {this.state.näytäHelppi === false ? <button onClick={this.näytäHelppiPainettu}>Show help</button>
                        : <button onClick={this.näytäHelppiPainettu}>Hide help</button>}

                        <button onClick={this.handleChildUnmount}>View products</button>
                    </div>

                    {this.state.näytäHelppi === true ? <Helpit moduli={"productAdd"} /> : null}

                    <NWProductAdd unmountMe={this.handleChildUnmount} /> 
                </div>
            )
        }

        //EDIT______________________________________________________
        if (this.state.show === 'editForm') //voi nimetä itse "lisäyslomake" tässä tapauksessa
        {
            return(
                <div className="box5">
                    <h2>Edit product</h2>
                    <div>
                        {this.state.näytäHelppi === false ? <button onClick={this.näytäHelppiPainettu}>Show help</button>
                        : <button onClick={this.näytäHelppiPainettu}>Hide help</button>}

                        <button onClick={this.handleChildUnmount}>View products</button>
                    </div>

                    {this.state.näytäHelppi === true ? <Helpit moduli={"productEdit"} /> : null}

                    <NWProductEdit tuoteObj={this.state.muokattavaTuote} unmountMe={this.handleChildUnmount} /> 
                    {/* //voi laittaa nullin tilalle = jompi kumpi näkyy */}
                </div>
            )
        }

        if (this.state.show === 'deleteForm') //voi nimetä itse "lisäyslomake" tässä tapauksessa
        {
            return(
                <div className="box4">
                    <h2>Delete product</h2>
                    <div>
                        {this.state.näytäHelppi === false ? <button onClick={this.näytäHelppiPainettu}>Show help</button>
                        : <button onClick={this.näytäHelppiPainettu}>Hide help</button>}

                        <button onClick={this.handleChildUnmount}>View products</button>
                    </div>

                    {this.state.näytäHelppi === true ? <Helpit moduli={"productDelete"} /> : null}

                    <NWProductDelete tuoteObj={this.state.poistettavaTuote} unmountMe={this.handleChildUnmount} /> 
                    {/* //voi laittaa nullin tilalle = jompi kumpi näkyy */}
                </div>
            )
        }

        if (this.state.Products.length > 9 ) {

            //bodyssa loop, javascriptiä! Ps. funktionaalisessa ei this. mut tässä tarvii
            return(
                <div className="products">
                    <h2>Products</h2>
                    <br />

                    <button onClick={this.handleClickPrev}>Previous</button>
                    <button onClick={this.handleClickNext}>Next</button>
                    <button onClick={this.handleClickAddForm}>Add new</button>

                    <br />
                    <br />

                    <table>
                        <thead>
                            <tr>
                                <th>Product name</th>
                                <th>Supplier ID</th>
                                <th>Category ID</th>
                                <th>Quantity per unit</th>
                                <th>Unit price</th>
                                <th>Units in stock</th>
                                <th>Units on order</th>
                                <th>Reorder level</th>
                                <th>Discontinued</th>
                                <th>Image link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Products.map(c => (
                                <tr key={c.productId}>
                                    <td>{c.productName}</td>
                                    <td>{c.supplierId}</td>
                                    <td>{c.categoryId}</td>
                                    <td>{c.quantityPerUnit}</td>
                                    <td>{c.unitPrice}</td>
                                    <td>{c.unitsInStock}</td>
                                    <td>{c.unitsOnOrder}</td>
                                    <td>{c.reorderlevel}</td>
                                    <td>{c.discontinued}</td>
                                    <td>{c.imageLink}</td>
                                    <td><button onClick={() => this.handleClickEdit(c)}>Edit</button></td>
                                    <td><button onClick={() => this.handleClickDelete(c)}>Delete</button></td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                    <p>
                    <br />
                    {this.state.näytäHelppi === false ? <button onClick={this.näytäHelppiPainettu}>Show help</button>
                        : <button onClick={this.näytäHelppiPainettu}>Hide help</button>}
                        {/* {this.state.näytäHelppi === false && <button onClick={this.näytäHelppiPainettu}>Show help</button>}
                        {this.state.näytäHelppi === true && <button onClick={this.näytäHelppiPainettu}>Hide help</button>} */}
                        {this.state.näytäHelppi === true && <Helpit moduli={"product"} />}
                    </p>
                </div>
            )
        }

        else if (this.state.Products.length > 0 && this.state.Products.length < 10) {
            return(
                <div className="products">
                    <h2>Products</h2>
                    <br />

                    <button disabled="true" onClick={this.handleClickPrev}>Previous</button>
                    <button disabled="true">Next</button>
                    <button onClick={this.handleClickAddForm}>Add new</button>

                    <br />
                    <br />

                    <table>
                        <thead>
                            <tr>
                                <th>Product name</th>
                                <th>Supplier ID</th>
                                <th>Category ID</th>
                                <th>Quantity per unit</th>
                                <th>Unit price</th>
                                <th>Units in stock</th>
                                <th>Units on order</th>
                                <th>Reorder level</th>
                                <th>Discontinued</th>
                                <th>Image link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Products.map(c => (
                                <tr key={c.ProductId}>
                                    <td>{c.productName}</td>
                                    <td>{c.supplierId}</td>
                                    <td>{c.categoryId}</td>
                                    <td>{c.quantityPerUnit}</td>
                                    <td>{c.unitPrice}</td>
                                    <td>{c.unitsInStock}</td>
                                    <td>{c.unitsOnOrder}</td>
                                    <td>{c.reorderlevel}</td>
                                    <td>{c.discontinued}</td>
                                    <td>{c.imageLink}</td>
                                    <td><button onClick={() => this.handleClickEdit(c)}>Edit</button></td>
                                    <td><button onClick={() => this.handleClickDelete(c)}>Delete</button></td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                    <p>
                        <br />
                        {this.state.näytäHelppi === false && <button onClick={this.näytäHelppiPainettu}>Show help</button>}
                        {this.state.näytäHelppi === true && <button onClick={this.näytäHelppiPainettu}>Hide help</button>}
                        {this.state.näytäHelppi === true && <Helpit moduli={"Product"} />}
                    </p>
                </div>
            )
        }
        else {
            return(
                <h4>Downloading..</h4>
            )
        }
    }
}

export default NWProductFetch
import React, { Component } from 'react'
import './App.css'
import NWCustomerAdd from './NWCustomerAdd'

class NWCustomerFetch extends Component {
    constructor(props) {
        super(props);
        this.state = { //state on olio
            customers: [],
            recordcount: 0,
            start: 0,
            // end: 10, 
            take: 10,
            // page: 1, 
            // limit: 10
            show: "table"
        }
    }

    //property, jonka arvona funktio:
    handleClickAddForm = () => {
        this.setState({show: 'addForm'})
    }

    // handleClickAddForm() { //perinteinen tapa, ei futaa
    //     this.setState({show: 'addForm'})
    // }

    // handleClickPrev = () => {
    //     let pagenumber = this.state.page;
    //     if (pagenumber > 0) {
    //         pagenumber = pagenumber-1;
    //     }
    //     this.setState({
    //         page: pagenumber,
    //     },this.haeNwRestApista);
    // }

    // handleClickNext = () => {
    //     this.setState({
    //         page: this.state.page+1,
    //     },this.haeNwRestApista);
    // }

    // handleClickPrev = (event) => {
    //     let startvalue = this.state.start;
    //     if (startvalue > 0) {
    //       startvalue = startvalue - 10;
    //     }
    //     this.setState({
    //       start: startvalue,
    //       take: 10
    //     });
    //     this.haeNWRestApista);
    //   }
    
    //   handleClickNext = (event) => {
    //     this.setState({
    //       start: this.state.start + 10,
    //       take: 10
    //     });
    //     this.haeNWRestApista);
    //   }

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
        //fetch('https://localhost:5001/api/customers') VIELÄ VÄLIVAIHE
        // fetch('https://jsonplaceholder.typicode.com/todos?_page='+this.state.page+'&_limit='+this.state.limit) AIKAISEMPI TÄMÄKIN
        // fetch('https://jsonplaceholder.typicode.com/todos?_start='+this.state.start+'&_end='+this.state.end) VANHA, NEXT-PREVIOUS ei futannu oikein
        
        // fetch('https://localhost:5001/api/customers?_page='+this.state.page+'&_limit='+this.state.limit)
        // fetch('https://localhost:5001/api/customers/r?offset='+this.state.start+'&_limit='+this.state.take)
        fetch(`https://localhost:5001/api/customers/r?offset= ${this.state.start} &limit= ${this.state.take}`)

        .then(x => x.json()) //muutetaan jsonista javascriptiksi
        .then(oliot => this.setState({customers: oliot}))
        //.then(todos => console.log(todos)) voi nimetä miten haluaa (todos)

        // fetch(uri) Nämä odottaa jos pitää päivittää uriksi toi fetch
        // .then(response => response.json())
        // .then(json => {
        //     console.log(json);
        //     this.setState({ todos: json, recordcount: json.length});
        // });
    }

    render() {

        //liittyy CustomerAddiin
        if (this.state.show === 'addForm') //voi nimetä itse "lisäyslomake" tässä tapauksessa
        {
            return(
                <NWCustomerAdd />
            )
        }

        // const {customers: todos} = this.state

        // console.log("State on: ", this.state.todos) //pilkku yhdistää, + ei futaa


        if (this.state.customers.length > 0) { //this.state.todos.length

            //bodyssa loop, javascriptiä! Ps. funktionaalisessa ei this. mut tässä tarvii
            return(
                <div className="customers">
                    <h2>Customers</h2>
                    <button onClick={this.handleClickPrev}>Previous</button>
                    <button onClick={this.handleClickNext}>Next</button>
                    <button onClick={this.handleClickAddForm}>Lisää uusi</button>

                    <table>
                        <thead>
                            <tr>
                                <th>Firm</th>
                                <th>Contact person</th>
                                <th>City</th>
                                <th>Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.customers.map(c => (
                                <tr key={c.customerId}>
                                    <td>{c.companyName}</td>
                                    <td>{c.contactName}</td>
                                    <td>{c.city}</td>
                                    <td>{c.country}</td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                </div>
            )
        }
        else {
            return(
                <p>Downloading..</p>
            )
        }
    }
}

export default NWCustomerFetch 
import React, { Component } from 'react'
import './App.css'
import NWUserAdd from './NWUserAdd';
import Helpit from './Helpit';
import NWUserEdit from './NWUserEdit'
import NWUserDelete from './NWUserDelete'

class NWUserFetch extends Component {
    constructor(props) {
        super(props);
        this.state = { //state on olio
            users: [],
            recordcount: 0,
            start: 0,
            take: 10,
            show: "table",
            näytäHelppi: false, //ominaisuus
            muokattavaKäyttäjä: {},
            poistettavaKäyttäjä: {},
            search: ""
        }
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this)
        this.handleClickDelete = this.handleClickDelete.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.performSearch = this.performSearch.bind(this);
    }

    näytäHelppiPainettu = () => {
        this.setState({näytäHelppi: !this.state.näytäHelppi})
    }

    //kaikkien eri lomakkeiden muokkaamiseen, lisäämiseen ym. 
    handleChildUnmount() {
        this.setState({ show: "table" });
        this.haeNwRestApista();
    }

    handleClickAddForm = () => {
        this.setState({show: 'addForm'})
    }

    handleClickEdit = (dataObj) => {
        this.setState({
            show: "editForm",
            muokattavaKäyttäjä: dataObj
        })
        console.log(this.state.muokattavaKäyttäjä)
    }

    handleClickDelete = (dataObj) => {
        this.setState({
            show: "deleteForm",
            poistettavaKäyttäjä: dataObj
        })
        console.log(this.state.poistettavaKäyttäjä)
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

    handleSearchChange(event) {
        var syöte = event.target.value
        this.setState({ search: syöte })
    }

    performSearch = () => {
        this.haeNwRestApista()
    }

    // fetch: haetaan dataa (ent. https://jsonplaceholder.typicode.com/todos )
    componentDidMount() {
        this.haeNwRestApista()
    }

    haeNwRestApista() {

        let jwtoken = localStorage.getItem('token')

        let uri = ""

        if (this.state.search !== "") {
            // uri = `https://localhost:5001/api/users/lastname/${this.state.search}`
            uri = `https://northwindrestapi2021azure.azurewebsites.net/api/users/lastname/${this.state.search}`
        }

        else{
            // uri = `https://localhost:5001/api/users/r?offset= ${this.state.start} &limit= ${this.state.take}`
            uri = `https://northwindrestapi2021azure.azurewebsites.net/api/users/r?offset= ${this.state.start} &limit= ${this.state.take}`
        }

        fetch(uri, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + jwtoken,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })

        .then(x => x.json()) //muutetaan jsonista javascriptiksi
        .then(oliot => this.setState({users: oliot}))
    }

    render() {

        // ADD____________________________________________________
        if (this.state.show === 'addForm') //voi nimetä itse "lisäyslomake" tässä tapauksessa
        {
            return(
                <div className="box13">
                    <h2>Käyttäjän lisääminen</h2>
                    <div>
                        {this.state.näytäHelppi === false ? <button onClick={this.näytäHelppiPainettu}>Näytä opaste</button>
                        : <button onClick={this.näytäHelppiPainettu}>Piilota opaste</button>}

                        <button onClick={this.handleChildUnmount}>Selaa käyttäjiä</button>
                    </div>

                    {this.state.näytäHelppi === true ? <Helpit moduli={"userAdd"} /> : null}

                    <NWUserAdd unmountMe={this.handleChildUnmount} /> 
                    {/* //voi laittaa nullin tilalle = jompi kumpi näkyy */}
                </div>
            )
        }

        //EDIT______________________________________________________
        if (this.state.show === 'editForm') //voi nimetä itse "lisäyslomake" tässä tapauksessa
        {
            return(
                <div className="box3">
                    <h2>Käyttäjän muokkaus</h2>
                    <div>
                        {this.state.näytäHelppi === false ? <button onClick={this.näytäHelppiPainettu}>Näytä opaste</button>
                        : <button onClick={this.näytäHelppiPainettu}>Piilota opaste</button>}

                        <button onClick={this.handleChildUnmount}>Selaa käyttäjiä</button>
                    </div>

                    {this.state.näytäHelppi === true ? <Helpit moduli={"userEdit"} /> : null}

                    <NWUserEdit käyttäjäObj={this.state.muokattavaKäyttäjä} unmountMe={this.handleChildUnmount} /> 
                    {/* //voi laittaa nullin tilalle = jompi kumpi näkyy */}
                </div>
            )
        }

        //DELETE____________________________________________________________________

        if (this.state.show === 'deleteForm') //voi nimetä itse "lisäyslomake" tässä tapauksessa
        {
            return(
                <div className="box4">
                    <h2>Käyttäjän poistaminen</h2>
                    <div>
                        {this.state.näytäHelppi === false ? <button onClick={this.näytäHelppiPainettu}>Näytä opaste</button>
                        : <button onClick={this.näytäHelppiPainettu}>Piilota opaste</button>}

                        <button onClick={this.handleChildUnmount}>Selaa käyttäjiä</button>
                    </div>

                    {this.state.näytäHelppi === true ? <Helpit moduli={"userDelete"} /> : null}

                    <NWUserDelete käyttäjäObj={this.state.poistettavaKäyttäjä} unmountMe={this.handleChildUnmount} /> 
                    {/* //voi laittaa nullin tilalle = jompi kumpi näkyy */}
                </div>
            )
        }

        if (this.state.users.length > 9 ) { //this.state.todos.length

            //bodyssa loop, javascriptiä! Ps. funktionaalisessa ei this. mut tässä tarvii
            return(
                <div className="users">
                    <h2>Users</h2>

                    <br />
                    {this.state.näytäHelppi === false ? <button onClick={this.näytäHelppiPainettu}>Näytä opaste</button>
                        : <button onClick={this.näytäHelppiPainettu}>Piilota opaste</button>}

                    <button onClick={this.handleClickPrev}>Previous</button>
                    <button onClick={this.handleClickNext}>Next</button>
                    <button onClick={this.handleClickAddForm}>Lisää uusi</button>

                    <input type="text" onChange={this.handleSearchChange} placeholder="Hae sukunimellä"></input>
                    <button onClick={this.performSearch}>Haku</button>

                    <table>
                        <thead>
                            <tr>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Email</th>
                                <th>Username</th>
                                {/* <th>Password</th> */}
                                <th>Access level</th>
                            </tr>
                        </thead>

                        {/* Jokaiselle userille tehdään "mappaus", map looppaa asiakkaat läpi ja asettaa kulloisenkin c:hen (korvaa for each/ for-loopin) */}
                        <tbody>
                            {this.state.users.map(u => (
                                <tr key={u.loginId}>
                                    <td>{u.firstname}</td>
                                    <td>{u.lastname}</td>
                                    <td>{u.email}</td>
                                    <td>{u.username}</td>
                                    {/* <td>{u.password}</td> */}
                                    <td>{u.accesslevelId}</td>
                                    <td><button onClick={() => this.handleClickEdit(u)}>Muokkaa</button></td>
                                    <td><button onClick={() => this.handleClickDelete(u)}>Poista</button></td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                    <p>
                    <br />
                        {this.state.näytäHelppi === false && <button onClick={this.näytäHelppiPainettu}>Näytä helppi</button>}
                        {this.state.näytäHelppi === true && <button onClick={this.näytäHelppiPainettu}>Piilota helppi</button>}
                        {this.state.näytäHelppi === true && <Helpit moduli={"user"} />}
                    </p>
                </div>
            )
        }

        else if (this.state.users.length > 0 && this.state.users.length < 10) {
            return(
                <div className="users">
                    <h2>Users</h2>

                    <br />
                    <button disabled="true">Previous</button>
                    <button disabled="true">Next</button>
                    <button onClick={this.handleClickAddForm}>Lisää uusi</button>
                    
                    <input type="text" onChange={this.handleSearchChange} placeholder="Hae sukunimellä"></input>
                    <button onClick={this.performSearch}>Haku</button>

                    <br />
                    <br />

                    <table>
                        <thead>
                            <tr>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Email</th>
                                <th>Username</th>
                                {/* <th>Password</th> */}
                                <th>Access level</th>
                            </tr>
                        </thead>

                        {/* Jokaiselle userille tehdään "mappaus", map looppaa asiakkaat läpi ja asettaa kulloisenkin c:hen (korvaa for each/ for-loopin) */}
                        <tbody>
                            {this.state.users.map(u => (
                                <tr key={u.loginId}>
                                    <td>{u.firstname}</td>
                                    <td>{u.lastname}</td>
                                    <td>{u.email}</td>
                                    <td>{u.username}</td>
                                    {/* <td>{u.password}</td> */}
                                    <td>{u.accesslevelId}</td>
                                    <td><button onClick={() => this.handleClickEdit(u)}>Muokkaa</button></td>
                                    <td><button onClick={() => this.handleClickDelete(u)}>Poista</button></td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>

                    <p>
                    <br />
                        {this.state.näytäHelppi === false && <button onClick={this.näytäHelppiPainettu}>Näytä helppi</button>}
                        {this.state.näytäHelppi === true && <button onClick={this.näytäHelppiPainettu}>Piilota helppi</button>}
                        {this.state.näytäHelppi === true && <Helpit moduli={"user"} />}
                    </p>
                </div>
            )
        }
        else {
            return(
                <div className="users">
                    <h2>Users</h2>

                    <br />
                        <button disabled="true">Previous</button>
                        <button disabled="true">Next</button>
                        <button onClick={this.handleClickAddForm}>Lisää uusi</button>

                        <br />
                        <br />
                        
                        <input type="text" onChange={this.handleSearchChange} placeholder="Hae sukunimellä"></input>
                        <button onClick={this.performSearch}>Haku</button>

                        <table>
                            <thead>
                                <tr>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Email</th>
                                    <th>Username</th>
                                    {/* <th>Password</th> */}
                                    <th>Access level</th>
                                </tr>
                            </thead>
                        </table>
                    <h4>Downloading..</h4>
                </div>
            )
        }
    }
}

export default NWUserFetch 
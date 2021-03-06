import React, { Component } from 'react'
import './App.css'
import NWUserAdd from './NWUserAdd';
import Helpit from './Helpit';

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
            poistettavaKäyttäjä: {}
        }
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this)
        this.handleClickDelete = this.handleClickDelete.bind(this)
    }

    näytäHelppiPainettu = (event) => {
        if (this.state.näytäHelppi === false) {
            this.setState({
                näytäHelppi: true
            })
        }
        else {
            this.setState({
                näytäHelppi: false
            })
        }
    }

    //Vaihtoehto ylläolevalle
    // näytäHelppiPainettu = () => {
    //     this.setState({näytäHelppi: !this.state.näytäHelppi})
    // }

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
    

    // fetch: haetaan dataa (ent. https://jsonplaceholder.typicode.com/todos )
    componentDidMount() {
        this.haeNwRestApista()
    }

    haeNwRestApista() {

        fetch(`https://localhost:5001/api/users/r?offset= ${this.state.start} &limit= ${this.state.take}`)

        .then(x => x.json()) //muutetaan jsonista javascriptiksi
        .then(oliot => this.setState({users: oliot}))
    }

    render() {

             //liittyy UserAddiin
             if (this.state.show === 'addForm') //voi nimetä itse "lisäyslomake" tässä tapauksessa
             {
                 return(
                     <NWUserAdd unmountMe={this.handleChildUnmount}/>
                 )
             }

        if (this.state.users.length > 0) { //this.state.todos.length

            //bodyssa loop, javascriptiä! Ps. funktionaalisessa ei this. mut tässä tarvii
            return(
                <div className="users">
                    <h2>Users</h2>
                    <button onClick={this.handleClickPrev}>Previous</button>
                    <button onClick={this.handleClickNext}>Next</button>
                    <button onClick={this.handleClickAddForm}>Lisää uusi</button>

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
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                    <p>
                        {this.state.näytäHelppi === false && <button onClick={this.näytäHelppiPainettu}>Näytä helppi</button>}
                        {this.state.näytäHelppi === true && <button onClick={this.näytäHelppiPainettu}>Piilota helppi</button>}
                        {this.state.näytäHelppi === true && <Helpit moduli={"user"} />}
                    </p>
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

export default NWUserFetch 



// import MD5 from 'md5'

// class MD5demo extends Component {

//     render() {

//         let salattava = "Hessu123!"
//         let salattu = MD5(salattava)

//         return (

//             <div className="App">
//                 <h4>"Salattava merkkijono on: {salattava}</h4>
//                 <h4>"Salattu merkkijono on: {salattu}</h4>
//             </div>
//         )
//     }
// }
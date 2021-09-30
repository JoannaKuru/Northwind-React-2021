import React, { Component } from 'react'
import './App.css'

class TypicodeFetch extends Component {
    constructor(props) {
        super(props);
        this.state = { //state on olio
            todos: [],
            recordcount: 0,
            start: 0,
            end: 10, 
            page: 1, 
            limit: 10, 
            userId: ""
        }
    }

    handleClickPrev = () => {
        let pagenumber = this.state.page;
        if (pagenumber > 0) {
            pagenumber = pagenumber-1;
        }
        this.setState({
            page: pagenumber,
        },this.haeTypicodesta);
    }

    handleClickNext = () => {
        this.setState({
            page: this.state.page+1,
        },this.haeTypicodesta);
    }

    //ENTINEN  NEXT- PREVIOUS
    // handleClickPrev = (event) => {
    //     let startvalue = this.state.start;
    //     if (startvalue > 0) {
    //         startvalue = startvalue-10;
    //     }
    //     this.setState({
    //         start: startvalue,
    //         end: startvalue+10
    //     });
    //     this.haeTypicodesta();
    // }

    // handleClickNext = (event) => {
    //     this.setState({
    //         start: this.state.start+10,
    //         end: this.state.end+10
    //     });
    //     this.haeTypicodesta();
    // }

    // fetch: haetaan dataa (ent. https://jsonplaceholder.typicode.com/todos )
    componentDidMount() {
        this.haeTypicodesta()
    }

    haeTypicodesta() {
        fetch('https://jsonplaceholder.typicode.com/todos?_page='+this.state.page+'&_limit='+this.state.limit)
        // fetch('https://jsonplaceholder.typicode.com/todos?_start='+this.state.start+'&_end='+this.state.end) VANHA, NEXT-PREVIOUS ei futannu oikein
        .then(x => x.json()) //muutetaan jsonista javascriptiksi
        .then(oliot => this.setState({todos: oliot}))
        //.then(todos => console.log(todos)) voi nimetä miten haluaa (todos)

        // fetch(uri) Nämä odottaa jos pitää päivittää uriksi toi fetch
        // .then(response => response.json())
        // .then(json => {
        //     console.log(json);
        //     this.setState({ todos: json, recordcount: json.length});
        // });
    }

    render() {

        const {todos} = this.state

        // console.log("State on: ", this.state.todos) //pilkku yhdistää, + ei futaa


        if (todos.length > 0) { //this.state.todos.length

            //bodyssa loop, javascriptiä! Ps. funktionaalisessa ei this. mut tässä tarvii
            return(
                <div className="typicode">
                    <h2>Todos from Typicode</h2>
                    <button onClick={this.handleClickPrev}>Previous</button>
                    <button onClick={this.handleClickNext}>Next</button>

                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User ID</th>
                                <th>Title</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map(t => (
                                <tr key={t.id}>
                                    <td>{t.id}</td>
                                    <td>{t.userId}</td>
                                    <td>{t.title}</td>
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


        //PERUSESIMERKKI, HAKEE YHDEN
        // if (this.state.todos.length > 0) {

        //     return(
        //         <div className="typicode">
        //             <h2>Todos from Typicode</h2>
        //             <p>{this.state.todos[70].title}</p>
        //         </div>
        //     )
        // }
        // else {
        //     return(
        //         <p>Ladataan..</p>
        //     )
        // }
    }
}

export default TypicodeFetch 
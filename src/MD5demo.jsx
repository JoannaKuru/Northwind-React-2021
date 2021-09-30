import './App.css';
import React, { Component } from 'react';
import MD5 from 'md5'

class MD5demo extends Component {

    render() {

        let salattava = "Hessu123!"
        let salattu = MD5(salattava)

        return (

            <div className="App">
                <h4>"Salattava merkkijono on: {salattava}</h4>
                <h4>"Salattu merkkijono on: {salattu}</h4>
            </div>
        )
    }
}

export default MD5demo
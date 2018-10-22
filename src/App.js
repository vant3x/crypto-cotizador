import React, { Component } from 'react';
// styles
import './css/App.css';
import './css/Spinner.css';
// components
import Form from './components/Form';
import Header from './components/Header';
import Resultado from './components/Resultado';
// libraries
import axios from 'axios';

class App extends Component {

  state = {
     monedas: [],
     cotizacion: {},
     monedaCotizada: '',
     cargando: false
    }
  
  async componentDidMount() {
    this.obtenerMonedas();
  }

  obtenerMonedas = async () => {
    const urlAPI = `https://api.coinmarketcap.com/v2/ticker/`;
    
    await axios.get(urlAPI)
      .then(respuesta => {
        this.setState({
          monedas: respuesta.data.data
        })
      })
      .catch(error => {
        console.error(error);
      })
  }

  // Cotizar una crypto en base a una moneda
  obtenerValoresCrypto = async (monedas) => {
   const {moneda, crypto} = monedas;

   const urlAPIConvert = `https://api.coinmarketcap.com/v2/ticker/${crypto}/?convert=${moneda}`
    
  await axios.get(urlAPIConvert)
    .then(respuesta => {
      this.setState({
        cargando: true
      })
     setTimeout(() => {
      this.setState({
        cotizacion: respuesta.data.data,
        monedaCotizada: moneda,
        cargando: false
      })
     }, 2000);
    })
  }

  render() {

    const cargando = this.state.cargando;

    let resultado;

    if(cargando) {
      resultado = <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                 </div>
    } else {
      resultado =   <Resultado
                      cotizacion={this.state.cotizacion}
                      monedaCotizada={this.state.monedaCotizada}
                    />
    }

    return (
      <div className="App container">
        <Header
          titulo="Crypto Cotizador"
        />

        <div className="row justify-content-center">
          <div className="col-md-6 bg-light pb-4 contenido-principal">
              <Form 
                monedas={this.state.monedas}
                obtenerValoresCrypto={this.obtenerValoresCrypto}
              />
              {resultado}
          
          </div>
        </div>
      </div>
    );
  }
}

export default App;

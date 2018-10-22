import React, { Component } from 'react';
import OptionSelect from './OptionSelect';

class Form extends Component {
  
  monedaRef = React.createRef();
  cryptoRef = React.createRef();

  cotizarMonedas = (ev) => {
    ev.preventDefault();

    // crear el objeto
    const cotizacion = {
      moneda: this.monedaRef.current.value,
      crypto: this.cryptoRef.current.value
    }
    // enviar por props
    this.props.obtenerValoresCrypto(cotizacion);

  }

  render() {
    return(
      <form onSubmit={this.cotizarMonedas}>
        <div className="form-group">
          <label>Moneda: </label>
          <select ref={this.monedaRef} className="form-control">
            <option value="" disabled defaultValue>Elige tu moneda</option>
            <option value="USD">Dolar Estadounidense</option>
            <option value="COP">Peso Colombiano</option>
            <option value="MXN">Peso Mexicano</option>
            <option value="GBP">Libras</option>
            <option value="EUR">Euros €</option>
          </select>
        </div>

        <div className="form-group">
          <label>Criptomoneda: </label>
          <select ref={this.cryptoRef} className="form-control">
            {Object.keys( this.props.monedas ).map(key => (
              <OptionSelect 
                key={key}
                moneda={this.props.monedas[key]}
              />
            ))}
          </select>
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-purplegradient" value="Cotizar" />
        </div>
      </form>
    );
  }
};

export default Form;
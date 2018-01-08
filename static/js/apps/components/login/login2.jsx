import React, { Component } from 'react';
import Footer from './../Footer';

const EXREG_RUT = /^(\d{1,2}(\.?\d{3}){2})\-([\dkK])$/;
const CORRECT_CLASS = 'correct';
const INCORRECT_CLASS = 'incorrect';
const NONE_CLASS = 'none';

function isExistRut(rut, availableRut) {
  let newRut = rut.split('.').join("");
  const match = availableRut.filter(data => data.rut === newRut);
  return match.length;
}

function isCorrectPassword(password, pws, rut) {
  return pws
    .filter(data => data.contraseña === password)
    .filter(data => data.rut === rut);
}

class Login2 extends Component {
  constructor(props){
    super(props);
    this.state= {
      rut: {newClass : "none"},
      pass:{newClass : "none"},
      availableRut: []
    }
    this.validarLogin = this.validarLogin.bind(this);
    this.validarRut = this.validarRut.bind(this);
  }

  componentWillMount() {
    $.getJSON('/data-get-all-rut-user', (rutUser) => {
      $.getJSON('/data-get-all-rut-admin', (rutAdmin) => {
        $.getJSON('/data-get-all-rut-teacher', (rutTeacher) => {
        this.setState({ availableRut: [ ...rutTeacher,...rutUser, ...rutAdmin ]});
        })
      })
    });
  }

  validarRut(evt){
    const rut2 = evt.target.value;
    const rut = rut2.split('.').join("");
    const { availableRut } = this.state;
    let newClass = NONE_CLASS;

    if (rut.length && isExistRut(rut, availableRut)) {
      if (EXREG_RUT.test(rut)){
        newClass = CORRECT_CLASS
      };
    };

    if (rut.length) {
      if(!EXREG_RUT.test(rut)){
        newClass = INCORRECT_CLASS;
      }
    }

    this.setState({
      rut: { newClass }
    });
  };

  validarLogin(){
    const pw = this.refs.inputpw.value;
    const rut = this.refs.inputRut.value;
    const pws = this.state.availableRut;

    if (this.state.rut.newClass === CORRECT_CLASS) {
      if (isCorrectPassword(pw, pws, rut).length) {
        if(isCorrectPassword(pw, pws, rut)[0].tipo_usuario === 0){
          window.location.href = `/Admin?rut=${isCorrectPassword(pw, pws, rut)[0].rut}`;
        }
        // PROFESOR
        if(isCorrectPassword(pw, pws, rut)[0].tipo_usuario === 1){

          window.location.href = `/Profesor?rut=${isCorrectPassword(pw, pws, rut)[0].rut}`;
        }

        if(isCorrectPassword(pw, pws, rut)[0].tipo_usuario === 2){
          window.location.href = `/sesion?rut=${isCorrectPassword(pw, pws, rut)[0].rut}`;
        }
      }else{
        alert ('Usuario Incorreco');
      }

    }

  }
  render() {
    return (
      <div>
        <div className="HeadImg head">
        <img src="http://www.inf.jmc.utfsm.cl/wp-content/themes/infjmc-mk2/assets/dist/img/utfsm-pluma-blanca.png" />
          <img src="http://www.inf.jmc.utfsm.cl/wp-content/themes/infjmc-mk2/assets/dist/img/informatica-logo-temp.png" />
        </div>
        <div className="login">
          <h2>Iniciar sesion</h2>
          <input className={this.state.rut.newClass} name="rut" placeholder="Rut Usuario" ref="inputRut" type="text" onChange={(evt) => this.validarRut(evt)}/>
          <input id="pw"  ref="inputpw"  name="password" placeholder="Contraseña" type="password" />

          <input type="submit"  value="Iniciar sesion"  onClick={this.validarLogin}/>

          <a className="forgot" href="#">Olvido su contraseña?</a>
        </div>
        <Footer />
      </div>
    )

  }
};
export default Login2;
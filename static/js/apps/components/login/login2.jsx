import React from 'react';
import Footer from './../Footer';

class Login2 extends React.Component {
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
    const ruts = $.getJSON('/data-get-all-rut')
      .then(data => this.setState({ availableRut: data}));
  }

  validarRut(evt){
    const rut = evt.target.value;
    const validateRut = /^(\d{1,2}(\.?\d{3}){2})\-([\dkK])$/;
    let newClass = 'none';

    if(rut.length) {
      if(validateRut.test(rut)){
        newClass = 'correct';
      } else {
        newClass = 'incorrect';
      }
    }

    this.setState({
      rut: { newClass }
    });
  };

validarLogin(){
  const rut = this.refs.inputRut.value;
  const pw = this.refs.inputpw.value;
  const validateRut = /^(\d{1,2}(\.?\d{3}){2})\-([\dkK])$/;

  if(rut != ""){
    if(validateRut.test(rut)){
     var newRut = rut.split('.').join("");
     this.setState({ rut : {newClass : "dataCorrect"} });
    this.buscarRut(rut);
    }else{
     this.setState({ rut : {newClass : "dataIncorrect"} });
     alert("Rut Incorrecto");
    }
   }else{
    this.setState({ rut : {newClass : "none"} });
    alert("Rut vacio");
   }
   if(pw != ""){
     this.setState({ pass : {newClass : "dataCorrect"} });
   }else{
    this.setState({ pass : {newClass : "none"} });
    alert('pw vacia');
   }
}
  render() {
    return (
      <div>
        <div className="HeadImg head">
          <img src="http://lh-memor.inf.utfsm.cl/wp-content/uploads/2016/01/logo-blog.png" />
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
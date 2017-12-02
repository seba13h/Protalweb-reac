import React from 'react';
import Footer from './../Footer';
import connectio} from './../';

console.log(connection);
class Login2 extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      rut: {newClass : "none"},
      pass:{newClass : "none"}
    }
    this.validarLogin= this.validarLogin.bind(this);
    this.buscarRut = this.buscarRut.bind(this);
  }

buscarRut(rut){
  console.log('hola');
         connection.connect();
              connection.query('SELECT rut_alu from alumno where rut_alu ='+{rut}+' '),function(err, rows, fields) {
                if (!err){ console.log('The solution is: ', rows); }
                else{console.log("error no hay coincidensia" , err)}}
             connection.end();
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
          <input name="rut" placeholder="Rut Usuario" ref="inputRut" type="text" />
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
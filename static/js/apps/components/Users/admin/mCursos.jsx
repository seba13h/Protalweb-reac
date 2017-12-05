import React from 'react';

class mCursos extends React.Component {
constructor(props){
super(props);
this.state= {
nombre:{newClass : "none"},
rut: {newClass : "none"},
pass:{newClass : "none"},
email: {newClass : "none"},
telefono: {newClass : "none"},
contraseña: {newClass : "none"}
}
this.validarAlumno= this.validarAlumno.bind(this);
}

validarAlumno(){
const rut = this.refs.inputRut.value;
const name = this.refs.inputNombre.value;
const pw = this.refs.inputpw.value;
const email = this.refs.inputemail.value;
const phone = this.refs.inputTel.value;

const validateRut = /^(\d{1,2}(\.?\d{3}){2})\-([\dkK])$/;
const validateEmail = /(^[0-9a-zA-Z]+(?:[._][0-9a-zA-Z]+)*)@([0-9a-zA-Z]+(?:[._-][0-9a-zA-Z]+)*\.[0-9a-zA-Z]{2,3})$/;
const validateName = /^[a-zA-Z\-]{2,30}$/;

if(rut != ""){
if(validateRut.test(rut)){
var newRut = rut.split('.').join("");
this.setState({ rut : {newClass : "dataCorrect"} });
}else{
this.setState({ rut : {newClass : "dataIncorrect"} });
alert("rut incorrecto");
}
}else{
this.setState({ rut : {newClass : "none"} });
alert("rut vacio");
}

if(name != ""){
if(validateName.test(name)){
this.setState({ name : {newClass : "dataCorrect"} });
}else{
this.setState({ name : {newClass : "dataIncorrect"} });
alert("nombre incorrecto")
}
}else{
this.setState({ name : {newClass : "none"} });
alert("nombre vacio");
}


if(email != ""){
if(validateEmail.test(email)){
this.setState({ email : {newClass : "dataCorrect"} });
}else{
this.setState({ email : {newClass : "dataIncorrect"} });
alert("email incorrecto");
}
}else{
this.setState({ email : {newClass : "none"} });
alert("email vacio");
}

if(pw != ""){
this.setState({ pass : {newClass : "dataCorrect"} });
}else{
this.setState({ pass : {newClass : "none"} });
alert("pw vacia");
}
if(phone != ""){
this.setState({ phone : {newClass : "dataCorrect"} });
}else{
this.setState({ phone : {newClass : "none"} });
alert("telefono vacio");
}
}
render() {
return (
<div>
  
    <div className="div_titulo">
      <a href="/Admin"> <button id="tc1" className="glyphicon glyphicon-menu-left return"></button></a>
      <h2 className="titulo">MANTENEDOR CURSOS</h2>
    </div>
  <div className="content">
    
    <h1>Listado de cursos</h1>
    <div className="tc11">
      <button id ="tc12" className="btn btn-primary " data-toggle="modal" data-target="#myModal" >
        Agregar Curso
      </button>
      <form>
        <div className="input-group">
          <input id="tc19" type="text" className="form-control" placeholder="Buscar"/>
          <div className="input-group-btn">
            <button className="btn btn-default" type="submit">
              <i className="glyphicon glyphicon-search"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
    <table id="agregar-alumno" className="table table-bordered">
      <thead>
        <tr>
          <th>Codigo Curso</th>
          <th>Carrera</th>
          <th>Acciones</th>
        </tr>
        <td> ..</td>
        <td >..</td>
        <td className="zelect_rut">
          <button className="glyphicon glyphicon-pencil" data-toggle="modal" data-target="#myModal2"></button>
          <button className="glyphicon glyphicon-trash"  data-toggle="modal" data-target="#myModal3"></button>
        </td>
      </thead>
    </table>
  
  </div>

  <div className="modal fade" id="myModal" role="dialog">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">Agregar Curso</h4>
        </div>
        <div className="modal-body">

          <form>
            <div className="form-group">
              Codigo Curso
              <input ref="inputRut" className="form-control" id="cod_curso" />
            </div>
            <div className="form-group">
              Carrera
              <input ref = "inputNombre" type="" className="form-control" id="carrera" />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.validarAlumno}>Aceptar</button>
          </form>

        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
        </div>
      </div> {/* Modal Agregar */}

    </div>
  </div>

  <div className="modal fade" id="myModal2" role="dialog">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">Modificar Profesor</h4>
        </div>
        <div className="modal-body">

          <form>
            <div className="form-group">
              Codigo Curso
              <input ref="inputRut" className="form-control" id="cod_curso" />
            </div>
            <div className="form-group">
              Carrera
              <input ref = "inputNombre" type="" className="form-control" id="carrera" />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.validarAlumno}>Aceptar</button>
          </form>

        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
        </div>
      </div> {/* Modal Modificar */}

    </div>
  </div>

  <div className="modal fade" id="myModal3" role="dialog">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">Eliminar Registro</h4>
        </div>
        <div className="modal-body">

          <p>Seguro que desea eliminar el registro?</p>
          <button type="submit" className="btn btn-primary" onClick={this.validarAlumno}>Aceptar</button>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
        </div>
      </div> {/* Modal Modificar */}

    </div>
  </div>



  

</div>
)
}
};
export default mCursos;
import React from 'react';

class mAlumno extends React.Component {
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
                    <h2 className="titulo">MANTENEDOR ALUMNO</h2>
                    <a href="/Admin"> <button id="tc1" className="glyphicon glyphicon-menu-left return"></button></a>
                </div>
                <aside>
                    <a href="login.php"><button type="button" className="btn btn-default cerrar-sesion" >Cerrar Sesion</button></a>
                </aside>
                <h1>Listado de alumnos</h1>
                <button className="btn btn-primary" data-toggle="modal" data-target="#myModal" >Agregar Alumno</button>

                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">


                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Agregar Alumno</h4>
                            </div>
                            <div className="modal-body">

                                <form>
                                    <div className="form-group">
                                        Rut
                                     <input ref="inputRut" className="form-control" id="rut" />
                                    </div>
                                    <div className="form-group">
                                        Nombre
                                             <input ref = "inputNombre" type="" className="form-control" id="nombre" />
                                    </div>
                                    <div className="form-group">
                                        Email
                                            <input ref = "inputemail" className="form-control" id="email" />
                                    </div>
                                    <div className="form-group">
                                        Telefono
                                    <input ref = "inputTel" className="form-control" id="telefono" />
                                    </div>
                                    <div className="form-group">
                                        Contraseña:
                                          <input ref = "inputpw" className="form-control" id="pwd" />
                                    </div>
                                    <button type="submit" className="btn btn-default" onClick={this.validarAlumno}>Agregar</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>

                    </div>
                </div>

                <button type="button" className="btn btn-danger btn-sm" >
                    <span className="glyphicon glyphicon-remove"></span> Cancelar
                 </button><br /><br />
                <table id="agregar-alumno" className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Curso</th>
                            <th>Rut</th>
                            <th>Acciones</th>
                        </tr>
                        <td> ..</td>
                        <td> ..</td>
                        <td> ..</td>
                        <td >..</td>
                        <td className="zelect_rut">
                            <button className="glyphicon glyphicon-pencil"></button>
                            <button className="glyphicon glyphicon-trash" name="rut"></button>
                        </td>
                    </thead>
                </table>
            </div>
        )
    }
};
export default mAlumno;
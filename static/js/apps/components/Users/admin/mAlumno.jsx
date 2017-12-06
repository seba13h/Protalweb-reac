import React from 'react';
import axios from 'axios';

function getRut() {
  return window.location.search.split('?rut=')[1];
}


class mAlumno extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: { newClass: "none" },
      rut: { newClass: "none" },
      pass: { newClass: "none" },
      email: { newClass: "none" },
      telefono: { newClass: "none" },
      contraseña: { newClass: "none" },
      studentClass: [],
    }
    this.validarAlumno = this.validarAlumno.bind(this);
    this.insertarData = this.insertarData.bind(this);
  }

  componentWillMount() {
    $.getJSON('/data-get-all-user').then(data => this.setState({ studentClass: data }));
  };


  insertarData() {
    const rut = this.refs.inputRut2.value;
    const name = this.refs.inputNombre2.value;
    const pw = this.refs.inputpw4.value;
    const email = this.refs.inputemail2.value;
    const phone = this.refs.inputTel2.value;
    const cod_curso = this.refs.inputCurso2.value;
    const tipo_usuario = 2;
    const dataAlumno = { rut, name, email, phone, pw, cod_curso, tipo_usuario };
    if (this.validarAlumno){
      console.log('aca paso yo' );
      axios.post("/data-insert-user",dataAlumno);
    }
  }

  validarAlumno() {
    const rut = this.refs.inputRut.value;
    const name = this.refs.inputNombre.value;
    const pw = this.refs.inputpw.value;
    const email = this.refs.inputemail.value;
    const phone = this.refs.inputTel.value;
    const pw2 = this.refs.inputpw2.value;

    const validateRut = /^(\d{1,2}(\.?\d{3}){2})\-([\dkK])$/;
    const validateEmail = /(^[0-9a-zA-Z]+(?:[._][0-9a-zA-Z]+)*)@([0-9a-zA-Z]+(?:[._-][0-9a-zA-Z]+)*\.[0-9a-zA-Z]{2,3})$/;
    const validateName = /^[a-zA-Z\-]{2,30}$/;

    if (rut != "") {
      if (validateRut.test(rut)) {
        var newRut = rut.split('.').join("");
        this.setState({ rut: { newClass: "dataCorrect" } });
      } else {
        this.setState({ rut: { newClass: "dataIncorrect" } });
        alert("rut incorrecto");
      }
    } else {
      this.setState({ rut: { newClass: "none" } });
      alert("rut vacio");
    }

    if (name != "") {
      if (validateName.test(name)) {
        this.setState({ name: { newClass: "dataCorrect" } });
      } else {
        this.setState({ name: { newClass: "dataIncorrect" } });
        alert("nombre incorrecto")
      }
    } else {
      this.setState({ name: { newClass: "none" } });
      alert("nombre vacio");
    }
    if (email != "") {
      if (validateEmail.test(email)) {
        this.setState({ email: { newClass: "dataCorrect" } });
      } else {
        this.setState({ email: { newClass: "dataIncorrect" } });
        alert("email incorrecto");
        return false;
      }
    } else {
      this.setState({ email: { newClass: "none" } });
      alert("email vacio");
    }

    if (pw != "") {
      this.setState({ pass: { newClass: "dataCorrect" } });
    } else {
      this.setState({ pass: { newClass: "none" } });
      alert("pw vacia");
    }
    if (phone != "") {
      this.setState({ phone: { newClass: "dataCorrect" } });
    } else {
      this.setState({ phone: { newClass: "none" } });
      alert("telefono vacio");

    }
    return true;
  }
  render() {
    const rutaMenu = `/Admin?rut=${getRut()}`;
    const lista = this.state.studentClass.map((data, index) =>
      <tr>
        <td>{data.rut_alu}</td>
        <td>{data.nom_alu}</td>
        <td>{data.email}</td>
        <td>{data.cod_curso}</td>
        <td>{data.telefono}</td>
        <td className="zelect_rut">
          <button className="glyphicon glyphicon-pencil" data-toggle="modal" data-target="#myModal2"></button>
          <button className="glyphicon glyphicon-trash" data-toggle="modal" data-target="#myModal3"></button>
        </td>
      </tr>);

    return (
      <div>

        <div className="div_titulo">
          <a href={rutaMenu}> <button id="tc1" className="glyphicon glyphicon-menu-left return"></button></a>
          <h2 className="titulo">MANTENEDOR ALUMNO</h2>
        </div>
        <div className="content">

          <h1>Listado de alumnos</h1>
          <div className="tc11">
            <button id="tc12" className="btn btn-primary " data-toggle="modal" data-target="#myModal" >
              Agregar Alumno
      </button>
            <form>
              <div className="input-group">
                <input id="tc19" type="text" className="form-control" placeholder="Buscar" />
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
                <th>Rut</th>
                <th>Nombres</th>
                <th>Email</th>
                <th>Curso</th>
                <th>Telefono</th>
                <th>Acciones</th>
              </tr>

              {lista}
            </thead>
          </table>

        </div>

        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Agregar Alumno</h4>
              </div>
              <div className="modal-body">

                <form  >
                  <div className="form-group">
                    Rut
              <input ref="inputRut2" className="form-control" id="rut" />
                  </div>
                  <div className="form-group">
                    Nombre
              <input ref="inputNombre2" type="" className="form-control" id="nombre" />
                  </div>
                  <div className="form-group">
                    Email
              <input ref="inputemail2" className="form-control" id="email" />
                  </div>
                  <div className="form-group">
                    Telefono
              <input ref="inputTel2" className="form-control" id="telefono" />
                  </div>
                  <div className="form-group">
                    Curso
              <input ref="inputCurso2" className="form-control" id="curso" />
                  </div>
                  <div className="form-group">
                    Contraseña:
              <input ref="inputpw4" className="form-control" id="pwd" />
                  </div>
                  <div className="form-group">
                    Repita Contraseña:
              <input ref="inputpw5" className="form-control" id="pwd2" />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={this.insertarData}>Aceptar</button>
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
                <h4 className="modal-title">Modificar Alumno</h4>
              </div>
              <div className="modal-body">

                <form>
                  <div className="form-group">
                    Rut
              <input ref="inputRut" className="form-control" id="rut" />
                  </div>
                  <div className="form-group">
                    Nombre
              <input ref="inputNombre" type="" className="form-control" id="nombre" />
                  </div>
                  <div className="form-group">
                    Email
              <input ref="inputemail" className="form-control" id="email" />
                  </div>
                  <div className="form-group">
                    Telefono
              <input ref="inputTel" className="form-control" id="telefono" />
                  </div>
                  <div className="form-group">
                    Contraseña:
              <input ref="inputpw" className="form-control" id="pwd" />
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={this.insertarData}>Aceptar</button>
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
export default mAlumno;
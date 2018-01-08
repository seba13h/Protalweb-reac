import React from 'react';
import axios from 'axios';

function getRut() {
  return window.location.search.split('?rut=')[1];
}

class mProfesor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: { newClass: "none" },
      rut: { newClass: "none" },
      pass: { newClass: "none" },
      email: { newClass: "none" },
      telefono: { newClass: "none" },
      contraseña: { newClass: "none" },
      teacherClass: [],
      search: '',
      dataA:{}
    }
    this.insertarData = this.insertarData.bind(this);
    this.validarProfesor = this.validarProfesor.bind(this);
    this.DeleteData = this.DeleteData.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.actualizarData = this.actualizarData.bind(this);
    this.addComponentModal = this.addComponentModal.bind(this);
    this.validarAlumno2 = this.validarAlumno2.bind(this);
    this.Buscar = this.Buscar.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    $.getJSON('/data-get-all-teacher').then(data => this.setState({ teacherClass: data }));
  };
  DeleteData(index){
    this.setState( {dataA : this.state.teacherClass[index]});
  };

 eliminar(){
  axios.post("/data-delete-teacher", this.state.dataA);
  window.location.reload();
 }
 

 addComponentModal(index){
   console.log()
   this.setState({
      rut: this.state.teacherClass[index].rut_prof,
      nombre: this.state.teacherClass[index].nom_prof,
      pass: this.state.teacherClass[index].contraseña,
      email: this.state.teacherClass[index].email,
      telefono: this.state.teacherClass[index].telefono
  });
 }
 actualizarData() {

  
  const rut = this.refs.inputrut.value;
  const name = this.refs.inputnombre.value;
  const pw = this.refs.inputpw.value;
  const email = this.refs.inputemail.value;
  const phone = this.refs.inputtel.value;
  const tipo_usuario = 1;
  const dataAlumno = { rut, name, email, phone, pw, tipo_usuario };
  axios.post("/data-update-teacherr", dataAlumno);
  window.location.reload();
}
validarAlumno2() {
  
   const rut = this.refs.inputrut.value;
  const name = this.refs.inputnombre.value;
   const pw = this.refs.inputpw.value;
   const email = this.refs.inputemail.value;
   const phone = this.refs.inputtel.value;
   const pw2 = this.refs.inputpw2.value;
  const validateRut = /^(\d{1,2}(\.?\d{3}){2})\-([\dkK])$/;
  const validateEmail = /(^[0-9a-zA-Z]+(?:[._][0-9a-zA-Z]+)*)@([0-9a-zA-Z]+(?:[._-][0-9a-zA-Z]+)*\.[0-9a-zA-Z]{2,3})$/;

  if (rut != "") {
    if (validateRut.test(rut)) {
      var newRut = rut.split('.').join("");  
    } else { 
      alert("rut incorrecto");
      return false;
    }
  } else {
    alert("rut vacio");
    return false;
  }
  if (name != "") {
  }
  else {
    alert("nombre vacio");
    return false;
  }
  if (email != "") {
    if (validateEmail.test(email)) {
    } else {
      alert("email incorrecto");
      return false;
    }
  } else {
    alert("email vacio");
    return false;
  }
  if (phone != "") {   
  } else {
    alert("telefono vacio");
    return false;
  }
  if (pw != "" && pw2 != "") {
    if (pw === pw2) { 
    } else {
      alert('No coinciden las claves');
      return false;
    }
   } else {
    
    alert('Ingrese ambas contraseñas');
    return false;
  }
  alert('Modificando Profesor');
  this.actualizarData();

}

  insertarData() {
    console.log("entre");
    const rut = this.refs.inputRut2.value;
    const name = this.refs.inputNombre2.value;
    const pw = this.refs.inputpw4.value;
    const email = this.refs.inputemail2.value;
    const phone = this.refs.inputTel2.value;
    const tipo_usuario = 1;
    const dataAlumno = { rut, name, email, phone, pw, tipo_usuario };
    axios.post('/data-insert-teacher', dataAlumno);
    window.location.reload();
  }

  validarProfesor() {
    
     const rut = this.refs.inputRut2.value;
    const name = this.refs.inputNombre2.value;
    const pw = this.refs.inputpw4.value;
    const pw2 = this.refs.inputpw5.value;
    const email = this.refs.inputemail2.value;
    const phone = this.refs.inputTel2.value;

    const validateRut = /^(\d{1,2}(\.?\d{3}){2})\-([\dkK])$/;
    const validateEmail = /(^[0-9a-zA-Z]+(?:[._][0-9a-zA-Z]+)*)@([0-9a-zA-Z]+(?:[._-][0-9a-zA-Z]+)*\.[0-9a-zA-Z]{2,3})$/;

    if (rut != "") {
      if (validateRut.test(rut)) {
        var newRut = rut.split('.').join("");
        this.setState({ rut: { newClass: "dataCorrect" } });
      } else {
        this.setState({ rut: { newClass: "dataIncorrect" } });
        alert("rut incorrecto");
        return false;
      }
    } else {
      this.setState({ rut: { newClass: "none" } });
      alert("rut vacio");
      return false;
    }

    if (name != "") {
      this.setState({ name: { newClass: "dataCorrect" } });
    }
    else {
      this.setState({ name: { newClass: "none" } });
      alert("nombre vacio");
      return false;
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
      return false;
    }
    if (phone != "") {
      this.setState({ phone: { newClass: "dataCorrect" } });
    } else {
      this.setState({ phone: { newClass: "none" } });
      alert("telefono vacio");
      return false;
    }
    if (pw != "" && pw2 != "") {
      if (pw === pw2) {
        this.setState({ pasword: { newClass: "dataCorrect" } });
      } else {
        this.setState({ pasword: { newClass: "dataIncorrect" } });
        alert('No coinciden las claves');
        return false;
      }
    } else {
      this.setState({ pasword: { newClass: "none" } });
      alert('Ingrese ambas contraseñas');
      return false;
    }
    alert('Insertando Profesor');
    this.insertarData();
  };

  Buscar(event) {
    event.preventDefault();
    this.setState({search: this.refs.inputSearch.value});
  }

  profesoresFiltrados() {
    let search = this.state.search.toLowerCase();
    return this.state.teacherClass.filter((profesor) => {
      if(this.state.search === '') {
        return true;
      } else { 
        return profesor.rut_prof.toLowerCase().indexOf(search) >= 0 || profesor.nom_prof.toLowerCase().indexOf(search) >= 0;
      }
    });
  }
  handleInputChange(event){
    console.log(event)
    var inputName = event.target.name;
    var inputValue = event.target.value;
    this.setState({[inputName]:inputValue});
  }

  render() {
    const rutaMenu = `/Admin?rut=${getRut()}`;
    const lista = this.profesoresFiltrados().map((data, index) =>
      <tr>
        <td>{data.rut_prof}</td>
        <td>{data.nom_prof}</td>
        <td>{data.email}</td>
        <td>{data.telefono}</td>
        <td hidden>{data.contraseña}</td>
        <td className="zelect_rut">
          <button className="glyphicon glyphicon-pencil" data-toggle="modal" data-target="#myModal2" onClick={() => this.addComponentModal(index) }></button>
          <button className="glyphicon glyphicon-trash" data-toggle="modal" data-target="#myModal3" onClick={() => this.DeleteData(index) }></button>
        </td>
      </tr>);

    return (
      <div>

        <div className="div_titulo">
          <a href={rutaMenu}> <button id="tc1" className="glyphicon glyphicon-menu-left return"></button></a>
          <h2 className="titulo">MANTENEDOR PROFESOR</h2>
        </div>
        <div className="content">

          <h1>Listado de profesores</h1>
          <div className="tc11">
            <button id="tc12" className="btn btn-primary " data-toggle="modal" data-target="#myModal" >
              Agregar Profesor
      </button>
            <form onSubmit={this.Buscar}>
              <div className="input-group">
                <input id="tc19" type="text" className="form-control" placeholder="Buscar" ref="inputSearch"/>
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
                <h4 className="modal-title">Agregar Profesor</h4>
              </div>
              <div className="modal-body">

                <form>
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
                    Contraseña:
              <input ref="inputpw4"type="password" className="form-control" id="pwd" />
                  </div>
                  <div className="form-group">
                    Repita Contraseña:
              <input ref="inputpw5" type="password" className="form-control" id="pwd2" />
                  </div>
                  <button type="button" className="btn btn-primary" onClick= {this.validarProfesor}>Aceptar</button>
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
                    Rut
              <input ref="inputrut" className="form-control"  disabled value={this.state.rut} />
                  </div>
                  <div className="form-group">
                    Nombre
              <input ref="inputnombre" name="nombre" className="form-control"  value={this.state.nombre} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    Email
              <input ref="inputemail" name="email" className="form-control"  value={this.state.email} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    Telefono
              <input ref="inputtel" name="telefono" className="form-control"  value={this.state.telefono} onChange={this.handleInputChange}  />
                  </div>
                  <div className="form-group">
                    Contraseña:
              <input ref="inputpw" name="pass" type="password" className="form-control" value={this.state.pass} onChange={this.handleInputChange}  />
                  </div>
                  <div className="form-group">
                    Repita Contraseña:
              <input ref="inputpw2" type="password" className="form-control"  value={this.state.pass} />
                  </div>

                  <button type="button" className="btn btn-primary" onClick={this.validarAlumno2}>Aceptar</button>
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
                <button type="submit" className="btn btn-primary"  onClick={this.eliminar}>Aceptar</button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
};
export default mProfesor;
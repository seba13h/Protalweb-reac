import React from 'react';
import axios from 'axios';

function getRut() {
  return window.location.search.split('?rut=')[1];
}

class mRamos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: { newClass: "none" },
      rut: { newClass: "none" },
      codRamo: { newClass: "none" },
      codCurso: { newClass: "none" },
      ramosClass: [],
      rutProf: [],
      search: '',
      dataA:[]
    }
    this.validarRamo = this.validarRamo.bind(this);
    this.profExist = this.profExist.bind(this);
    this.insertarData = this.insertarData.bind(this);
    this.DeleteData = this.DeleteData.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.addComponentModal = this.addComponentModal.bind(this);
    this.Buscar = this.Buscar.bind(this);
    this.actualizarData = this.actualizarData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
 

  componentWillMount() {
    $.getJSON('/data-get-all-ramo').then(data => this.setState({ ramosClass: data }));
    $.getJSON('/data-get-all-rut-teacher').then(data => this.setState({ rutProf: data }));
  };
  DeleteData(index){
    this.setState( {dataA : this.state.ramosClass[index]});
  };

 eliminar(){
  axios.post("/data-delete-ramo", this.state.dataA);
  window.location.reload();
 }
 addComponentModal(index){
  console.log(this.state.ramosClass[index]);
  this.setState({
     rut: this.state.ramosClass[index].rut_prof,
     codRamo: this.state.ramosClass[index].cod_ramo,
     codCurso: this.state.ramosClass[index].cod_curso,
     nombre: this.state.ramosClass[index].nom_ramo,
 });
}
  
   actualizarData() {
    alert(this.refs.inputNombre.value);
    const rut = this.refs.inputRut.value;
    const name = this.refs.inputNombre.value;
    const ramo = this.refs.inputRamo.value;
    const curso = this.refs.inputCurso.value;
    const dataRamo = { rut, name, ramo, curso };
    axios.post("/data-update-user", dataAlumno);
    window.location.reload();
  }

  
  profExist(rut) {
    const newRut = this.state.rutProf.filter(data => data.rut === rut);
    if (newRut != "") {
      return true;
    } else {
      alert("Profesor no existe");
      return false;
    };
  }
  insertarData() {
    console.log("entre");
    const rut = this.refs.inputRut2.value;
    const name = this.refs.inputNombre2.value;
    const ramo = this.refs.inputRamo2.value;
    const curso = this.refs.inputCurso2.value;
    const dataRamo = { rut, name, ramo, curso };
    axios.post('/data-insert-ramo', dataRamo);
    window.location.reload();
  }

  validarRamo() {
    const rut = this.refs.inputRut2.value;
    const name = this.refs.inputNombre2.value;
    const ramo = this.refs.inputRamo2.value;
    const curso = this.refs.inputCurso2.value;
    const validateRut = /^(\d{1,2}(\.?\d{3}){2})\-([\dkK])$/;

    if (rut != "") {
      if ((validateRut.test(rut)) && (this.profExist(rut))) {
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
    if (ramo != "") {
      this.setState({ codRamo: { newClass: "dataCorrect" } });
    }
    else {
      this.setState({ codRamo: { newClass: "none" } });
      alert("codigo del ramo vacio");
      return false;
    }
    alert('Insertando Ramo');
    this.insertarData();
  }

  validarRamo2() {
    const rut = this.refs.inputRut.value;
    const name = this.refs.inputNombre.value;
    const ramo = this.refs.inputRamo.value;
    const curso = this.refs.inputCurso.value;
    const validateRut = /^(\d{1,2}(\.?\d{3}){2})\-([\dkK])$/;

    if (rut != "") {
      if ((validateRut.test(rut)) && (this.profExist(rut))) {
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
    if (ramo != "") {
      this.setState({ codRamo: { newClass: "dataCorrect" } });
    }
    else {
      this.setState({ codRamo: { newClass: "none" } });
      alert("codigo del ramo vacio");
      return false;
    }
    alert('Modificando Ramo');
    this.actualizarData();
  }

 handleInputChange(event){
    console.log(event)
    var inputName = event.target.name;
    var inputValue = event.target.value;
    this.setState({[inputName]:inputValue});
  }

  Buscar(event) {
    event.preventDefault();
    this.setState({search: this.refs.inputSearch.value});
  }

  ramosFiltrados() {
    let search = this.state.search.toLowerCase();
    return this.state.ramosClass.filter((ramo) => {
      if(this.state.search === '') {
        return true;
      } else { 
        return ramo.cod_ramo.toLowerCase().indexOf(search) >= 0 || ramo.nom_ramo.toLowerCase().indexOf(search) >= 0;
      }
    });
  }

  render() {
    const rutaMenu = `/Admin?rut=${getRut()}`;
    const lista = this.ramosFiltrados().map((data, index) =>
      <tr>
        <td>{data.cod_ramo}</td>
        <td>{data.nom_ramo}</td>
        <td>{data.rut_prof}</td>
        <td hidden>{data.cod_curso}</td>
        <td className="zelect_rut">
          <button className="glyphicon glyphicon-pencil" data-toggle="modal" data-target="#myModal2" onClick={() => this.addComponentModal(index) }></button>
          <button className="glyphicon glyphicon-trash" data-toggle="modal" data-target="#myModal3" onClick={() => this.DeleteData(index) }></button>
        </td>
      </tr>);

    return (
      <div>

        <div className="div_titulo">
          <a href={rutaMenu}> <button id="tc1" className="glyphicon glyphicon-menu-left return"></button></a>
          <h2 className="titulo">MANTENEDOR RAMOS</h2>
        </div>
        <div className="content">

          <h1>Listado de ramos</h1>
          <div className="tc11">
            <button id="tc12" className="btn btn-primary " data-toggle="modal" data-target="#myModal" >
              Agregar Ramo
      </button>
            <form onSubmit={this.Buscar}>
              <div className="input-group">
                <input id="tc19" type="text" className="form-control" placeholder="Buscar" ref="inputSearch" />
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
                <th>Cod Ramo</th>
                <th>Nombre Ramo</th>
                <th>Rut Profesor</th>
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
                <h4 className="modal-title">Agregar Ramo</h4>
              </div>
              <div className="modal-body">

                <form>

                  <div className="form-group">
                    Codigo Ramo
              <input ref="inputRamo2" className="form-control" id="cod_ramo" />
                  </div>
                  <div className="form-group">
                    Nombre Ramo
              <input ref="inputNombre2" className="form-control" id="nom_ramo" />
                  </div>
                  <div className="form-group">
                    Rut Profesor
              <input ref="inputRut2" type="" className="form-control" id="rut_prof" />
                  </div>
                  <div className="form-group">
                    Curso
                    <select className="form-control" ref="inputCurso2" >
                      <option>192-A</option>
                      <option>192-B</option>
                      <option>292-A</option>
                      <option>292-B</option>
                      <option>329-A</option>
                      <option>329-B</option>
                    </select>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={this.validarRamo}>Aceptar</button>
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
                <h4 className="modal-title">Modificar Ramo</h4>
              </div>
              <div className="modal-body">

                <form>

                  <div className="form-group">
                    Codigo Ramo
              <input ref="inputRamo" className="form-control" id="cod_ramo"  disabled value={this.state.codRamo} />
                  </div>
                  <div className="form-group">
                    Nombre Ramo
              <input ref="inputNombre" name="nombre" className="form-control" id="nom_ramo" value = {this.state.nombre} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    Rut Profesor
              <input ref="inputProfesor" name="rut" type="" className="form-control" id="rut_prof" value = {this.state.rut} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    Curso
            <select className="form-control" ref="inputCurso" >
                      <option>192-A</option>
                      <option>192-B</option>
                      <option>292-A</option>
                      <option>292-B</option>
                      <option>329-A</option>
                      <option>329-B</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={this.validarRamo2}>Aceptar</button>
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
                <button type="submit" className="btn btn-primary" onClick={this.eliminar}>Aceptar</button>
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
export default mRamos;
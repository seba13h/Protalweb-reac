import React from 'react';
import axios from 'axios';
function getRut() {
  return window.location.search.split('?rut=')[1];
}

class mCursos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: { newClass: "none" },
      rut: { newClass: "none" },
      cod_curso: { newClass: "none" },
      carrera: { newClass: "none" },
      cursoClass: [],
      search: '',
      dataA: [],
      ramo:'',
      prueba:'',
      horario:''
    }

    this.validarCurso = this.validarCurso.bind(this);
    this.validarCurso2 = this.validarCurso2.bind(this);
    this.addComponentModal = this.addComponentModal.bind(this);
    this.insertarData = this.insertarData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.actualizarData = this.actualizarData.bind(this);
    this.DeleteData = this.DeleteData.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.Buscar = this.Buscar.bind(this);
    this.cursoExist = this.cursoExist.bind(this);
  }
  cursoExist(curso){
    const curs = this.state.cursoClass.filter(data => data.cod_curso === curso);
    if (curs != ""){
      alert("cod curso ya existe");
      return false;
    }else{
      return true;
    }

}

  componentWillMount() {
    $.getJSON('/data-get-all-curso').then(data => this.setState({ cursoClass: data }));
    $.getJSON('/data-get-all-ramo').then(data => this.setState({ ramo: data }));
    $.getJSON('/data-get-all-quest').then(data => this.setState({ prueba: data }));
    $.getJSON('/data-get-all-horario').then(data => this.setState({ horario: data }));

  };

  DeleteData(index) {
    this.setState({ dataA: this.state.cursoClass[index] });
  };
  eliminar() {
    const cod = this.state.dataA.cod_curso;
    const ramos =this.state.ramo.filter(data => data.cod_curso === cod );
    const pruebas =this.state.prueba.filter(data => data.cod_curso === cod);
    const horarios =this.state.horario.filter(data => data.cod_curso === cod);

    let aviso = '';

    if (ramos !=''){
      aviso = (aviso + '   ramos')
    }
    if (pruebas !=''){
     aviso = (aviso+' - '+'  pruebas'+' ');
   }
   if (horarios !=''){
    aviso = (aviso+' - '+'  bloque de horario '+' ');
  }
   if (aviso != ''){
         alert('El curso no puede eliminarse por que tiene'+ aviso +'registrados');
   }else{
    axios.post("/data-delete-curso", this.state.dataA);
    window.location.reload();
   }
  }
  actualizarData() {


    const cod_curso = this.refs.inputCurso2.value;
    const carrera = this.refs.inputCarrera2.value;
    const dataCurso = { cod_curso, carrera };
    axios.post("/data-update-curso", dataCurso);
    window.location.reload();
  }

  insertarData() {

    const cod_curso = this.refs.inputCurso.value;
    const carrera = this.refs.inputCarrera.value;
    const dataCurso = { cod_curso, carrera };

    axios.post('/data-insert-curso', dataCurso);
    window.location.reload();
  }

  validarCurso() {
    const curso = this.refs.inputCurso.value;
    const name = this.refs.inputCarrera.value;


    if (curso != "" && this.cursoExist(curso)) {
    } else {
      alert("ingrese un cod curso valido");
      return false;
    }
    if (name != "") {
    } else {
      alert("carrera vacia");
      return false;
    }
    alert('Insertando curso');
    this.insertarData();
  }

  validarCurso2() {
    const rut = this.refs.inputCurso2.value;
    const name = this.refs.inputCarrera2.value;


    if (rut != "") {
    } else {
      alert(rut);
      alert("cod curso vacio");
      return false;
    }
    if (name != "") {
    } else {
      alert("carrera vacia");
      return false;
    }
    alert('Actualizando Curso');
    this.actualizarData();
  }

  handleInputChange(event) {
    console.log(event)
    var inputName = event.target.name;
    var inputValue = event.target.value;
    this.setState({ [inputName]: inputValue });
  }

  indice() {
    $("tr").each(function () {
      $(this).children().each(function () {
        var n = $(this).parent().index();
        $(this).attr('id', 'person' + n);
      });
    });
  }

  addComponentModal(index) {
    console.log()
    this.setState({
      cod_curso: this.state.cursoClass[index].cod_curso,
      carrera: this.state.cursoClass[index].carrera
    });
  }


  Buscar(event) {
    event.preventDefault();
    this.setState({ search: this.refs.inputSearch.value });
  }

  cursosFiltrados() {
    let search = this.state.search.toLowerCase();
    return this.state.cursoClass.filter((curso) => {
      if (this.state.search === '') {
        return true;
      } else {
        return curso.cod_curso.toLowerCase().indexOf(search) >= 0 || curso.carrera.toLowerCase().indexOf(search) >= 0;
      }
    });
  }


  render() {

    const rutaMenu = `/Admin?rut=${getRut()}`;
    const lista = this.cursosFiltrados().map((data, index) =>
      <tr className="indicex">
        <td>{data.cod_curso}</td>
        <td>{data.carrera}</td>
        <td className="zelect_rut">
          <button className="glyphicon glyphicon-pencil" data-toggle="modal" data-target="#myModal2" onClick={() => this.addComponentModal(index)}></button>
          <button className="glyphicon glyphicon-trash" data-toggle="modal" data-target="#myModal3" onClick={() => this.DeleteData(index)}></button>
        </td>
      </tr>);

    return (
      <div>

        <div className="div_titulo">
          <a href={rutaMenu}> <button id="tc1" className="glyphicon glyphicon-menu-left return"></button></a>
          <h2 className="titulo">MANTENEDOR CURSOS</h2>
        </div>
        <div className="content">
          {/*// <button type="submit" className="btn btn-primary" onClick={this.indice()}>Aceptar</button> */}
          <h1>Listado de cursos</h1>
          <div className="tc11">
            <button id="tc12" className="btn btn-primary " data-toggle="modal" data-target="#myModal" >
              Agregar Curso
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
                <th>Codigo Curso</th>
                <th>Carrera</th>
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
                <h4 className="modal-title">Agregar Curso</h4>
              </div>
              <div className="modal-body">

                <form>
                  <div className="form-group">
                    Codigo Curso
              <input ref="inputCurso" className="form-control" id="cod_curso" />
                  </div>
                  <div className="form-group">
                    Carrera
              <input ref="inputCarrera" type="" className="form-control" id="carrera" />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={this.validarCurso}>Aceptar</button>
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
              <input ref="inputCurso2" name="cod_curso" disabled className="form-control" id="cod_curso" value={this.state.cod_curso} />
                  </div>
                  <div className="form-group">
                    Carrera
              <input ref="inputCarrera2" name="carrera" className="form-control" id="carrera" value={this.state.carrera} onChange={this.handleInputChange} />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={this.validarCurso2}>Aceptar</button>
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
export default mCursos;
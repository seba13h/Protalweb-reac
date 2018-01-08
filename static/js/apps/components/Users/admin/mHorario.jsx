import React from 'react';
import axios from 'axios';

function getRut() {
  return window.location.search.split('?rut=')[1];
}

class mProfesor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CodCurso: { newClass: "none" },
      CodRamo: { newClass: "none" },
      Sala: { newClass: "none" },
      Dia: { newClass: "none" },
      Bloque: { newClass: "none" },
      Hora: { newClass: "none" },
      horarioClass: [],
      ramosClass:[],
      search: '',
      dataA:[]
    }

    this.validarHorario = this.validarHorario.bind(this);
     this.validarHorario2 = this.validarHorario2.bind(this);
    this.ramoExist = this.ramoExist.bind(this);
    this.insertarData = this.insertarData.bind(this);
    this.DeleteData = this.DeleteData.bind(this); 
    this.eliminar = this.eliminar.bind(this);
     this.Buscar = this.Buscar.bind(this);
     this.actualizarData = this.actualizarData.bind(this);
    this.addComponentModal = this.addComponentModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }
 addComponentModal(index){
   
   this.setState({
      CodCurso: this.state.horarioClass[index].cod_curso,
      CodRamo: this.state.horarioClass[index].cod_ramo,
      Sala: this.state.horarioClass[index].sala_clases,
      Dia: this.state.horarioClass[index].dia,
      Bloque: this.state.horarioClass[index].num_bloque,
      Hora: this.state.horarioClass[index].hora,
      
  });

 }

 handleInputChange(event){
    console.log(event);
    var inputName = event.target.name;
    var inputValue = event.target.value;
    this.setState({[inputName]:inputValue});
  }

 validarHorario2() {
    const codCurso = this.refs.inputcurso.value;
    const codRamo = this.refs.inputramo.value;
    const sala = this.refs.inputsala.value;
    const dia = this.refs.inputdia.value;
    const bloque = this.refs.inputbloque.value;
    const hora = this.refs.inputhora.value;
    if ((codRamo != "") && (this.ramoExist(codRamo))) {
      
    } else {
      
      return false;
    }
    if (sala != "") {
      
    } else {
 
      alert("Sala de clases vacia");
      return false;
    }

  if (hora != "") {
    
  } else {
    alert("Hora vacia");
    return false;
  }
  alert('Modificando Bloque de Horario');
  this.actualizarData();
}

  componentWillMount() {
    $.getJSON('/data-get-all-horario').then(data => this.setState({ horarioClass: data }));
    $.getJSON('/data-get-all-ramo').then(data => this.setState({ ramosClass: data }));
  };
  DeleteData(index){
    this.setState( {dataA : this.state.horarioClass[index]});
  };

 eliminar(){
   console.log(this.state.dataA);
  axios.post("/data-delete-horario", this.state.dataA);
  window.location.reload();
 }


  ramoExist(codRamo) {
    console.log(codRamo);
    const newRamo = this.state.ramosClass.filter(data => data.cod_ramo === codRamo);
    console.log(newRamo);
    if (newRamo != "") {
      return true;
    } else {
      alert("Ramo no existe");
      return false;
    };
  }
  insertarData() {
    console.log("entre");
    const codCurso = this.refs.inputcurso2.value;
    const codRamo = this.refs.inputramo2.value;
    const sala = this.refs.inputsala2.value;
    const dia = this.refs.inputdia2.value;
    const bloque = this.refs.inputbloque2.value;
    const hora = this.refs.inputhora2.value;
    const dataHorario = { codCurso, dia, bloque, sala, hora, codRamo };
    axios.post('/data-insert-Horario', dataHorario);
    window.location.reload();
  }
  actualizarData() {
    
    const cod_curso = this.refs.inputcurso.value;
    const dia = this.refs.inputdia.value;
    const bloque = this.refs.inputbloque.value;
    const sala_clases = this.refs.inputsala.value;
    const hora = this.refs.inputhora.value;
    const cod_ramo = this.refs.inputramo.value;
        const dataAlumno = { cod_curso,dia, bloque, sala_clases, hora, cod_ramo};
    axios.post("/data-update-horario", dataAlumno);
    window.location.reload();
  }

  validarHorario() {
    const codCurso = this.refs.inputcurso2.value;
    const codRamo = this.refs.inputramo2.value;
    const sala = this.refs.inputsala2.value;
    const dia = this.refs.inputdia2.value;
    const bloque = this.refs.inputbloque2.value;
    const hora = this.refs.inputhora2.value;
    if ((codRamo != "") && (this.ramoExist(codRamo))) {
      this.setState({CodRamo : { newClass: "dataCorrect" } });
    } else {
      this.setState({ CodRamo: { newClass: "none" } });
      return false;
    }
    if (sala != "") {
      this.setState({ Sala: { newClass: "dataCorrect" } });
    } else {
      this.setState({Sala: { newClass: "none" } });
      alert("Sala de clases vacia");
      return false;
    }

  if (hora != "") {
    this.setState({ Hora: { newClass: "dataCorrect" } });
  } else {
    this.setState({Hora: { newClass: "none" } });
    alert("Hora vacia");
    return false;
  }
  alert('Insertando Bloque de Horario');
  this.insertarData();
}

  Buscar(event) {
    event.preventDefault();
    this.setState({search: this.refs.inputSearch.value});
  }

  horariosFiltrados() {
    let search = this.state.search.toLowerCase();
    return this.state.horarioClass.filter((horario) => {
      if(this.state.search === '') {
        return true;
      } else { 
        return horario.cod_curso.toLowerCase().indexOf(search) >= 0 || horario.cod_ramo.toLowerCase().indexOf(search) >= 0;
      }
    });
  }


  render() {
    const rutaMenu = `/Admin?rut=${getRut()}`;
    const lista = this.horariosFiltrados().map((data, index) =>
      <tr>
        <td>{data.cod_curso}</td>
        <td>{data.cod_ramo}</td>
        <td>{data.sala_clases}</td>
        <td>{data.dia}</td>
        <td>{data.num_bloque}</td>
        <td>{data.hora}</td>
        <td className="zelect_rut">
          <button className="glyphicon glyphicon-pencil" data-toggle="modal" data-target="#myModal2" onClick={() => this.addComponentModal(index) }></button>
          <button className="glyphicon glyphicon-trash" data-toggle="modal" data-target="#myModal3" onClick={() => this.DeleteData(index) }></button>
        </td>
      </tr>);

    return (
      <div>
        <div className="div_titulo">
          <a href={rutaMenu}> <button id="tc1" className="glyphicon glyphicon-menu-left return"></button></a>
          <h2 className="titulo">MANTENEDOR HORARIO</h2>
        </div>
        <div className="content">
          <h1>Listado de horarios</h1>
          <div className="tc11">
            <button id="tc12" className="btn btn-primary " data-toggle="modal" data-target="#myModal" >
              Agregar Horario
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
                <th>Codigo Ramo</th>
                <th>Sala</th>
                <th>Dia </th>
                <th>Bloque </th>
                <th>Hora</th>
                <th>Accion </th>
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
                <h4 className="modal-title">Agregar Horario</h4>
              </div>
              <div className="modal-body">

                <form>
                <div className="form-group">
                    Curso
                    <select className="form-control" ref="inputcurso2" >
                      <option>192-A</option>
                      <option>192-B</option>
                      <option>292-A</option>
                      <option>292-B</option>
                      <option>329-A</option>
                      <option>329-B</option>
                    </select>
                  </div>
                  <div className="form-group">
                    Dia
                    <select className="form-control" ref="inputdia2" >
                      <option>LUNES</option>
                      <option>MARTES</option>
                      <option>MIERCOLES</option>
                      <option>JUEVES</option>
                      <option>VIERNES</option>
                      <option>SABADO</option>
                    </select>
                  </div>
                  <div className="form-group">
                    Num Bloque
                    <input className="form-control" ref="inputbloque2" type="number" min="1" max="18">
                      

                    </input>
                  </div>
                  <div className="form-group">
                    Sala de Clases
              <input ref="inputsala2" className="form-control" id="sala_clase" />
                  </div>
                  <div className="form-group">
                    Hora
                       <input ref="inputhora2" type="time" className="form-control" id="hora" />
                  </div>
                  <div className="form-group">
                    Codigo Ramo
              <input ref="inputramo2" className="form-control" id="cod_ramo" />
                  </div>
                  <button type="button" className="btn btn-primary" onClick = {this.validarHorario}>Aceptar</button>
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
                <h4 className="modal-title">Modificar Horario</h4>
              </div>
              <div className="modal-body">
                <form>
                <div className="form-group">
                    Curso
                    <select disabled className="form-control" name="CodCurso" ref="inputcurso" value={this.state.CodCurso} onChange={this.handleInputChange} >
                      <option>192-A</option>
                      <option>192-B</option>
                      <option>292-A</option>
                      <option>292-B</option>
                      <option>329-A</option>
                      <option>329-B</option>
                    </select>
                  </div>
                  <div className="form-group">
                    Dia
                    <select disabled className="form-control" name="Dia" ref="inputdia" value={this.state.Dia} onChange={this.handleInputChange} >
                      <option>LUNES</option>
                      <option>MARTES</option>
                      <option>MIERCOLES</option>
                      <option>JUEVES</option>
                      <option>VIERNES</option>
                      <option>SABADO</option>
                    </select>
                  </div>
                  <div className="form-group">
                    Num Bloque
                   
                    <input disabled className="form-control" type="number"  min="1" max="18" name="Bloque" ref="inputbloque" value={this.state.Bloque} onChange={this.handleInputChange} >
                    
                    </input>
                  </div>
                  <div className="form-group">
                    Sala de Clases
              <input disabled ref="inputsala" className="form-control" name="Sala" id="sala_clase" value={this.state.Sala} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    Hora

              <input disabled ref="inputhora" className="form-control" name="Hora" type="time" id="hora" value={this.state.Hora} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    Codigo Ramo
              <input ref="inputramo"  className="form-control" name="CodRamo" id="cod_ramo" value={this.state.CodRamo} onChange={this.handleInputChange}  />
                  </div>
                  <button type="button" className="btn btn-primary" onClick = {this.validarHorario2} >Aceptar</button>
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
export default mProfesor;
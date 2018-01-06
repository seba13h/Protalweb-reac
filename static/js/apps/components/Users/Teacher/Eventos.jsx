import React from 'react';
import NavMenu from './../../NavMenuProf';
import Footer from './../../Footer';
import axios from 'axios';

function getRut() {
	const rut = (window.location.search.split('?rut=')[1]);
	return rut;
}
function indate(fecha){
	console.log(fecha);
	const day = fecha.slice(0, 2);
	const mont = fecha.slice(3, 5);
	const year = fecha.slice(6, 10);
	const newfecha = (year + '-' + mont + '-' + day);
	console.log(newfecha);
	return newfecha;
}
class Eventos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			teacherClass: [],
			teacherQuest: [],
			curso:'',
			ramo:'',
			dataD:[]
		}
		this.obtenerFecha = this.obtenerFecha.bind(this);
		this.validar = this.validar.bind(this);
		this.insertarData = this.insertarData.bind(this);
		this.DeleteData = this.DeleteData.bind(this);
		this.eliminar = this.eliminar.bind(this);
		this.asigData = this.asigData.bind(this);
	}
	DeleteData(index) {
		this.setState({ dataD: this.state.teacherQuest[index] });
	};

	eliminar() {
		axios.post("/data-delete-quest", this.state.dataD);
		window.location.reload();
	}

	asigData(index){
		console.log( this.state.teacherClass[index].cod_curso);
		 this.setState({
		 	curso: this.state.teacherClass[index].cod_curso,
		  	ramo: this.state.teacherClass[index].cod_ramo
		 });
		console.log("entreee"+this.state.curso+this.state.ramo)
	}
	validar() {
		const sala = this.refs.inputsala2.value;
		const fecha = this.refs.inputfecha2.value;
		const hora = this.refs.inputhora2.value;
			const descripcion = this.refs.inputdescripcion2.value;
			const day = fecha.slice(8,10);
			const mont = fecha.slice(5,7);
			const year = fecha.slice(0,4);
			const newfecha= (day+'-'+mont+'-'+year);
			console.log(hora)
			if (fecha == ""){
				alert("la fecha esta vacia");
				return false;
			}else if (new Date(newfecha).getTime() <  new Date(this.obtenerFecha()).getTime()){
				alert("La fecha es inferior a la actual");
				return false;
			}
			if (hora == "") {
		  alert("Hora vacia");
		  return false;
		}
		if (sala == "") {
			alert("Sala de clases vacia");
			return false;
		  }
		if (descripcion == "") {
		  alert("descripcion vacia");
		  return false;
			}

		alert('Insertando Prueba');
		this.insertarData();
	  }
	insertarData() {
		console.log("entre");
		const curso = this.state.curso;
		const codRamo = this.state.ramo;
		const rut = getRut();
		const sala = this.refs.inputsala2.value;
		const fecha = this.refs.inputfecha2.value;
		const hora = this.refs.inputhora2.value;
		const descripcion = this.refs.inputdescripcion2.value;
		const day = fecha.slice(8, 10);
		const mont = fecha.slice(5, 7);
		const year = fecha.slice(0, 4);
		const newfecha = (day + '-' + mont + '-' + year);
		const dataQuest = { codRamo,curso,rut, newfecha, hora, sala,descripcion };
		axios.post('/data-insert-quest', dataQuest);
		window.location.reload();
	}
	obtenerFecha(){
		var dt = new Date();
		// Display the month, day, and year. getMonth() returns a 0-based number.
		var month = dt.getMonth() + 1;
		if (month < 10){
			  month = ('0'+(dt.getMonth()+1));
		}
		var day = dt.getDate();
		if (day < 10){
			day = ('0'+dt.getDate());
		}
		var year = dt.getFullYear();
		const fecha = (year+ '-' + month + '-' + day);
		return fecha;
	}

	componentWillMount() {
		$.getJSON('/data-get-all-menu-teacher').then(data => this.setState({ teacherClass: data }));
		$.getJSON('/data-get-all-menu-teacher2').then(data => this.setState({ teacherQuest: data }));
		const filtroProf = this.state.teacherClass.filter(data => data.rut === getRut());
		this.setState({teacherClass: filtroProf});
	}
	render() {
		const Evalua = this.state.teacherClass.map((data, index) =>
			<tr>
				<td>{data.nom_ramo}</td>
				<td>
					<button type="button" className="btn btn-primary tc7" data-dismiss="modal" data-toggle="modal" data-target="#myModal" onClick={()=>this.asigData(index)}> Agregar Evaluacion</button>
				</td>
			</tr>
		);

		const filtroQuest = this.state.teacherQuest.filter(data => data.rut === getRut());
		let listQuest = filtroQuest.filter(data => new Date(indate(data.fecha)).getTime() >=  new Date(this.obtenerFecha()).getTime()).map((data, index) =>
		<ul className="nav nav-pills nav-stacked">
				<span className="label label-info">{data.fecha}</span> Ramo: {data.nom_ramo}
				<h5 className="event">{data.descripcion}</h5>
				<h5 className="event">Curso: {data.cod_curso} Hora : {data.hora}</h5>
				<button className="glyphicon glyphicon-pencil" ></button>
          		<button className="glyphicon glyphicon-trash" data-toggle="modal" data-target="#myModal3" onClick={() => this.DeleteData(index) }></button>
				<hr />
			</ul>
		);

		if (listQuest.length === 0){
			listQuest = <li className="list-group-item">  no tiene Pruebas Fijadas </li>
		  }
		return (
			<div>
				<div className="div_titulo">
					<NavMenu rut={getRut()} />
					<h2 className="titulo">EVENTOS</h2>
				</div>
				<div className="content">
					<div className="content_2">
						<div className="panel panel-success">
							<div className="panel-heading">
								<h4 className="panel-title">
									<a data-toggle="collapse" data-parent="#accordion" href="#collapse2">Pruebas Fijadas:</a>
								</h4>
							</div>
							<div id="collapse2" className="panel-collapse collapse">
								<div className="panel-body">
									{listQuest}
								</div>
							</div>
						</div>
						<div className="panel panel-default">
							<div className="panel-heading"><h4>Cursos</h4></div>
							<div className="panel-body tc6">
								<table className="tc3" >
									<tbody>
										<tr>
											<th> Ramo </th>
											<th> </th>
										</tr>
										{Evalua}
									</tbody>
								</table>
							</div>
						</div>
					</div>

				</div>
				<div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Agregar Prueba</h4>
              </div>
              <div className="modal-body">
                <form  >
                  <div className="form-group">
                    Fecha
										<input  className="form-control" id="date" type="date"  ref="inputfecha2"/>
                  </div>
									<div className="form-group">
                    Hora
              			<input ref="inputhora2" className="form-control"  id="time" type="time"  />
                  </div>
				  <div className="form-group">
                    Sala de Clases
              <input ref="inputsala2" className="form-control" id="sala_clase" />
                  </div>
                  <div className="form-group">
                    Descripcion
									<	textarea className="form-control" id="exampleFormControlTextarea1" rows="3" ref="inputdescripcion2"></textarea>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={this.validar}>Aceptar</button>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
              </div>
            </div> {/* Modal Agregar */}
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
            </div>

          </div>
        </div>
				<div className="div_Footer">
					<Footer />
				</div>
			</div>
		)
	}
};
export default Eventos;
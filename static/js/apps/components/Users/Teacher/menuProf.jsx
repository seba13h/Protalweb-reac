import React from 'react';
import NavMenu from './../../NavMenuProf';
import Footer from './../../Footer';

function getRut() {
	return window.location.search.split('?rut=')[1];
}
function indate(fecha){

	const day = fecha.slice(0, 2);
	const mont = fecha.slice(3, 5);
	const year = fecha.slice(6, 10);
	const newfecha = (year + '-' + mont + '-' + day);
	console.log(new Date(newfecha).getTime());
	console.log(newfecha , "fecha 2")
	return newfecha;
}

class Mprofesor extends React.Component {
		constructor(props){
		  super(props);
		  this.state= {
			teacherQuest: [],
			teacherClass: [],
		  }
			this.obtenerDia=this.obtenerDia.bind(this);
			this.obtenerFecha=this.obtenerFecha.bind(this);}


	componentWillMount() {

		$.getJSON('/data-get-all-menu-teacher').then(data => this.setState({ teacherClass: data}));
		$.getJSON('/data-get-all-menu-teacher2').then(data => this.setState({ teacherQuest: data}));

	};
	obtenerDia(){
		let dia = "";
		let hoy = new Date();
		let dd = hoy.getDay();
		if (dd === 1){
			dia = "LUNES"
		}
		if (dd === 2){
			dia = "MARTES"
		}
		if (dd === 3){
			dia = "MIERCOLES"
		}
		if (dd === 4){
			dia = "JUEVES"
		}
		if (dd === 5){
			dia = "VIERNES"
		}
		if (dd === 6){
			dia = "SABADO"
		}
		if (dd === 7){
			dia = "DOMINGO"
		}
		return dia;
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
	render() {

		// const filtroProf=this.state.teacherClass.filter(data => data.rut === getRut());
		 let listClases = this.state.teacherClass.filter(data => data.rut === getRut()).filter(data => data.dia ===  this.obtenerDia()).map((data,index)=>
		 <li className="list-group-item">
				<div>{data.nom_ramo}</div>
				<div>{data.sala_clases}</div>
				<div>{data.hora}</div>
		  </li> );
		   if (listClases.length === 0){
			listClases = <li className="list-group-item"> Hoy no tiene Clases </li>
		  }

const filtroQuest=this.state.teacherQuest.filter(data => data.rut === getRut());
let listQuest = filtroQuest.filter(data => new Date(indate(data.fecha)).getTime() ==  new Date(this.obtenerFecha()).getTime()).map((data,index)=>
<li className="list-group-item">
	   <div>Asignatura: {data.nom_ramo}</div>
	   <div>fecha: {data.fecha}</div>
	   <div>hora: {data.bloque}</div>
	   <div>sala de clases: {data.sala_clases}</div>
 </li> );
if (listQuest.length === 0){
	listQuest = <li className="list-group-item">  Hoy no tiene Prueba </li>
  }
		return (
			<div>
				<div className="div_titulo">
					<NavMenu rut={getRut()}/>
					<h2 className="titulo">INICIO</h2>
				</div>

				<div className="content">
					<div className="panel-group" id="accordion">
						<div className="panel panel-info">
							<div className="panel-heading">
								<h4 className="panel-title">
									<a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Clases del dia : {this.obtenerDia()}</a>
								</h4>
							</div>
							<div id="collapse1" className="panel-collapse collapse in">
								<div className="panel-body">
									<ul className="nav nav-pills nav-stacked">
										{listClases}
									</ul>
								</div>
							</div>
								<div className="panel panel-warning">
									<div className="panel-heading">
										<h4 className="panel-title">
											<a data-toggle="collapse" data-parent="#accordion" href="#collapse3">Pruebas </a>
										</h4>
									</div>
									<div id="collapse3" className="panel-collapse collapse">
										<div className="panel-body">
											<ul className="nav nav-pills nav-stacked">
											  { listQuest }
											</ul>
										</div>
									</div>
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
export default Mprofesor;


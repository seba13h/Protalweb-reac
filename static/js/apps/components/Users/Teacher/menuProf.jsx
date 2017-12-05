import React from 'react';
import NavMenu from './../../NavMenuProf';
import Footer from './../../Footer';

function getRut() {
	return window.location.search.split('?rut=')[1];
}

class Mprofesor extends React.Component {
		constructor(props){
		  super(props);
		  this.state= {
			teacherQuest: [],
			teacherClass: [],
		  }
		}

	componentWillMount() {

		$.getJSON('/data-get-all-menu-teacher').then(data => this.setState({ teacherClass: data}));
		$.getJSON('/data-get-all-menu-teacher2').then(data => this.setState({ teacherQuest: data}));

	};

	render() {
		const filtroProf=this.state.teacherClass.filter(data => data.rut === getRut());
		 const listClases = filtroProf.map((data,index)=>
		 <li className="list-group-item">
				<div>{data.nom_ramo}</div>
				<div>{data.sala_clases}</div>
				<div>{data.hora}</div>
		  </li> );

const filtroQuest=this.state.teacherQuest.filter(data => data.rut === getRut());
const listQuest = filtroQuest.map((data,index)=>
<li className="list-group-item">
	   <div>Asignatura: {data.nom_ramo}</div>
	   <div>fecha: {data.fecha}</div>
	   <div>hora: {data.bloque}</div>
	   <div>sala de clases: {data.sala_clases}</div>
 </li> );

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
									<a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Clases de hoy</a>
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
											<a data-toggle="collapse" data-parent="#accordion" href="#collapse3">Pruebas de hoy</a>
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


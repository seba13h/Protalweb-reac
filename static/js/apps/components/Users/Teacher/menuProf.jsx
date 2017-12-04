import React from 'react';
import NavMenu from './../../NavMenuProf';
import Footer from './../../Footer';

function getRut() {
	const rut= (window.location.search.split('?rut=')[1]);
	return rut;
}

class Mprofesor extends React.Component {
		constructor(props){
		  super(props);
		  this.state= {
			teacherData: [],
			NomRamo: '',
			Hora: '',
			SalaClases: ''
		  }

		}

	componentWillMount() {
		$.getJSON('/data-get-all-menu-teacher', (Teacher) => {
			this.setState({ teacherData: [ ...Teacher ] }  );
			const infProf= this.state.teacherData.filter(data => data.rut === getRut());
			if (infProf.length){
				console.log(infProf);
				this.setState({NomRamo:	infProf[1].nom_ramo, Hora:   infProf[1].hora,  SalaClases: infProf[1].sala_clases});
			}
		})
	///
	};

	render() {
		const listClases = this.state.teacherData.map((data,index)=> <li className="list-group-item">  { this.state.NomRamo } ......... {this.state.Hora}...... {this.state.SalaClases}</li> );

		return (
			<div>
				<div className="div_titulo">
					<NavMenu />
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
							<div className="panel panel-success">
								<div className="panel-heading">
									<h4 className="panel-title">
										<a data-toggle="collapse" data-parent="#accordion" href="#collapse2">Eventos de hoy</a>
									</h4>
								</div>
								<div id="collapse2" className="panel-collapse collapse">
									<div className="panel-body">
										<ul className="nav nav-pills nav-stacked">
											<li className="list-group-item">Entrega ppt de administracion</li>
											<li className="list-group-item">Enviar trabajo al profesor de matematicas</li>
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
												<li className="list-group-item">Administracion: 14:30 hr Sala: R303</li>
											</ul>
										</div>
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


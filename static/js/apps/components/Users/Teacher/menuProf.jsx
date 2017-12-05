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
			teacherData2: [],
			teacherData: [],
			NomRamo: '',
			Hora: '',
			SalaClases: '',
			fecha:'',
			NomPrueba:'',
			bloquePrueba:'',
			salaPrueba:'',
			curso:'',
			profesor:'',
			rut:''
		  }
		}

	componentWillMount() {
		$.getJSON('/data-get-all-menu-teacher', (Teacher) => {
			this.setState({ teacherData: [ ...Teacher ] }  );
			const infProf= this.state.teacherData.filter(data => data.rut === getRut());
			if (infProf.length){
				console.log(infProf);
				this.setState({rut:getRut() ,NomRamo:	infProf[1].nom_ramo, Hora:   infProf[1].hora,  SalaClases: infProf[1].sala_clases, profesor: infProf[1].nom_prof});
				console.log(this.state);
				this.setState({NomRamo:	infProf[0].nom_ramo, Hora:   infProf[0].hora,  SalaClases: infProf[0].sala_clases, profesor: infProf[0].nom_prof});
			}
		})
		$.getJSON('/data-get-all-menu-teacher2', (Teacher) => {
			this.setState({ teacherData2: [ ...Teacher ] }  );
			const infProf2= this.state.teacherData2.filter(data => data.rut === getRut());
			if (infProf2.length){
				console.log(infProf2);
				this.setState({NomPrueba:	infProf2[0].nom_ramo, fecha:   infProf2[0].fecha, curso: infProf2[0].cod_curso,
				salaPrueba: infProf2[0].sala_clases});
			}
		})

	};

	render() {
		const listClases = this.state.teacherData.map((data,index)=> <li className="list-group-item">  { this.state.NomRamo } ......... {this.state.Hora}...... {this.state.SalaClases}</li> );
        const listPrueba = this.state.teacherData2.map((data,index)=> <li className="list-group-item">{this.state.NomPrueba} => {this.state.fecha} : Sala: {this.state.salaPrueba} </li>);
		return (
			<div>
				<div className="div_titulo">
					<NavMenu/>
					<h2 className="titulo">INICIO</h2>
				</div>
				<h2 className="titulo">Bienvenido : {this.state.profesor}</h2>
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
											  {listPrueba}
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


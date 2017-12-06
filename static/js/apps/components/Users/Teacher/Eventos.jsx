import React from 'react';
import NavMenu from './../../NavMenuProf';
import Footer from './../../Footer';
function getRut() {
	const rut = (window.location.search.split('?rut=')[1]);
	return rut;
}

class Eventos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			teacherClass: [],
			teacherQuest: [],
		}
	}
	componentWillMount() {
		$.getJSON('/data-get-all-menu-teacher').then(data => this.setState({ teacherClass: data }));
		$.getJSON('/data-get-all-menu-teacher2').then(data => this.setState({ teacherQuest: data}));
	}
	render() {
		const filtroProf=this.state.teacherClass.filter(data => data.rut === getRut());
		const Evalua = filtroProf.map((data,index)=>
		<tr>
		<td>{data.nom_ramo}</td>
		<td>
			<button type="button" className="btn btn-primary tc7" data-dismiss="modal"> Agregar Evaluacion</button>

		</td>
	</tr>
	);

	const filtroQuest=this.state.teacherQuest.filter(data => data.rut === getRut());
	const listQuest = filtroQuest.map((data,index)=>
					<ul className="nav nav-pills nav-stacked">
					<span className="label label-info">{data.fecha}</span> Ramo: {data.nom_ramo}
						<h5 className="event">{data.descripcion}</h5>
						<h5 className="event">Curso: {data.cod_curso}</h5>
					<hr/>
					</ul>
	  );
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
									<a data-toggle="collapse" data-parent="#accordion" href="#collapse2">Eventos de la semana:</a>
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
				<div className="div_Footer">
					<Footer />
				</div>
			</div>
		)
	}
};
export default Eventos;
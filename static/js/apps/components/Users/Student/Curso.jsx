import React from 'react';
import NavMenu from './../../NavMenu';
import Footer from './../../Footer';
function getRut() {
	const rut= (window.location.search.split('?rut=')[1]);
	return rut;
}
class Curso extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  dataA:[]
			}
		}
		componentWillMount() {
			$.getJSON('/data-get-ramos-user').then(data => this.setState({ dataA: data }));
		};
	render() {
		const ramosA = this.state.dataA.filter(data => data.rut === getRut());
		console.log(ramosA);
		const list = ramosA.map(data => (
			<div className="content_2">
			<div className="panel-group" id="accordion">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h4 className="panel-title">
							<a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Asignatura: {data.nom_ramo}</a>
						</h4>
					</div>
					<div id="collapse1" className="panel-collapse collapse in">
						<div className="panel-body">
							<ul className="nav nav-pills nav-stacked">
								<li>Profesor: {data.nom_prof} </li>
								<li>E-mail: {data.email}    </li>
								<li>Telefono: {data.telefono}    </li>
								<li>Nota Promedio: pendiente!!  </li>
							</ul>
						</div>
					</div>

				</div>
			</div>
			</div>

		))
		console.log(ramosA);
		return (
			<div>
				<div className="div_titulo">
					<NavMenu />
					<h2 className="titulo">CURSO </h2>
				</div>
				<div className="content">
				{list}
				</div>

				<div className="div_Footer">
					<Footer />
				</div>
			</div>
		)
	}
};
export default Curso;
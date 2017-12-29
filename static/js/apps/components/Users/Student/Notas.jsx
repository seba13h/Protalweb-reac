import React from 'react';
import NavMenu from './../../NavMenu';
import Footer from './../../Footer';

function getRut() {
	const rut = (window.location.search.split('?rut=')[1]);
	return rut;
}

class Notas extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			Profesor: [],
			studentClass: [],
			dataA: []
		}
		this.Mostrarnotas = this.Mostrarnotas.bind(this);

	}

	componentWillMount() {
		$.getJSON('/data-get-all-rut-detallenota').then(data => this.setState({ studentClass: data }));
		$.getJSON('/data-get-ramos-user').then(data => this.setState({ dataA: data }));
	};

	Mostrarnotas(index, filtroNota,ramosA) {
		return (filtroNota.filter(data => data.cod_ramo === ramosA[index].cod_ramo).map(data => (
			<table className="tc3" >
				<tbody>
					<tr>
						<th>Nota </th>
						<th>Numero de Nota</th>
						<th>Ponderacion</th>
					</tr>
					<tr>
						<td>{data.nota}</td>
						<td>{data.numero_nota}</td>
						<td>{data.ponderacion}</td>
					</tr>
				</tbody>
			</table>
		))
		);
	}

	render() {
		const ramosA = this.state.dataA.filter(data => data.rut ===  getRut());
		const filtroNota = this.state.studentClass.filter(data => data.rut_alu === getRut());
		const list = ramosA.map((data, index) => (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h4 className="panel-title">
						<a data-toggle="collapse" data-parent="#accordion">{data.nom_ramo}</a>
					</h4>
				</div>
				<div  className="panel-collapse collapse in">
					<div className="panel-body">
						{this.Mostrarnotas(index, filtroNota,ramosA)}
					</div>
				</div>
			</div>
		));
		return (
			<div>
				<div className="div_titulo">
					<NavMenu rut={getRut()} />
					<h2 className="titulo">NOTAS</h2>
				</div>
				<div className="content">
					<div className="content_2">
						<div className="panel-group" id="accordion">
							{list}
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
export default Notas;
import React, {Component} from 'react';
import NavMenu from './../../NavMenuProf';
import Footer from './../../Footer';

function appendNote(id, nota) {
	document.getElementById(`'${id}'`)
	console.log(document.getElementById(`'${id}'`));
}
function getRut() {
	const rut= (window.location.search.split('?rut=')[1]);
	return rut;
}
class Notas extends Component {
	 constructor(props){
			super(props);
			this.state= {
				dataRamo: [],
				dataA:[],
				dataNota:[]
			}
			this.listAlu = this.listAlu.bind(this);
			this.listNotas = this.listNotas.bind(this);
		}
	listNotas(rut,ramo){
		let filtroNota = this.state.dataNota.filter(data => data.rut_alu === rut && data.cod_ramo === ramo).map(data => (
				<td>{data.nota}</td>
		));
		if (filtroNota.length === 0){
			filtroNota = <td>..</td>
		}
		return filtroNota;

	}
	listAlu(curso,cod_ramo){
		const listaAlumno = this.state.dataA.filter(data => data.cod_curso === curso).map(data=>(
			<div>
				<td className = "nombreTab">	{data.nom_alu} </td>
				<td>{this.listNotas(data.rut_alu,cod_ramo)}</td>
				<td>	<button type="button" className="btn btn-primary" >+</button></td>
			</div>
		)
		);;
		return listaAlumno;
	}
			componentDidMount() {

						$.getJSON('/data-get-all-menu-teacher').then(data => this.setState({ dataRamo: data}));
						$.getJSON('/data-get-all-user').then(data => this.setState({ dataA: data}));
						$.getJSON('/data-get-all-rut-detallenota').then(data => this.setState({ dataNota: data}));
					}
	render() {
		const listNotas=	<td></td>;
		const filtroProf= this.state.dataRamo.filter((data,index)=> data.rut === getRut());
		const RamoN = filtroProf.map((data,index)=>
		(
		<div className="panel panel-default">
		<div className="panel-heading">
		<h4 className="panel-title">
		<a data-toggle="collapse" data-parent="#accordion" href="#collapse1">{data.nom_ramo}</a>
		</h4>
		</div>
		<div id="collapse1" className="panel-collapse collapse in">
			<div className="panel-body">
				<table className="tc3" >
					<tbody>
					<tr>
						<th>Nombre Alumno</th>
						<th>Notas </th>
						<th>Agregar Nota</th>
					</tr>
					{this.listAlu(data.cod_curso,data.cod_ramo)}
					</tbody>
				</table>
			</div>
		</div>
	</div>)
		);
		return (
			<div>
				<div className="div_titulo">
				<NavMenu rut={getRut()}/>
					<h2 className="titulo">NOTAS</h2>
				</div>
				<div className="content">
					<div className="content_2">
						<div className="panel-group" id="accordion">
						{RamoN}
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
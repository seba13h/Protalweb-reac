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
				dataNota:[]
			}
		}
			componentDidMount() {

						$.getJSON('/data-get-all-menu-teacher').then(data => this.setState({ dataRamo: data}));
						$.getJSON('/data-get-all-notasUsers').then(data => this.setState({ dataNota: data}));
						const filtroNota= this.state.dataNota.filter((data,index)=> data.rut === getRut());
						const NotaA = filtroNota.map((data,index) => {
							console.log(data.numero_nota);
							if (data.numero_nota > 1)  {
								appendNote(`${data.rut_alu}`, data.nota);
							}

					 });
					}
	render() {
		const filtroNota= this.state.dataNota.filter((data,index)=> data.rut === getRut());
		const NotaA = filtroNota.map((data,index) => {
				const note = data.numero_nota === 1 ? (
						<tr>
						<td>{data.nom_alu}</td>
						<td>{data.nota}</td>
						<td id={`${data.rut_alu}`}>{data.detalle_nota}</td>
						<td className="tc5"><button
							className="tc4">+</button></td>
						</tr> ):null
				return (
					 note
				 );
		})

	// 	 const NotaA= filtroNota.map((data,index)=>
	// 	 (
	// 	<tr>
	//    <td>{data.nom_alu}</td>
	// 	 <td>{data.nota}</td>
	// 	 <td>{data.detalle_nota}</td>
	// 	 <td className="tc5"><button className="tc4">+</button></td>
	// 	 </tr>)


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
						<th>Nota </th>
						<th>Agregar Nota</th>
						<th>Detalle Nota</th>
					</tr>
			 			{NotaA}
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
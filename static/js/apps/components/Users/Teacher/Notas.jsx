import React, {Component} from 'react';
import NavMenu from './../../NavMenuProf';
import Footer from './../../Footer';

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
			componentWillMount() {
						$.getJSON('/data-get-all-menu-teacher').then(data => this.setState({ dataRamo: data}));
						$.getJSON('/data-get-all-notasUsersr').then(data => this.setState({ dataNota: data}));
	 }
	render() {


		const filtroProf= this.state.dataRamo.filter((data,index)=> data.rut === getRut());
		const RamoN = filtroProf.map((data,index)=>
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
						<th>Nota 1</th>
						<th>Nota 2</th>
						<th>Nota 3</th>
						<th>Agregar Nota</th>
					</tr>
					<tr>

						<td>Pablo</td>
						<td>55</td>
						<td>77</td>
						<td>66</td>
						<td className="tc5"><button className="tc4">+</button></td>
						</tr>

					</tbody>
				</table>
			</div>
		</div>
	</div>
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
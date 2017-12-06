import React from 'react';
import NavMenu from './../../NavMenu';
import Footer from './../../Footer';

function getRut() {
	const rut= (window.location.search.split('?rut=')[1]);
	return rut;
}

class Notas extends React.Component {

	constructor(props) {
			super(props);
			this.state = {
				Profesor: [],
				studentClass: [],
			}
	}

	componentWillMount() {
	    $.getJSON('/data-get-all-rut-detallenota').then(data => this.setState({ studentClass: data}));
	  };


	render() {

		const lista = this.state.studentClass.map((data,index)=>
		  <div className="panel panel-default">
		  	<div className="panel-heading">
		  		<h4 className="panel-title">
		  			<a data-toggle="collapse" data-parent="#accordion" href="#collapse1">{data.cod_ramo}</a>
		  		</h4>
		  	</div>
		  	<div id="collapse1" className="panel-collapse collapse in">
		  		<div className="panel-body">
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
		  		</div>
		  	</div>
		  </div> );

		return (
			<div>
				<div className="div_titulo">
				<NavMenu rut={getRut()}/>
					<h2 className="titulo">NOTAS</h2>
				</div>
				<div className="content">
					<div className="content_2">
						<div className="panel-group" id="accordion">
							{lista}
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
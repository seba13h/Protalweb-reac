import React from 'react';
import NavMenu from './../../NavMenu';
import Footer from './../../Footer';
import axios from 'axios';
function getRut() {
	const rut= (window.location.search.split('?rut=')[1]);
	return rut;
}


class Eventos extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      dataA:[]
		}
	}

	componentWillMount() {
		$.getJSON('/data-get-ramos-user').then(data => this.setState({ dataA: data }));
		console.log(this.state.dataA)
		const ramosA = this.state.dataA.filter(data => data.rut === rut);
		this.setState({dataA: ramosA});
	};

	render() {
		console.log(this.state.dataA);
		const list = this.state.dataA.map(data =>(
			<tr>
			<td>
				{data.nom_ramo}
			</td>
			<td>
			<button type="button" className="btn btn-primary tc7" data-dismiss="modal">Evento</button>
						<button type="button" className="btn btn-danger tc7" data-dismiss="modal">Certamen</button>
			</td>
			</tr>
		));
		return (
			<div>
				<div className="div_titulo">
		               <NavMenu/>
									 <h2 className="titulo">EVENTOS</h2>
	           </div>
			   <div className="content">

		<div className="content_2">

		<div className="panel panel-success">
			    <div className="panel-heading">
			      <h4 className="panel-title">
			        <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">Eventos:</a>
			      </h4>
			    </div>
			    <div id="collapse2" className="panel-collapse collapse">
			      <div className="panel-body">
			      <ul className="nav nav-pills nav-stacked">

			      	  <span className="label label-info">Martes 23</span> Evento 1
			      	  <hr/>
			      	  <span className="label label-warning">Viernes 26 </span> Evento 2
			    </ul>
			      	</div>
			    </div>
			  </div>

			<div className="panel panel-default">
			  <div className="panel-heading"><h4>Cursos</h4></div>
			  <div className="panel-body tc6">


			  		<table className="tc3" >
			  			<tbody>
			  		  <tr>
			  		    <th></th>
			  		    <th>Agregar Evento</th>

			  		  </tr>
							{list}
			  		  </tbody>
			  		</table>


			</div>
		</div>
		</div>

  </div>
			<div className="div_Footer">
		               <Footer/>
	           </div>
  </div>
        )
    }
};
export default Eventos;
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
			dataA:[],
			dataB:[],
			dataC:[]
		}
		this.obtenerFecha=this.obtenerFecha.bind(this);
	}
	obtenerFecha(){
		var dt = new Date();
		// Display the month, day, and year. getMonth() returns a 0-based number.
		var month = dt.getMonth()+ 1;
		var day = dt.getDate() ;
		var year = dt.getFullYear();
		const fecha = (day+'-'+month+'-'+year);
		return fecha;
	}
	componentWillMount() {
		$.getJSON('/data-get-all-rut-user', (Student) => {
			this.setState({ dataA: [ ...Student ]});
			const filtroAlu=this.state.dataA.filter(data => data.rut === getRut());
			this.setState({dataA : filtroAlu});
			})
			$.getJSON('/data-get-all-quest'	, (quest) => {this.setState({ dataB: quest});
				const filtroquest=this.state.dataB.filter(data => data.cod_curso === this.state.dataA[0].cod_curso);
				const filtroFecha = filtroquest.filter(data => (new Date(data.fecha).getTime() >=  new Date(this.obtenerFecha()).getTime()));
				this.setState({dataB : filtroFecha});
				})
				$.getJSON('/data-get-all-event'	, (quest) => {this.setState({ dataC: quest});
				const filtroevent=this.state.dataC.filter(data => data.rut_alu ===  getRut() );
				const filtroFecha2 = filtroevent.filter(data => (new Date(data.fecha).getTime() >=  new Date(this.obtenerFecha()).getTime()));
				this.setState({dataC : filtroFecha2});
				})


	};

	render() {
		console.log(this.state.dataC)
			const lisQuest = this.state.dataB.map( data => (
				<div>
				<span className="label label-warning">{data.fecha}  {data.cod_ramo}</span> <a>  {data.descripcion} - Hora :{data.bloque} - Sala de Clases :{data.sala_clases} </a>
				<hr/>
				</div>
			)
		)
		const listEvent = this.state.dataC.map( (data,index) => (
			<div>
						  <span className="label label-info">{data.fecha}</span> <a> {data.descripcion} - Hora : {data.hora}</a>
								<button className="glyphicon glyphicon-pencil" ></button>
          			<button className="glyphicon glyphicon-trash"></button>
			</div>
		)
	)
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
			        <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">Eventos</a>
					<button type="button" className="btn btn-primary addevent">+</button>
			      </h4>
			    </div>
			    <div id="collapse2" className="panel-collapse collapse">
			      <div className="panel-body">
			      <ul className="nav nav-pills nav-stacked">
					{listEvent}
			    </ul>
			      	</div>
			    </div>
			  </div>
			  <div className="panel panel-success">
			    <div className="panel-heading">
			      <h4 className="panel-title">
			        <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">Pruebas</a>
			      </h4>
			    </div>
			    <div id="collapse3" className="panel-collapse collapse">
			      <div className="panel-body">
			      <ul className="nav nav-pills nav-stacked">
			      	  {lisQuest}
			    </ul>
			      	</div>
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
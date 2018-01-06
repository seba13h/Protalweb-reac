import React from 'react';
import NavMenu from './../../NavMenu';
import Footer from './../../Footer';
function getRut() {
	return window.location.search.split('?rut=')[1];
}
function indate(fecha){
	const day = fecha.slice(0, 2);
	const mont = fecha.slice(3, 5);
	const year = fecha.slice(6, 10);
	const newfecha = (year + '-' + mont + '-' + day);
	console.log(new Date(newfecha).getTime());
	console.log(newfecha , "fecha 2")
	return newfecha;
}
class Pam extends React.Component {
	constructor(props){
		super(props);
		this.state= {
		  userQuest: [],
		  userClass: [],
		  userEvent:[],
		  user:[],

		}
		this.obtenerDia=this.obtenerDia.bind(this);
		this.obtenerFecha=this.obtenerFecha.bind(this);
	  }
	  obtenerDia(){
		let dia = "";
		let hoy = new Date();
		let dd = hoy.getDay();
		if (dd === 1){
			dia = "LUNES"
		}
		if (dd === 2){
			dia = "MARTES"
		}
		if (dd === 3){
			dia = "MIERCOLES"
		}
		if (dd === 4){
			dia = "JUEVES"
		}
		if (dd === 5){
			dia = "VIERNES"
		}
		if (dd === 6){
			dia = "SABADO"
		}
		if (dd === 7){
			dia = "DOMINGO"
		}
		return dia;
	}
	obtenerFecha(){
		var dt = new Date();
		// Display the month, day, and year. getMonth() returns a 0-based number.
		var month = dt.getMonth() + 1;
		if (month < 10){
			  month = ('0'+(dt.getMonth()+1));
		}
		var day = dt.getDate();
		if (day < 10){
			day = ('0'+dt.getDate());
		}
		var year = dt.getFullYear();
		const fecha = (year+ '-' + month + '-' + day);
		return fecha;
	}
	  componentWillMount() {
				$.getJSON('/data-get-all-menu-User').then(data => this.setState({ userClass: data}));
				$.getJSON('/data-get-all-menu-User2').then(data => this.setState({ userQuest: data}));
				$.getJSON('/data-get-all-user').then(data => this.setState({user: data}));
				const usuario = this.state.user.filter(data => data.rut_alu === getRut() ) ;
				this.setState({user : usuario});
				$.getJSON('/data-get-all-event').then(data => this.setState({userEvent: data}));
				const filtroEventos = this.state.userEvent.filter(data => data.rut_alu === getRut());
				this.setState({userEvent : filtroEventos});

			};

	render() {
		console.log(this.state.userEvent)

		let listClases = this.state.userClass.filter(data => data.dia === this.obtenerDia()).map((data,index)=>
		<li className="list-group-item">{data.cod_ramo}		{data.hora}	{data.sala_clases}</li>
		  );

		  if (listClases.length === 0){
			listClases = <li className="list-group-item"> Hoy no tiene Clases </li>
		  }
		  let listEvent=this.state.userEvent.filter(data =>new Date(indate(data.fecha)).getTime() ==  new Date(this.obtenerFecha()).getTime() ).map(data => (
			<div>
			<li className="list-group-item">{data.descripcion} => {data.hora.slice(0,5)} Hrs</li>
			</div>
		  ));
		  if (listEvent.length === 0){
			listEvent = <li className="list-group-item">  Hoy no tiene Eventos </li>
		  }
		let listQuest = this.state.userQuest.filter(data => new Date(indate(data.fecha)).getTime() ==  new Date(this.obtenerFecha()).getTime() ).map((data,index)=>(
				<li className="list-group-item">Ramo:{data.cod_ramo} {data.hora}  Sala: {data.sala_clases} {data.descripcion}</li>
		 )
		 );

		 if (listQuest.length === 0){
			listQuest = <li className="list-group-item">  Hoy no tiene Prueba </li>
		  }
		return (
			<div>
				<div className="div_titulo">
				<NavMenu rut={getRut()}/>
					<h2 className="titulo">INICIO</h2>
				</div>
				<div className="content">
					<div className="panel-group" id="accordion">
						<div className="panel panel-info">
							<div className="panel-heading">
								<h4 className="panel-title">
									<a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Clases del dia : {this.obtenerDia()}</a>
								</h4>
							</div>
							<div id="collapse1" className="panel-collapse collapse in">
								<div className="panel-body">
									<ul className="nav nav-pills nav-stacked">
									{listClases}
									</ul>
								</div>
							</div>
							<div className="panel panel-success">
								<div className="panel-heading">
									<h4 className="panel-title">
										<a data-toggle="collapse" data-parent="#accordion" href="#collapse2">Eventos de hoy</a>
									</h4>
								</div>
								<div id="collapse2" className="panel-collapse collapse">
									<div className="panel-body">
										<ul className="nav nav-pills nav-stacked">
										{listEvent}

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
													 {listQuest}
											</ul>
										</div>
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
export default Pam;


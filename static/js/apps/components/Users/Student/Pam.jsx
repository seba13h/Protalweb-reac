import React from 'react';
import NavMenu from './../../NavMenu';
import Footer from './../../Footer';
function getRut() {
	return window.location.search.split('?rut=')[1];
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
	  componentWillMount() {
				$.getJSON('/data-get-all-menu-User').then(data => this.setState({ userClass: data}));
				$.getJSON('/data-get-all-menu-User2').then(data => this.setState({ userQuest: data}));
				$.getJSON('/data-get-all-user').then(data => this.setState({user: data}));
				const usuario = this.state.user.filter(data => data.rut_alu === getRut() ) ;
				this.setState({user : usuario});
			};

	render() {
		console.log(this.state.user)

		let listClases = this.state.userClass.filter(data => data.dia === this.obtenerDia()).map((data,index)=>
		<li className="list-group-item">{data.cod_ramo}		{data.hora}	{data.sala_clases}</li>
		  );
		  console.log(listClases)
		  if (listClases.length === 0){
			listClases = <li className="list-group-item"> Hoy no tiene Clases </li>
		  }
		//   const filtroQuest=this.state.userQuest.filter(data => data.fecha == ;
		//    const listQuest = filtroQuest.map((data,index)=>(
		//   		<li className="list-group-item">{data.cod_curso}: {data.bloque}  Sala: {data.sala_clases} {data.descripcion}</li>
		//    )
		//  );
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
											<li className="list-group-item">Entrega ppt de administracion</li>
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
													{/* {listQuest} */}
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


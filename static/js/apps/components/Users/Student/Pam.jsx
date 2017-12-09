import React from 'react';
import NavMenu from './../../NavMenu';
import Footer from './../../Footer';
function getRut() {
	return window.location.search.split('?rut=')[1];
}
function getDate(){
	console.log(new Date().toJSON().slice(0,10).replace(/-/g,'/'));
return new Date().toJSON().slice(0,10).replace(/-/g,'/');
}


class Pam extends React.Component {
	constructor(props){
		super(props);
		this.state= {
		  userQuest: [],
		  userClass: [],
		  userEvent:[]
		}
	  }

	  componentWillMount() {
				$.getJSON('/data-get-all-menu-User').then(data => this.setState({ userClass: data}));
				$.getJSON('/data-get-all-menu-User2').then(data => this.setState({ userQuest: data}));
			};

	render() {
		const listClases = this.state.userClass.map((data,index)=>
		<li className="list-group-item">{data.cod_ramo}		{data.hora}	{data.sala_clases}</li>
		  );
		  const filtroQuest=this.state.userQuest.filter(data => data.fecha == getDate());
		  const listQuest = filtroQuest.map((data,index)=>(
		  		<li className="list-group-item">{data.cod_curso}: {data.bloque}  Sala: {data.sala_clases} {data.descripcion}</li>
		  )
		);
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
									<a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Clases de hoy</a>
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


import React from 'react';
import NavMenu from './../../NavMenu';
import Footer from './../../Footer';
class Pam extends React.Component {

	render() {
		return (
			<div>
				<div className="div_titulo">
					<NavMenu />
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
										<li className="list-group-item">Gestion Empresarial		09:40 -11:20	G202</li>
										<li className="list-group-item">Matemáticas II			09:40 -11:20	U101</li>
										<li className="list-group-item">Sistemas de Inf I		09:40 -11:20	U202</li>
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
											<li className="list-group-item">Enviar trabajo al profesor de matematicas</li>
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
												<li className="list-group-item">Administracion: 14:30 hr Sala: R303</li>
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


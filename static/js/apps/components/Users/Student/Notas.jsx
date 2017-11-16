import React from 'react';
import NavMenu from './../../NavMenu';
import Footer from './../../Footer';
class Notas extends React.Component {

	render() {
		return (
			<div>
				<div className="div_titulo">
					<NavMenu />
					<h2 className="titulo">NOTAS</h2>
				</div>
				<div className="content">
					<div className="content_2">
						<div className="panel-group" id="accordion">
							<div className="panel panel-default">
								<div className="panel-heading">
									<h4 className="panel-title">
										<a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Gestion Empresarial</a>
									</h4>
								</div>
								<div id="collapse1" className="panel-collapse collapse in">
									<div className="panel-body">
										<ul className="nav nav-pills nav-stacked">

											<li>Nota 1: 68</li>
											<li>Nota 2: --</li>
											<li>Nota 3: --</li>
										</ul>
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
export default Notas;
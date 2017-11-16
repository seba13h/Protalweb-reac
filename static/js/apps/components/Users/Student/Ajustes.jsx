import React from 'react';
import NavMenu from './../../NavMenu';
import Footer from './../../Footer';
class Ajustes extends React.Component {

	render() {
		return (
			<div>
				<div className="div_titulo">
					<NavMenu />
					<h2 className="titulo">AJUSTES</h2>
				</div>
				<div className="content">


					<div className="panel panel-danger">
						<div className="panel-heading">Empty</div>
						<div className="panel-body">
							<span>--/--</span>
						</div>
						<div className="panel-footer">
							<span>
								<div className="content_2">
									<div className="dropdown">
										<button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
											<span className="caret"></span></button>
										<ul className="dropdown-menu">
											<li><a >Pequeña</a></li>
											<li><a >Media</a></li>
											<li><a >Grande</a></li>
										</ul>
									</div>
								</div>
							</span>
						</div>
						<div className="panel-body">
							<span>--/--</span>
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
export default Ajustes;
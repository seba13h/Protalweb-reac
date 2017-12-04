import React, {Component} from 'react';
import NavMenu from './../../NavMenuProf';
import Footer from './../../Footer';

class Notas extends Component {
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
										  <tr>
										    <td>Susan</td>
										    <td>66</td>
										    <td>11</td>
										    <td>66</td>
										    <td className="tc5"><button className="tc4">+</button></td>
										  </tr>
										  <tr>
										    <td>Johny</td>
										    <td>51</td>
										    <td>10</td>
										    <td>66</td>
										    <td className="tc5"><button className="tc4">+</button></td>
										  </tr>
										  </tbody>
										</table>
									</div>
								</div>
							</div>
							<div className="panel panel-default">
								<div className="panel-heading">
									<h4 className="panel-title">
										<a data-toggle="collapse" data-parent="#accordion" href="#collapse2">Matemáticas</a>
									</h4>
								</div>
								<div id="collapse2" className="panel-collapse collapse in">
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
										    <td>55</td>
										    <td>77</td>
										    <td className="tc5"><button className="tc4">+</button></td>
										  </tr>
										  <tr>
										    <td>Susan</td>
										    <td>66</td>
										    <td>55</td>
										    <td>11</td>
										    <td className="tc5"><button className="tc4">+</button></td>
										  </tr>
										  <tr>
										    <td>Johny</td>
										    <td>51</td>
										    <td>55</td>
										    <td>10</td>
										    <td className="tc5"><button className="tc4">+</button></td>
										  </tr>
										  </tbody>
										</table>
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
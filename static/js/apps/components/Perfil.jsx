import React from 'react';
import NavMenu from './NavMenu';
import Footer from './Footer';

 class  Perfil extends React.Component {
	ChangeName () {
		this.setState({
			nombre : 'mario',
		    })
		 };

	constructor(props) {
			super(props);
			this.state = {
			nombre : 'sebastian',
			carrera:'informatica',
			correo: 'xd',
			telefono:'123',
			direccion:'casa'
			}
			this.ChangeName = this.ChangeName.bind(this);
		  }

	render() {
		return (
			<div>
				<div className="div_titulo">
		               <NavMenu/>
					   <h2 className="titulo">PERFIL</h2>
	           </div>

				<div  className ="content">
					<div  className ="panel panel-success">
						<div  className ="panel-heading">Información del Usuario</div>
						<div  className ="panel-body" onClick ={this.ChangeName}>
							<span>nombre: {this.state.nombre}		</span>
						</div>
						<div  className ="panel-footer">
							<span>carrera {this.state.carrera}			</span>
						</div>
						<div  className ="panel-body">
							<span>correo: {this.state.correo}		</span>
						</div>
						<div  className ="panel-footer">
							<span>		</span>
						</div>
						<div  className ="panel-body">
							<span>Direccion: {this.state.direccion}	</span>
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
export default Perfil;
import React from 'react';
import NavMenu from './../../NavMenu';
import Footer from './../../Footer';

function getRut() {
	const rut= (window.location.search.split('?rut=')[1]);
	return rut;
}
 class Perfil extends React.Component {
 	constructor(props) {
			super(props);
			this.state = {
				Alumno: [],
				NomProf:'',
				email:'',
				telefono:''
			}
	}
	
		componentWillMount() {
		$.getJSON('/data-get-all-rut-user', (Student) => {
					this.setState({ Alumno: [ ...Student ]});
					const filtroProf=this.state.Alumno.filter(data => data.rut === getRut());
				   this.setState({NomProf: filtroProf[0].nom_alu, email:filtroProf[0].email, telefono: filtroProf[0].telefono })
				   console.log(filtroProf[0].nom_alu);
			})
		}

	render() {
		return (
			<div>
				<div className="div_titulo">
		               <NavMenu rut={getRut()}/>
					   <h2 className="titulo">PERFIL</h2>
	           </div>

				<div  className ="content">
					<div  className ="panel panel-success">
						<div  className ="panel-heading">Información del Usuario</div>
						<div  className ="panel-body" >
							<span>nombre: {this.state.NomProf}</span>
						</div>
						<div  className ="panel-footer">
							<span>Tipo usuario: Alumno.			</span>
						</div>
						<div  className ="panel-body">
							<span>correo:{this.state.email}		</span>
						</div>
						<div  className ="panel-footer">
							<span>Telefono: {this.state.telefono}	</span>
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
import React from 'react';
import NavMenu from './../../NavMenu';
import Footer from './../../Footer';
import axios from 'axios';

function getRut() {
	const rut = (window.location.search.split('?rut=')[1]);
	return rut;
}
class Perfil extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Alumno: [],
			NomProf: '',
			email: '',
			telefono: '',
			Curso: '',
			contra: ''
		}
		this.showpassword = this.showpassword.bind(this);
		this.showpassword2 = this.showpassword2.bind(this);
		this.showpassword3 = this.showpassword3.bind(this);
		this.validar = this.validar.bind(this);
		this.insertarData = this.insertarData.bind(this);
	}
	insertarData() {
		const rut = getRut();
		const pw = this.refs.inputpw1.value;
		const dataAlumno = { rut ,pw};
		axios.post("/data-update-user-password", dataAlumno);
		window.location.reload();
	  }
	validar() {
		const pw = this.refs.inputpw1.value;
		const pw2 = this.refs.inputpw2.value;
		const pw3 = this.refs.inputpw3.value;

		if (pw3 != this.state.contra) {
			alert('Contraseña antigua erronea');
			return false;
		  }
		if (pw != "" && pw2 != "") {
		  if (pw === pw2) {
			this.setState({ pasword: { newClass: "dataCorrect" } });
		  } else {
			this.setState({ pasword: { newClass: "dataIncorrect" } });
			alert('No coinciden las claves');
			return false;
		  }
		 } else {
		  this.setState({ pasword: { newClass: "none" } });
		  alert('Ingrese ambas contraseñas');
		  return false;
		}
		alert('Actualizando Contraseña');
		 this.insertarData();
	  }
	componentWillMount() {
		$.getJSON('/data-get-all-rut-user', (Student) => {
			this.setState({ Alumno: [...Student] });
			const filtroProf = this.state.Alumno.filter(data => data.rut === getRut());
			this.setState({ NomProf: filtroProf[0].nom_alu, email: filtroProf[0].email, telefono: filtroProf[0].telefono, Curso: filtroProf[0].cod_curso, contra: filtroProf[0].contraseña });
		})
	}
	showpassword(){
		var x = document.getElementById("password");
		if (x.type === "password") {
			x.type = "text";
		} else {
			x.type = "password";
		}
	}
	showpassword2(){
		var x = document.getElementById("password2");
		if (x.type === "password") {
			x.type = "text";
		} else {
			x.type = "password";
		}
	}

	showpassword3(){
		var x = document.getElementById("password3");
		if (x.type === "password") {
			x.type = "text";
		} else {
			x.type = "password";
		}
	}
	render() {
		console.log(this.state.contra);
		return (
			<div>
				<div className="div_titulo">
					<NavMenu rut={getRut()} />
					<h2 className="titulo">PERFIL</h2>
				</div>

				<div className="content">
					<div className="panel panel-success">
						<div className="panel-heading">Información del Usuario</div>
						<div className="panel-body" >
							<span>Nombre: {this.state.NomProf}</span>
						</div>
						<div className="panel-footer">
							<span>Tipo usuario: Alumno.			</span>
						</div>
						<div className="panel-body">
							<span>Correo:{this.state.email}		</span>
						</div>
						<div className="panel-footer">
							<span>Telefono: {this.state.telefono}	</span>
						</div>
						<div className="panel-body">
							<span>Curso: {this.state.Curso}	</span>
						</div>
					</div>
					<button type="button" className="btn btn-success" data-toggle="modal" data-target="#myModal">Cambiar Contraseña</button>
				</div>
				<div className="modal fade" id="myModal" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal">&times;</button>
								<h4 className="modal-title">Cambiar Contraseña</h4>
							</div>
							<div className="modal-body">
								<form  >
									<div className="form-group">
										Contraseña Antigua
										<input ref="inputpw3" type="password" className="form-control" id = "password3" />
										<i className="glyphicon icon-eye-open glyphicon-eye-open showpw"  onClick = {this.showpassword3}></i>

									</div>
									<div className="form-group">
										Nueva Contraseña
										<input ref="inputpw1" type="password" id="password" name="password" className="form-control"/>
										<i className="glyphicon icon-eye-open glyphicon-eye-open showpw"  onClick = {this.showpassword}></i>

										</div>
										<div className="form-group">
										  Repita Contraseña:
									<input ref="inputpw2" type="password" className="form-control" pattern=".{1,19}" id="password2"/>
									<i className="glyphicon icon-eye-open glyphicon-eye-open showpw" showpw onClick = {this.showpassword2}></i>
										</div>
									<button type="button" className="btn btn-primary" onClick={this.validar}>Aceptar</button>
								</form>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
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
export default Perfil;
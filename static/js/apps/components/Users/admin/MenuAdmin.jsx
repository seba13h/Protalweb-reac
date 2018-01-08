import React from 'react';
import axios from 'axios';

function getRut() {
    return window.location.search.split('?rut=')[1];
}

class MenuAdmin extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			Admin: [],
			contra: ''
        }
        this.showpassword = this.showpassword.bind(this);
		this.showpassword2 = this.showpassword2.bind(this);
		this.showpassword3 = this.showpassword3.bind(this);
		this.validar = this.validar.bind(this);
		this.insertarData = this.insertarData.bind(this);
    }
    componentWillMount() {
		$.getJSON('/data-get-all-rut-admin', (Student) => {
			this.setState({ Admin: [...Student] });
			const filtroAdmin = this.state.Admin.filter(data => data.rut === getRut());
			this.setState({ contra: filtroAdmin[0].contraseña });
		})
    }
    insertarData() {
		const rut = getRut();
		const pw = this.refs.inputpw1.value;
		const dataAlumno = { rut ,pw};
		axios.post("/data-update-admin-password", dataAlumno);
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
        console.log(getRut());
        const rutaAlumnos=`/Admin/mAlumno?rut=${getRut()}`;
        const rutaProfesores=`/Admin/mProfesor?rut=${getRut()}`;
        const rutaRamos=`/Admin/mRamos?rut=${getRut()}`;
        const rutaHorario=`/Admin/mHorario?rut=${getRut()}`;
        const rutaCursos=`/Admin/mCursos?rut=${getRut()}`;
        return (
            <div className="content">
                <div className="div_titulo">
                    <h3 className="titulo">Menu de Administracion</h3>


                </div>
                <div className=" panel-heading menu-admin">
                    <h4 className="panel-title ">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">MANTENEDORES</a>
                        <span className="oi oi-arrow-thick-left" href="/Admin "></span>
                    </h4>
                </div>
                <div id="collapse1" className="panel-collapse collapse in">
                    <div className="panel-body">
                        <ul className="nav nav-pills nav-stacked">
                            <a href={rutaAlumnos} className="list-group-item list-group-item-action"  >Alumnos</a>
                            <a href={rutaProfesores} className="list-group-item list-group-item-action">Profesores</a>
                            <a href={rutaRamos} className="list-group-item list-group-item-action">Ramos</a>
                            <a href={rutaHorario} className="list-group-item list-group-item-action">Horario</a>
                            <a href={rutaCursos} className="list-group-item list-group-item-action">Cursos</a>
                        </ul>
                    </div>
                </div>
                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#myModal">Cambiar Contraseña</button>
                <button id="logoff" type="button" className="btn btn-danger" data-dismiss="modal"><a href = '/'>Cerrar Sesión</a></button>


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
            </div>


        )
    }
};
export default MenuAdmin;
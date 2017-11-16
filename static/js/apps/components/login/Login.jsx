import React from 'react';

class Login extends React.Component {

	render() {
        return (
            <div>  
                <form className="form-horizontal" method="post" action="authenticate2.php">
                    <div className="form-group">
                        <label htmlFor="name" className="col-sm-2 control-label">Usuario</label>
                        <div className="col-sm-10">
                            <input type="text" id="name" className="form-control" placeholder="Usuario" name="name"></input>
	    		        </div>
                    </div>
                        <div className="form-group">
                            <label htmlFor="pass" className="col-sm-2 control-label">Contraseña</label>
                            <div className="col-sm-10">
                                <input type="password" id="pass" className="form-control" placeholder="Contraseña" name="pass"></input>
	    		            </div>
                        </div>
                            <div className="form-group">
                                <label htmlFor="cursos" className="col-sm-2 control-label">Tipo usuario</label>
                                <div className="col-sm-10">
                                    <select id="curso" className="form-control" name="curso" styles="width :30%;">
                                        <option>Alumno</option>
                                        <option>Profesor</option>
                                        <option>Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button type="submit" className="btn btn-primary">Ingresar</button>
                                </div>
                            </div>
		        </form>
            </div>    
        )
    }
			
};
export default Login;


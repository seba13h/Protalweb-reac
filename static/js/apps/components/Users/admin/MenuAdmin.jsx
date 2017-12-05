import React from 'react';

class MenuAdmin extends React.Component {

    render() {
        return (
            <div>
                <div className="div_titulo">
                    <h2 className="titulo">MENU</h2>

                      <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar Sesión</button>
                    
                </div>
                <div className="panel-heading menu-admin">
                    <h4 className="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">MANTENEDORES</a>
                        <span className="oi oi-arrow-thick-left" href="/Admin "></span>
                    </h4>
                </div>
                <div id="collapse1" className="panel-collapse collapse in">
                    <div className="panel-body">
                        <ul className="nav nav-pills nav-stacked">
                            <a href="/Admin/mAlumno" className="list-group-item list-group-item-action">Alumnos</a>
                            <a href="/Admin/mProfesor" className="list-group-item list-group-item-action">Profesores</a>
                            <a href="/Admin/mRamos" className="list-group-item list-group-item-action">Ramos</a>
                            <a href="/Admin/mHorario" className="list-group-item list-group-item-action">Horario</a>
                            <a href="/Admin/mCursos" className="list-group-item list-group-item-action">Cursos</a>

                        </ul>
                    </div>
                </div>
            </div>

        )
    }
};
export default MenuAdmin;
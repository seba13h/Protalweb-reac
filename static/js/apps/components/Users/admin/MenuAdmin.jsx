import React from 'react';

function getRut() {
    return window.location.search.split('?rut=')[1];
}

class MenuAdmin extends React.Component {

    render() {
        console.log(getRut());
        const rutaAlumnos=`/Admin/mAlumno?rut=${getRut()}`;
        const rutaProfesores=`/Admin/mProfesor?rut=${getRut()}`;
        const rutaRamos=`/Admin/mRamos?rut=${getRut()}`;
        const rutaHorario=`/Admin/mHorario?rut=${getRut()}`;
        const rutaCursos=`/Admin/mCursos?rut=${getRut()}`;
        return (
            <div>
                <div className="div_titulo">
                    <h2  className="titulo">MENU</h2>

                      <button  type="button" className="btn btn-danger" data-dismiss="modal"><a href = '/'>Cerrar Sesión</a></button>

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
                            <a href={rutaAlumnos} className="list-group-item list-group-item-action"  >Alumnos</a>
                            <a href={rutaProfesores} className="list-group-item list-group-item-action">Profesores</a>
                            <a href={rutaRamos} className="list-group-item list-group-item-action">Ramos</a>
                            <a href={rutaHorario} className="list-group-item list-group-item-action">Horario</a>
                            <a href={rutaCursos} className="list-group-item list-group-item-action">Cursos</a>

                        </ul>
                    </div>
                </div>
            </div>

        )
    }
};
export default MenuAdmin;
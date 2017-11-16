import React from 'react';

class mAlumno extends React.Component {
    render() {
        return (
            <div>
                <div className="div_titulo">
                    <h2 className="titulo">MANTENEDOR ALUMNO</h2>
                    <button className="glyphicon glyphicon-menu-left return" onClick="/Admin"></button>
                </div>
                <aside>
                    <a href="login.php"><button type="button" className="btn btn-default cerrar-sesion" >Cerrar Sesion</button></a>
                </aside>
                <h1>Listado de alumnos</h1>
                <button className="btn btn-primary" >Agregar Alumno</button>
                <button type="button" className="btn btn-danger btn-sm" >
                    <span className="glyphicon glyphicon-remove"></span> Cancelar
                 </button><br /><br />
                <table id="agregar-alumno" className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Curso</th>
                            <th>Rut</th>
                            <th>Acciones</th>
                        </tr>
                        <td> ..</td>
                        <td> ..</td>
                        <td> ..</td>
                        <td >..</td>
                        <td className="zelect_rut">
                            <button className="glyphicon glyphicon-pencil"></button>
                            <button className="glyphicon glyphicon-trash" name="rut"></button>
                        </td>
                    </thead>
                </table>
            </div>
        )
    }
};
export default mAlumno;
import React from 'react';

class mProfesor extends React.Component {
    render() {
        return (
        <div>

                <div className="div_titulo">
                    <h2 className="titulo">MANTENEDOR PROFESORES</h2>
                    <a href="/Admin"> <button id="tc1" className="glyphicon glyphicon-menu-left return"></button></a>
                </div>
                
            <div className="tc2">
                <h1>Listado de Profesores</h1>
                <button className="btn btn-primary" data-toggle="modal" data-target="#myModal" >Agregar Profesor</button>
                <button type="button" className="btn btn-danger " >
                    <span className="glyphicon glyphicon-remove"></span> Cancelar
                 </button><br /><br />  

        

                <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">
    
     
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                      <h4 className="modal-title">Nuevo Profesor</h4>
                    </div>
                    <div className="modal-body">
                      
                        <form>
                          <div className="form-group">
                            Rut
                            <input type="" className="form-control" id="rut"/>
                          </div>  
                          <div className="form-group">
                            Nombre
                            <input type="" className="form-control" id="nombre"/>
                          </div>
                          <div className="form-group">
                            Email
                            <input type="" className="form-control" id="email"/>
                          </div>
                          <div className="form-group">
                            Telefono
                            <input type="" className="form-control" id="telefono"/>
                          </div>
                          <div className="form-group">
                            Contraseña:
                            <input type="" className="form-control" id="pwd"/>
                          </div>
                          <button type="submit" className="btn btn-default">Enviar</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                    </div>
                  </div>
      
                </div>
              </div>

                <table id="agregar-profesor" className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Rut</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Acciones</th>
                        </tr>
                        
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
        </div>
        )
    }
};
export default mProfesor;
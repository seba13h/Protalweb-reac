import React from 'react';

class mRamos extends React.Component {
    render() {
        return (
            <div>
                <div className="div_titulo">
                    <h2 className="titulo">MANTENEDOR RAMOS</h2>
                     <a href="/Admin"> <button id="tc1" className="glyphicon glyphicon-menu-left return"></button></a>
                </div>
            <div className="tc2">
                <h1>Listado de Ramos</h1>
                <button className="btn btn-primary" data-toggle="modal" data-target="#myModal" >Agregar Ramo</button>
                <button type="button" className="btn btn-danger " >
                    <span className="glyphicon glyphicon-remove"></span> Cancelar
                 </button><br /><br />

                


    <div className="modal fade" id="myModal" role="dialog">
    <div className="modal-dialog">
    
     
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">Nuevo Ramo</h4>
        </div>
        <div className="modal-body">
          
            <form>
              <div className="form-group">
                Codigo Ramo
                <input type="" className="form-control" id="cod_ramo"/>
              </div>  
              <div className="form-group">
                Rut Profesor
                <input type="" className="form-control" id="rut_prot"/>
              </div>
              <div className="form-group">
                Código Curso
                <input type="" className="form-control" id="cod_curso"/>
              </div>
              <div className="form-group">
                Nombre Ramo
                <input type="" className="form-control" id="nom_ramo"/>
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

                <table id="agregar-alumno" className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Código Ramo</th>
                            <th>Nombre Ramo</th>
                            <th>Cod Curso</th>
                            <th>Rut Profesor</th>
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
export default mRamos;
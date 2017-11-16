import React from 'react';
import NavMenu from './../../NavMenu';
import Footer from './../../Footer';
class Horario extends React.Component {

	render() {
		return (
			<div>
				<div className="div_titulo">
		               <NavMenu/>
									 <h2 className="titulo">HORARIO</h2>
	           </div>
			   <div className="content">

		<div className="content_2">

			<div className="panel panel-default" border= "1px solid black" >
			    <div className="list-group-item list-group-item-danger" ALIGN="center" >Detalles de la clase: </div>
			    <div className="list-group-item list-group-item-info">
			    	<span >Nombre de asignatura: Matematicas</span>
			    </div>
			    <div className="list-group-item list-group-item-info">
			    	<span>Horas: 09:40 - 11:20</span>
			    </div>
			    <div className="list-group-item list-group-item-info">
			    	<span>Sala: G202</span>
			    </div>
			    <div className="list-group-item list-group-item-info">
			    	<span>Profesor: José Rojas</span>
			    </div>

			</div>
			<table className="table table-inverse" width="137px" height ="39px">
			  <thead>
			    <tr>
			      <th >Lunes</th>
			      <th >Martes</th>
			      <th >Miercoles</th>
			      <th >Jueves</th>
			      <th >Viernes</th>
			    </tr>
			  </thead>
			  <tbody >
			    <tr >
			      <td>Mat</td>
			      <td>--</td>
			      <td>--</td>
			      <td>--</td>
			      <td>Mat</td>
			    </tr>
			    <tr height ="39px">
			      <td>Ing</td>
			      <td>Dai</td>
			      <td>--</td>
			      <td>AE</td>
			      <td>Mat</td>
			    </tr>
			    <tr>
			      <td>Ingles</td>
			      <td>Dai </td>
			      <td>Dai</td>
			      <td>--</td>
			      <td>Mat</td>
			    </tr>
			    <tr>
			      <td> -- </td>
			      <td>--</td>
			      <td>--</td>
			      <td>--</td>
			      <td>--</td>
			    </tr>
			    <tr>
			      <td> -- </td>
			      <td>--</td>
			      <td>--</td>
			      <td>--</td>
			      <td>For</td>
			    </tr>
			    <tr>
			      <td>AE</td>
			      <td>--</td>
			      <td>--</td>
			      <td>--</td>
			      <td>For</td>
			    </tr>
			  </tbody>
			</table>
		</div>
	</div>
	<div className="div_Footer">
		               <Footer/>
	           </div>
            </div>
        )
    }
};
export default Horario;
import React from 'react';
import NavMenu from './../../NavMenu';
import Footer from './../../Footer';
class Eventos extends React.Component {

	render() {
		return (
			<div>
				<div className="div_titulo">
		               <NavMenu/>
									 <h2 className="titulo">EVENTOS</h2>
	           </div>
			   <div className="content">

		<div className="content_2">
		<div className="panel panel-success">
			    <div className="panel-heading">
			      <h4 className="panel-title">
			        <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">Eventos de la semana:</a>
			      </h4>
			    </div>
			    <div id="collapse2" className="panel-collapse collapse">
			      <div className="panel-body">
			      <ul className="nav nav-pills nav-stacked">

			      	  <span className="label label-info">Martes 23</span> Evento 1
			      	  <hr/>
			      	  <span className="label label-warning">Viernes 26 </span> Evento 2
			    </ul>
			      	</div>
			    </div>
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
export default Eventos;
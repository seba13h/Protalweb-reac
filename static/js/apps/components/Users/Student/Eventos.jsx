import React from 'react';
import NavMenu from './../../NavMenu';
import Footer from './../../Footer';
import axios from 'axios';
function getRut() {
	const rut= (window.location.search.split('?rut=')[1]);
	return rut;
}


class Eventos extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      dataA:[]
		}
		this.obtenerDia=this.obtenerDia.bind(this);
	}
	obtenerDia(){
		let dia = "";
		let hoy = new Date();
		let dd = hoy.getDay();
		if (dd === 1){
			dia = "LUNES"
		}
		if (dd === 2){
			dia = "MARTES"
		}
		if (dd === 3){
			dia = "MIERCOLES"
		}
		if (dd === 4){
			dia = "JUEVES"
		}
		if (dd === 5){
			dia = "VIERNES"
		}
		if (dd === 6){
			dia = "SABADO"
		}
		if (dd === 7){
			dia = "DOMINGO"
		}
		return dia;
	}
	componentWillMount() {

	};

	render() {
     this.obtenerDia();
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
			        <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">Eventos:</a>
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
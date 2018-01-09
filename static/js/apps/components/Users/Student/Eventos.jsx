import React from 'react';
import NavMenu from './../../NavMenu';
import Footer from './../../Footer';
import axios from 'axios';

function getRut() {
	const rut= (window.location.search.split('?rut=')[1]);
	return rut;
}
function indate(fecha){

	const day = fecha.slice(0, 2);
	const mont = fecha.slice(3, 5);
	const year = fecha.slice(6, 10);
	const newfecha = (year + '-' + mont + '-' + day);
	console.log(new Date(newfecha).getTime());
	console.log(newfecha , "fecha 2")
	return newfecha;
}

class Eventos extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			dataA:[],
			dataB:[],
			dataC:[],
			dataD:[],
			fecha: { newClass: "none" },
			hora: { newClass: "none" },
			descripcion: { newClass: "none" },
			eventosClass: []
		}
		this.obtenerFecha=this.obtenerFecha.bind(this);
		this.validar=this.validar.bind(this);
		this.validar2=this.validar2.bind(this);
		this.insertarData = this.insertarData.bind(this);
		this.actualizarData = this.actualizarData.bind(this);

		this.DeleteData = this.DeleteData.bind(this);
    	this.eliminar = this.eliminar.bind(this);
    	this.handleInputChange = this.handleInputChange.bind(this);
    	this.addComponentModal = this.addComponentModal.bind(this);
	}

	DeleteData(index){
    this.setState( {dataD : this.state.dataC[index]});
  };

  handleInputChange(event){
    console.log(event)
    var inputName = event.target.name;
    var inputValue = event.target.value;
    this.setState({[inputName]:inputValue});
  }

 eliminar(){
  axios.post("/data-delete-event", this.state.dataD);
  window.location.reload();
 }


addComponentModal(index){
	const fecha = this.state.dataC[index].fecha;
	const day = fecha.slice(8,10);
		const mont = fecha.slice(5,7);
		const year = fecha.slice(0,4);
		const newfecha= (day+'-'+mont+'-'+year);
   this.setState({
      fecha: indate(this.state.dataC[index].fecha),
      hora: this.state.dataC[index].hora,
      descripcion: this.state.dataC[index].descripcion

  });

 }

actualizarData() {
    console.log("entre");
		const rut = getRut();
		const fecha = this.refs.inputfecha.value;
		const hora = this.refs.inputhora.value;
		const descripcion = this.refs.inputdescripcion.value;
		const day = fecha.slice(8,10);
		const mont = fecha.slice(5,7);
		const year = fecha.slice(0,4);
		const newfecha= (day+'-'+mont+'-'+year);
		const dataevento = { rut,newfecha , hora, descripcion };
    axios.post('/data-update-evento', dataevento);
    window.location.reload();
  }


	insertarData() {
    console.log("entre");
		const rut = getRut();
		const fecha = this.refs.inputfecha2.value;
		const hora = this.refs.inputhora2.value;
		const descripcion = this.refs.inputdescripcion2.value;
		const day = fecha.slice(8,10);
		const mont = fecha.slice(5,7);
		const year = fecha.slice(0,4);
		const newfecha= (day+'-'+mont+'-'+year);
		const dataevento = { rut,newfecha , hora, descripcion };
    axios.post('/data-insert-evento', dataevento);
    window.location.reload();
  }
	obtenerFecha(){
		var dt = new Date();
		// Display the month, day, and year. getMonth() returns a 0-based number.
		var month = dt.getMonth() + 1;
		if (month < 10){
			  month = ('0'+(dt.getMonth()+1));
		}
		var day = dt.getDate();
		if (day < 10){
			day = ('0'+dt.getDate());
		}
		var year = dt.getFullYear();
		const fecha = (year+ '-' + month + '-' + day);
		return fecha;
	}
	componentWillMount() {
		$.getJSON('/data-get-all-rut-user', (Student) => {
			this.setState({ dataA: [ ...Student ]});
			const filtroAlu=this.state.dataA.filter(data => data.rut === getRut());
			this.setState({dataA : filtroAlu});
			})
			$.getJSON('/data-get-all-quest'	, (quest) => {this.setState({ dataB: quest});
				const filtroquest=this.state.dataB.filter(data => data.cod_curso === this.state.dataA[0].cod_curso);
				const filtroFecha = filtroquest.filter(data => (new Date(indate(data.fecha)).getTime() >=  new Date(this.obtenerFecha()).getTime()));
				this.setState({dataB : filtroFecha});
				})
				$.getJSON('/data-get-all-event'	, (quest) => {this.setState({ dataC: quest});
				const filtroevent=this.state.dataC.filter(data => data.rut_alu ===  getRut() );
				const filtroFecha2 = filtroevent.filter(data => (new Date(indate(data.fecha)).getTime() >=  new Date(this.obtenerFecha()).getTime()));
				console.log(filtroFecha2);
				this.setState({dataC : filtroFecha2});
				})
	};
	validar() {
    const fecha = this.refs.inputfecha2.value;
    const hora = this.refs.inputhora2.value;
		const descripcion = this.refs.inputdescripcion2.value;
		const day = fecha.slice(8,10);
		const mont = fecha.slice(5,7);
		const year = fecha.slice(0,4);
		const newfecha= (day+'-'+mont+'-'+year);
		if (fecha == ""){
			alert("la fecha esta vacia");
			return false;
		}else if (new Date(newfecha).getTime() <  new Date(this.obtenerFecha()).getTime()){
			alert("La fecha es inferior a la actual");
			return false;
		}
		if (hora == "") {
      alert("Hora vacia");
      return false;
    }
    if (descripcion == "") {
      alert("descripcion vacia");
      return false;
		}
    alert('Insertando evento');
    this.insertarData();
  }

validar2() {
    const fecha = this.refs.inputfecha.value;
    const hora = this.refs.inputhora.value;
		const descripcion = this.refs.inputdescripcion.value;
		const day = fecha.slice(8,10);
		const mont = fecha.slice(5,7);
		const year = fecha.slice(0,4);
		const newfecha= (day+'-'+mont+'-'+year);
		if (fecha == ""){
			alert("la fecha esta vacia");
			return false;
		}else if (new Date(newfecha).getTime() <  new Date(this.obtenerFecha()).getTime()){
			alert("La fecha es inferior a la actual");
			return false;
		}
		if (hora == "") {
      alert("Hora vacia");
      return false;
    }
    if (descripcion == "") {
      alert("descripcion vacia");
      return false;
		}
    alert('Insertando evento');
    this.actualizarData();
  }

	render() {
		console.log(this.obtenerFecha())
			let lisQuest = this.state.dataB.map( data => (
				<div>
				<span className="label label-warning">{data.fecha}</span><span className="label label-info"> {data.cod_ramo}</span> <a>  {data.descripcion} - Hora {data.hora} - Sala de Clases :{data.sala_clases} </a>
				<hr/>
				</div>
			)
		)
		if (lisQuest.length === 0){
			lisQuest = <li className="list-group-item">  no tiene Pruebas Fijadas </li>
			}
		let listEvent = this.state.dataC.map( (data,index) => (
			<div>
						  <span className="label label-info">{data.fecha}</span> <a> {data.descripcion} - Hora:{data.hora}</a>
								<button className="glyphicon glyphicon-pencil" data-toggle="modal" data-target="#myModal2"  onClick={() => this.addComponentModal(index) }></button>
          			<button className="glyphicon glyphicon-trash" data-toggle="modal" data-target="#myModal3" onClick={() => this.DeleteData(index) }></button>
			</div>
		)
	)
	 if (listEvent.length === 0){
		listEvent = <li className="list-group-item">  no tiene Eventos Fijados </li>
	 	}
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
			        <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">Eventos</a>
					<button type="button" className="btn btn-primary addevent" data-toggle="modal" data-target="#myModal">+</button>
			      </h4>
			    </div>
			    <div id="collapse2" className="panel-collapse collapse">
			      <div className="panel-body">
			      <ul className="nav nav-pills nav-stacked">
					{listEvent}
			    </ul>
			      	</div>
			    </div>
			  </div>
			  <div className="panel panel-success">
			    <div className="panel-heading">
			      <h4 className="panel-title">
			        <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">Pruebas</a>
			      </h4>
			    </div>
			    <div id="collapse3" className="panel-collapse collapse">
			      <div className="panel-body">
			      <ul className="nav nav-pills nav-stacked">
			      	  {lisQuest}
			    </ul>
			      	</div>
			    </div>
			  </div>

		</div>

		<div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Agregar Eventos</h4>
              </div>
              <div className="modal-body">
                <form  >
                  <div className="form-group">
                    Fecha
										<input  className="form-control" id="date" type="date"  ref="inputfecha2"/>
                  </div>
									<div className="form-group">
                    Hora
              			<input ref="inputhora2" className="form-control"  id="time" type="time"  />
                  </div>
                  <div className="form-group">
                    Descripcion
									<	textarea className="form-control" id="exampleFormControlTextarea1" rows="3" ref="inputdescripcion2"></textarea>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={this.validar}>Aceptar</button>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
              </div>
            </div> {/* Modal Agregar */}
          </div>
        </div>

        <div className="modal fade" id="myModal2" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Modificar Eventos</h4>
              </div>
              <div className="modal-body">
                <form  >
                  	<div className="form-group">
                    Fecha
					<input className="form-control"  id="date" type="date"  ref="inputfecha" name="fecha" onChange={this.handleInputChange}  value={this.state.fecha}/>
                	</div>
					<div className="form-group">
                    Hora
              			<input ref="inputhora" className="form-control"  id="time" type="time" name="hora" onChange={this.handleInputChange}  value={this.state.hora}  />
                  </div>
                  <div className="form-group">
                    Descripcion
<	textarea className="form-control" id="exampleFormControlTextarea1" rows="3" ref="inputdescripcion" name="descripcion" onChange={this.handleInputChange}  value={this.state.descripcion}></textarea>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={this.validar2}>Aceptar</button>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
              </div>
            </div> {/* Modal Modificar */}
          </div>
        </div>
				<div className="modal fade" id="myModal3" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Eliminar Registro</h4>
              </div>
              <div className="modal-body">

                <p>Seguro que desea eliminar el registro?</p>
                <button type="submit" className="btn btn-primary" onClick={this.eliminar}>Aceptar</button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
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
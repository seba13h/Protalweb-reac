import React, {Component} from 'react';
import NavMenu from './../../NavMenuProf';
import Footer from './../../Footer';
import axios from 'axios';

function getRut() {
	const rut= (window.location.search.split('?rut=')[1]);
	return rut;
}
class Notas extends Component {
	 constructor(props){
			super(props);
			this.state= {
				dataRamo: [],
				dataA:[],
				dataNota:[],
				ramo:'',
				rutAlu:'',
				Nnota:''
			}
			this.listAlu = this.listAlu.bind(this);
			this.listNotas = this.listNotas.bind(this);
			this.addcomponent = this.addcomponent.bind(this);
			this.validarNota = this.validarNota.bind(this);
			this.insertarData = this.insertarData.bind(this);
		}
		insertarData() {
			console.log("entre");
			const rut = this.state.rutAlu;
			const ramo = this.state.ramo;
			const numeroNota = this.state.Nnota;
			const Nota = this.refs.inputNota.value;
			const Ponderacion = this.refs.inputPonderacion.value;
			const semestre = this.refs.inputSemestre.value;
			var dt = new Date();
			const año =  dt.getFullYear();
			const dataNota = { rut ,ramo,numeroNota,año,semestre,Ponderacion,Nota };
			axios.post('/data-insert-Nota', dataNota);
			window.location.reload();
		  }
		validarNota() {
			const Nota = this.refs.inputNota.value;
			const Ponderacion = this.refs.inputPonderacion.value;
			console.log(Nota , Ponderacion);
			if (Nota == "") {
			  alert("Ingrese una Nota");
			  return false;
			}else if (Nota > 100){
				alert("Ingrese una Nota entre 0-100");
				return false;
			}
			if (Ponderacion == "") {
			  alert ("Ponderacion Vacia");
			  return false;
			}
			else if (Ponderacion > 100){
			  alert("Ingrese una ponderacion entre 0-100 %");
			  return false;
			}
			alert('Insertando Nota');
			this.insertarData();
		  }
	addcomponent(index,item){
		this.setState({
			ramo:  this.state.dataRamo[item].cod_ramo,
			rutAlu: this.state.dataA[index].rut_alu,
			Nnota:  this.state.dataNota.filter(data => data.rut_alu === this.state.dataA[index].rut_alu && data.cod_ramo === this.state.dataRamo[item].cod_ramo).length + 1
		});
		// const ramo = this.state.dataRamo[item].cod_ramo;
		// const rutAlu = this.state.dataA[index].rut_alu;
		// const nota = this.state.dataNota.filter(data => data.rut_alu === this.state.dataA[index].rut_alu && data.cod_ramo === this.state.dataRamo[item].cod_ramo).length + 1;
	}
	listNotas(rut,ramo){
		let filtroNota = this.state.dataNota.filter(data => data.rut_alu === rut && data.cod_ramo === ramo).map(data => (
				<td>{data.nota}</td>
		));
		if (filtroNota.length === 0){
			filtroNota = <td>..</td>
		}
		return filtroNota;

	}
	listAlu(curso,cod_ramo,item){
		const listaAlumno = this.state.dataA.filter((data,index) => data.cod_curso === curso).map((data,index)=>(
			<div>
				<td className = "nombreTab">	{data.nom_alu} </td>
				<td>{this.listNotas(data.rut_alu,cod_ramo)}</td>
				<td>	<button type="button" className="btn btn-primary"  data-toggle="modal" data-target="#myModal" onClick = {()=>this.addcomponent(index,item)}>+</button></td>
			</div>
		)
		);;
		return listaAlumno;
	}
			componentDidMount() {

						$.getJSON('/data-get-all-menu-teacher').then(data => this.setState({ dataRamo: data}));
						$.getJSON('/data-get-all-user').then(data => this.setState({ dataA: data}));
						$.getJSON('/data-get-all-rut-detallenota').then(data => this.setState({ dataNota: data}));
					}
	render() {
		const listNotas=	<td></td>;
		const filtroProf= this.state.dataRamo.filter((data,index)=> data.rut === getRut());
		const RamoN = filtroProf.map((data,index)=>
		(
		<div className="panel panel-default">
		<div className="panel-heading">
		<h4 className="panel-title">
		<a data-toggle="collapse" data-parent="#accordion" href="#collapse1">{data.nom_ramo}                                 - Curso : {data.cod_curso}</a>
		</h4>
		</div>
		<div id="collapse1" className="panel-collapse collapse in">
			<div className="panel-body">
				<table className="tc3" >
					<tbody>
					<tr>
						<th>Nombre Alumno</th>
						<th>Notas </th>
						<th>Agregar Nota</th>
					</tr>
					{this.listAlu(data.cod_curso,data.cod_ramo,index)}
					</tbody>
				</table>
			</div>
		</div>
	</div>)
		);
		return (
			<div>
				<div className="div_titulo">
				<NavMenu rut={getRut()}/>
					<h2 className="titulo">NOTAS</h2>
				</div>
				<div className="content">
					<div className="content_2">
						<div className="panel-group" id="accordion">
						{RamoN}
						</div>
					</div>
					</div>
					<div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Agregar Nota</h4>
              </div>
              <div className="modal-body">

                <form>

                  <div className="form-group">
                    Nota
              <input maxLength="3" ref="inputNota" className="form-control"  />
                  </div>
                  <div className="form-group">
                    Ponderacion
			  <input ref="inputPonderacion" maxLength="3" placeholder="99" className="form-control"/>
                  </div>
                  <div className="form-group">
                    Semestre
                    <select className="form-control" ref="inputSemestre" >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </select>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={this.validarNota}>Aceptar</button>
                </form>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
              </div>
            </div> {/* Modal Agregar */}

          </div>
        </div>
					<div className="div_Footer">
						<Footer />
					</div>
				</div>
				)
    }
};
export default Notas;
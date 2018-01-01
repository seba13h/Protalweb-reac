import React from 'react';
import NavMenu from './../../NavMenu';
import Footer from './../../Footer';

function getRut() {
	const rut = (window.location.search.split('?rut=')[1]);
	return rut;
}
function ajustedArr(arr){
	let newArr = new Array(18).fill("-");
	if (arr.length){
		for(let i = 0; i < arr.length;i++ ){
			newArr[arr[i].num_bloque-1] = arr[i];
		}
	}

	return newArr;
}
const Item = data => {
	if (data.length ){
		data.map((data, index) => {
			if(num_bloque === index + 1){
				return <li className="list-group-item item2">{cod_ramo}</li>
			}
		})
	}
        return <li className="list-group-item item2">-</li>
}

class Horario extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			horarioClass: [],
			curso: [],
			alumno: []
		}
	}

	componentWillMount() {
		$.getJSON('/data-get-all-horario').then(data => this.setState({ horarioClass: data }));
		$.getJSON('/data-get-all-rut-user', (student) => {
			this.setState({ alumno: [...student] });
			const filtroProf = this.state.alumno.filter(data => data.rut === getRut());
			this.setState({ curso: filtroProf[0].cod_curso });
		})
	};
	render() {
		const horarioA = this.state.horarioClass.filter(data => data.cod_curso === this.state.curso);
		const horarioLunes = horarioA.filter(data => data.dia === "LUNES");
		const horarioMartes = horarioA.filter(data => data.dia === "MARTES");
		const horarioMiercoles = horarioA.filter(data => data.dia === "MIERCOLES");
		const horarioJueves = horarioA.filter(data => data.dia === "JUEVES");
		const horarioViernes = horarioA.filter(data => data.dia === "VIERNES");
		const horarioSabado = horarioA.filter(data => data.dia === "SABADO");

		const information = [{ day: "lunes", info: ajustedArr(horarioLunes) }, { day: "Martes", info:  ajustedArr(horarioMartes) }, { day: "Miercoles", info:  ajustedArr(horarioMiercoles) },
		{ day: "Jueves", info:  ajustedArr(horarioJueves) }, { day: "Viernes", info:  ajustedArr(horarioViernes) }, { day: "Sabado", info:  ajustedArr(horarioSabado) }]


		const days = information.map((data, index ) => {
			const items = data.info.length ? data.info.map((item, index) => {

				if(item.num_bloque === index + 1){
					return <li className="list-group-item item1">{item.cod_ramo}</li>
				}
				return  <li className="list-group-item item2 ">-</li>
			}) : <li className="list-group-item item2">-</li>;

			return(
				<div className="div_Dia">
					<ul className="list-group">
					<li className="list-group-item active">	{data.day}</li>
						 {items}
					</ul>
				</div>
			)
		})

		return (
			<div>
				<div className="div_titulo">
					<NavMenu />
					<h2 className="titulo">HORARIO</h2>
				</div>
				<div className="content contenido">
					<div className="content_2 horario">
					<ul className="list-group bloque">
								<li className="list-group-item active">	Bloque</li>
								<li className="list-group-item item2">8:00</li>
								<li className="list-group-item item2">8:45</li>
								<li className="list-group-item item2">9:30</li>
								<li className="list-group-item item2">10:15</li>
								<li className="list-group-item item2">11:00</li>
								<li className="list-group-item item2">11:45</li>
								<li className="list-group-item item2">12:30</li>
								<li className="list-group-item item2">13:15</li>
								<li className="list-group-item item2">14:00</li>
								<li className="list-group-item item2">14:45</li>
								<li className="list-group-item item2">15:30</li>
								<li className="list-group-item item2">16:15</li>
								<li className="list-group-item item2">17:00</li>
								<li className="list-group-item item2">17:45</li>
								<li className="list-group-item item2">18:30</li>
								<li className="list-group-item item2">19:15</li>
								<li className="list-group-item item2">20:00</li>
								<li className="list-group-item item2">20:45</li>
						</ul>
								{days}
						</div>

					</div>

				<div className="div_Footer">
					<Footer />
				</div>
			</div>
		)
	}
};
export default Horario;
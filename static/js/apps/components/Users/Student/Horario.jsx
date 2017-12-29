import React from 'react';
import NavMenu from './../../NavMenu';
import Footer from './../../Footer';

function getRut() {
	const rut = (window.location.search.split('?rut=')[1]);
	return rut;
}

class Horario extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			horarioClass: [],
			Curso: [],
			Alumno: []
		}
	}
	componentWillMount() {
		$.getJSON('/data-get-all-horario').then(data => this.setState({ horarioClass: data }));
		$.getJSON('/data-get-all-rut-user', (Student) => {
			this.setState({ Alumno: [...Student] });
			const filtroProf = this.state.Alumno.filter(data => data.rut === getRut());
			this.setState({ Curso: filtroProf[0].cod_curso });
		})
	};
	render() {
		const horarioA = this.state.horarioClass.filter(data => data.cod_curso === this.state.Curso);
		console.log(horarioA)
		const horarioLunes = horarioA.filter(data => data.div_Dia === "LUNES");
		console.log(horarioLunes);
		const horarioMartes = horarioA.filter(data => data.div_Dia === "MARTES");
		const horarioMiercoles = horarioA.filter(data => data.div_Dia === "MIERCOLES");
		const horarioJueves = horarioA.filter(data => data.div_Dia === "JUEVES");
		const horarioViernes = horarioA.filter(data => data.div_Dia === "VIERNES");
		const horarioSabado = horarioA.filter(data => data.div_Dia === "SABADO");
		const information = [{ day: "lunes", info: horarioLunes }, { day: "Martes", info: horarioMartes }, { day: "Miercoles", info: horarioMiercoles },
		{ day: "Jueves", info: horarioJueves }, { day: "Viernes", info: horarioViernes }, { day: "Sabado", info: horarioSabado }]
		console.log(information);

		return (
			<div>
				<div className="div_titulo">
					<NavMenu />
					<h2 className="titulo">HORARIO</h2>
				</div>
				<div className="content">
					<div className="content_2 Horario">
					<div clasName="div_Dia">
						<ul className="list-group div_Dia">
							<li className="list-group-item ">..</li>
							<li className="list-group-item ">1</li>
							<li className="list-group-item">2</li>
							<li className="list-group-item">3</li>
							<li className="list-group-item">4</li>
							<li className="list-group-item">5</li>
							<li className="list-group-item">6</li>
						</ul>
						</div>
					<div clasName="div_Dia">
						<ul className="list-group div_Dia">
							<li className="list-group-item active">Lunes</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
						</ul>
						</div>
						<div clasName="div_Dia">
						<ul className="list-group div_Dia">
							<li className="list-group-item active">Martes</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
						</ul>
						</div>
						<div clasName="div_Dia">
						<ul className="list-group div_Dia">
							<li className="list-group-item active">Miercoles</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
						</ul>
						</div>
						<div clasName="div_Dia">
						<ul className="list-group div_Dia">
							<li className="list-group-item active">Jueves</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
						</ul>
						</div>
						<div clasName="div_Dia ">
						<ul className="list-group div_Dia">
							<li className="list-group-item active">Viernes</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
						</ul>
						</div>
						<div clasName="div_Dia">
						<ul className="list-group div_Dia">
							<li className="list-group-item active">Sabado</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
							<li className="list-group-item">..</li>
						</ul>
						</div>
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
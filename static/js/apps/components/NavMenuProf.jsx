import React from 'react';
function openNav() {
    document.getElementById("mySidenav").style.width = "45%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

class NavMenuProf extends React.Component {
    openNav() {
	    document.getElementById("mySidenav").style.width = "45%";
	}

	closeNav() {
	    document.getElementById("mySidenav").style.width = "0";
	}

    render() {
        const rutaPerfil=`/Profesor/perfil?rut=${this.props.rut}`;
        const rutaInicio=`/Profesor?rut=${this.props.rut}`;
        const rutaNotas=`/Profesor/Notas?rut=${this.props.rut}`;
        const rutaHorario=`/Profesor/Horario?rut=${this.props.rut}`;
        const rutaEventos=`/Profesor/Eventos?rut=${this.props.rut}`;

        console.log(this.props.rut);
        return (
            <div className="display">
                <div id="mySidenav" className="sidenav">
                    <a className="closebtn" onClick={()=>closeNav()}>&times;</a>
                    <a href={rutaInicio} >Inicio </a>
                    <a href={rutaPerfil} > Perfil </a>
                    <a href={rutaNotas} >Notas</a>
                    <a href={rutaHorario} >Horario</a>
                    <a href={rutaEventos} >Eventos</a>

                </div>
                <div className="openNave">
                <span className="openNav" onClick={()=>openNav()}>&#9776;</span>
	            </div>
            </div>
            )
        }
    };
    export default NavMenuProf;
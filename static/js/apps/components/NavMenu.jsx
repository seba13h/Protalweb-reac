import React from 'react';

function getRut() {
    return window.location.search.split('?rut=')[1];
}


function openNav() {
    document.getElementById("mySidenav").style.width = "45%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
class NavMenu extends React.Component {
    openNav() {
	    document.getElementById("mySidenav").style.width = "45%";
	}

	closeNav() {
	    document.getElementById("mySidenav").style.width = "0";
	}

    render() {
         const rutaPerfil=`/sesion/perfil?rut=${getRut()}`;
        const rutaInicio=`/sesion?rut=${getRut()}`;
        const rutaNotas=`/sesion/Notas?rut=${getRut()}`;
        const rutaHorario=`/sesion/horario?rut=${getRut()}`;
        const rutaEventos=`/sesion/Eventos?rut=${getRut()}`;
        const rutaCursos=`/sesion/Curso?rut=${getRut()}`;

        return (
            <div className="display">
                <div id="mySidenav" className="sidenav">
                    <a className="closebtn" onClick={()=>closeNav()}>&times;</a>
                    <a href={rutaInicio} >Inicio </a>
                    <a href={rutaPerfil} > Perfil </a>
                    <a href={rutaNotas} >Notas</a>
                    <a href={rutaHorario} >Horario</a>
                    <a href={rutaEventos} >Eventos</a>
                    <a href={rutaCursos} >Cursos</a>
                    <a href='/' >Cerrar Sesion</a>
                </div>
                <div className="openNave">
                <span className="openNav" onClick={()=>openNav()}>&#9776;</span>
	            </div>
            </div>
            )
        }
    };
    export default NavMenu;
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
        return (
            <div className="display">
                <div id="mySidenav" className="sidenav">
                    <a className="closebtn" onClick={()=>closeNav()}>&times;</a>
                    <a href="/Profesor" >Inicio </a>
                    <a href="/Profesor/perfil">Perfil</a>
                    <a href="/Profesor/Notas">Notas</a>
                    <a href="/Profesor/horario">Horario</a>
                    <a href="/Profesor/Eventos">Eventos</a>
                    <a href="/Profesor/Curso">Cursos</a>
                </div>
                <div className="openNave">
                <span className="openNav" onClick={()=>openNav()}>&#9776;</span>
	            </div>
            </div>
            )
        }
    };
    export default NavMenuProf;
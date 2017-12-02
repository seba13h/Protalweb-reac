import React from 'react';
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
        return (
            <div className="display">
                <div id="mySidenav" className="sidenav">
                    <a className="closebtn" onClick={()=>closeNav()}>&times;</a>
                    <a href="/sesion" >Inicio </a>
                    <a href="/sesion/perfil" >Perfil</a>
                    <a href="/sesion/notas">Notas</a>
                    <a href="/sesion/horario">Horario</a>
                    <a href="/sesion/eventos">Eventos</a>
                    <a href="/sesion/curso">Cursos</a>
                </div>
                <div className="openNave">
                <span className="openNav" onClick={()=>openNav()}>&#9776;</span>
	            </div>
            </div>
            )
        }
    };
    export default NavMenu;
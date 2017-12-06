import React from 'react';

import Perfil from './components/Users/Student/Perfil';
import Pam from './components/Users/Student/Pam';
import Ajustes from './components/Users/Student/Ajustes';
import Curso from './components/Users/Student/Curso';
import Eventos from './components/Users/Student/Eventos';
import Horario from './components/Users/Student/Horario';
import Notas from './components/Users/Student/Notas';

import MenuAdmin from './components/Users/admin/MenuAdmin';
import Malumno from './components/Users/admin/mAlumno';
import Mprofesor from './components/Users/admin/mProfesor';
import Mramos from './components/Users/admin/mRamos';
import Mhorario from './components/Users/admin/mHorario';
import Mcursos from './components/Users/admin/mCursos';


import MenuProfesor from './components/Users/Teacher/menuProf';
import EventosP from './components/Users/Teacher/Eventos';
import NotasP from './components/Users/Teacher/Notas';
import PerfilP from './components/Users/Teacher/PerfilProf';
import HorarioP from './components/Users/Teacher/Horario';

import Login2 from './components/Login/Login2';

import ReactDOM from 'react-dom';
import NavMenu from './components/NavMenu';
import { browserHistory, Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
const history = useRouterHistory(createHistory)({
    basename: '/base-path'
  });

ReactDOM.render(
    <Router history={ browserHistory }>
        <Route path="/" component={ Login2 } />
        <Route path="/sesion" component={ Pam } />
        <Route path="/sesion/ajustes" component={ Ajustes } />
        <Route path="/sesion/curso" component={ Curso } />
        <Route path="/sesion/eventos" component={ Eventos } />
        <Route path="/sesion/horario" component={ Horario } />
        <Route path="/sesion/notas" component={ Notas } />
        <Route path="/sesion/perfil" component={ Perfil } />

        <Route path="/Admin" component={ MenuAdmin } />
        <Route path="/Admin/mAlumno" component={ Malumno } />
        <Route path="/Admin/mProfesor" component={ Mprofesor } />
        <Route path="/Admin/mRamos" component={ Mramos } />
        <Route path="/Admin/mHorario" component={ Mhorario } />
        <Route path="/Admin/mCursos" component={ Mcursos } />

        <Route path="/Profesor" component={ MenuProfesor } />
        <Route path="/Profesor/Eventos" component={ EventosP } />
        <Route path="/Profesor/Notas" component={ NotasP } />
        <Route path="/Profesor/perfil" component={ PerfilP } />
        <Route path="/Profesor/Horario" component={ HorarioP } />
    </Router>,

    document.getElementById('app')

)

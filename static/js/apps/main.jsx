import React from 'react';
import Perfil from './components/Perfil';

import Pam from './components/Users/Student/Pam';
import Ajustes from './components/Users/Student/Ajustes';
import Curso from './components/Users/Student/Curso';
import Eventos from './components/Users/Student/Eventos';
import Horario from './components/Users/Student/Horario';
import Notas from './components/Users/Student/Notas';

import MenuAdmin from './components/Users/admin/MenuAdmin';
import Malumno from './components/Users/admin/mAlumno';

import Login from './components/Login/Login';
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

    </Router>,

    document.getElementById('app')

)

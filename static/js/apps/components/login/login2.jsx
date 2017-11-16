import React from 'react';
import Footer from './../Footer';
class Login2 extends React.Component {

  render() {
    return (
      <div>
        <div className="HeadImg head">
          <img src="http://lh-memor.inf.utfsm.cl/wp-content/uploads/2016/01/logo-blog.png" />
        </div>
        <div className="login">
          <h2>Iniciar sesion</h2>
          <input name="username" placeholder="Rut Usuario" type="text" />
          <input id="pw" name="password" placeholder="Contraseña" type="password" />
          <div className="remember">
            <input checked="" id="remember" name="remember" type="checkbox" />
            <label htmlFor="remember"></label>     Guardar Contraseña?
        </div>
          <input type="submit" value="Iniciar sesion" />
          <a className="forgot" href="#">Olvido su contraseña?</a>
        </div>
        <Footer />
      </div>
    )

  }
};
export default Login2;
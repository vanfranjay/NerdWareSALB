import React from 'react';
import '../css/logIn.css';

const Login = () => {
    return (
        <div className='contentFormLogIn'>
            <form className='formLogIn'>
                <div class="mb-3 emailAddress">
                  {/*<label for="exampleInputEmail1" class="form-label">Email address</label>*/}
                  <input type="email" class="form-control inputEmail" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email address' required/>
                </div>
                <div class="mb-3 passwordEmail">
                  {/*<label for="exampleInputPassword1" class="form-label">Password</label>*/}
                  <input type="password" class="form-control inputPassword" id="exampleInputPassword1" placeholder='Password' required/>
                </div>
                <button type='submit' class="btn btn-primary letrasBotonLogin iniciarSesionForm">Iniciar Sesión</button>
                <button type="reset" class="btn btn-primary letrasBotonLogin cancelarFormLogin">Cancelar</button>
            </form>
        </div>
    );
}

export default Login;
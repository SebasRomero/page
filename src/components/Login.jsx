import React, { useContext } from 'react'
import { db, auth } from '../firebase'
import { UserContext } from '../context/UserProvider';
import { Navigate, useNavigate } from 'react-router';
import { useFirestore } from '../hooks/useFirestore';

const Login = () => {

  const {addUser} = useFirestore();
  const [modoRegistro, setModoRegistro] = React.useState(true);
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(null);
  const { userRegister, userLogin } = useContext(UserContext)
  const navigate = useNavigate()

  const saveData = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Ingrese email')
      return
    }
    if (!password.trim()) {
      setError('Ingrese la contraseña')
      return
    }
    if (modoRegistro == true) {

      if (password.length < 6) {
        setError('Contraseña debe tener más de 7 caracteres')
        return
      }
    }
    setError(null);
    if (modoRegistro) {
      register()
    } else {
      log()
    }
  }


  //Register
  const register = async (e) => {
    console.log("procesando form: ", email, password)
    try {
      await userRegister(email, password)
      await addUser(email,password)
      navigate("/");
    } catch (error) {
      console.log(error.code)
      if (error.code === 'auth/invalid-email') {
        setError('Email no válido')
      }
      if (error.code === 'auth/email-already-in-use') {
        setError('Email ya registrado')
      }
    }
    setEmail('')
    setPassword('')
  }

  //Login

  const log = async (e) => {
    console.log("Ingresando")
    try {
      await userLogin(email, password)
      navigate("/");
      console.log(error.code)
    } catch (error) {
      if (error.code === 'auth/user-not-found'){
        setError('Usuario no encontrado')
      }
      if (error.code === 'auth/wrong-password'){
        setError('Contraseña incorrecta')
      }
      if (error.code === 'auth/too-many-requests'){
        setError('Demasiados intentos, intente más tarde')
      }
      
    }
    setEmail('')
    setPassword('')
  }


  return (
    <>
      <div>
        <h3 className='text-center'>
          {
            modoRegistro ? 'Registro de usuarios' : 'Login'
          }
        </h3>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-6 col-xl-4">
            <form onSubmit={saveData}>
              {
                error && (<div className="alert alert-danger">
                  {error}
                </div>)
              }
              <input type="email" className="form-control mb-3"
                placeholder="Ingrese su email"
                onChange={e => setEmail(e.target.value)}
                value={email}></input>

              <input type="password" className="form-control mb-3"
                placeholder="Ingrese su password"
                onChange={e => setPassword(e.target.value)}
                value={password}></input>
              <div className="d-grid gap-2">
                <button className="btn btn-primary">
                  {
                    modoRegistro ? 'Registrarse' : 'Acceder'
                  }
                </button>
                <button className="btn btn-primary" type="button"
                  onClick={() => { setModoRegistro(!modoRegistro) }}>
                  {
                    modoRegistro ? 'Ya estás registrado?' : 'Registrarse'
                  }
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )


}

export default Login
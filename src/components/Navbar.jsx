import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserProvider';

const Navbar = () => {
  const { user, signOutUser } = useContext(UserContext);
  const handleClickLogOut = async () => {
    try {
      await signOutUser()
    } catch (error) {
      console.log(error.code)
    }
  }
  return (
    <div className="navbar navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Login Cuc</Link>
      <div className="d-flex">
        <Link to="/" className="btn btn-dark mr-3">Home</Link>
        {user ? (
          <>
            (<Link to="/createreq" className="btn btn-dark mr-3">Create</Link>)
            (<Link to="/queryreq" className="btn btn-dark mr-3">Query</Link>)
            <button  className="btn btn-dark mr-3" onClick={handleClickLogOut} >Log out</button>
          </>
        ) : (<Link to="/login" className="btn btn-dark mr-3">Login</Link>)}


      </div>
    </div>
  )
}

export default Navbar
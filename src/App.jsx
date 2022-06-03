import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home';
import Admin from './components/Admin';
import Navbar from './components/Navbar';
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';
import CreateReq from './components/CreateReq';
import QueryReq from './components/QueryReq';
import { useContext } from 'react';
import { UserContext } from './context/UserProvider';
function App() {

  const {user} = useContext(UserContext)
  if(user === false){
    return <p>Loading...</p>
  }
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="createreq" element={<RequireAuth><CreateReq/></RequireAuth>} />
        <Route path="queryreq" element={<RequireAuth><QueryReq/></RequireAuth>} />

      </Routes>
    </div>
  );
}

export default App;

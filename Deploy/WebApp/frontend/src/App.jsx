import './App.css'
import Login from './pages/Login.jsx';
import {Routes, Route,Navigate} from 'react-router-dom';
import { useAuthContext } from './context/AuthContext.jsx';
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx';
import { useLogOut } from './Hooks/useLogOut.jsx';

function App() {

  const {authUser}=useAuthContext();
  const {logout}=useLogOut();

  return (
    <div>
      <Routes>
        <Route path='/*' element={authUser?<Home/>:<Navigate to='/login'/>}/>
      <Route path='/login' element={authUser? <Navigate to='/'/>:<Login/>}/>
      <Route path='/signup' element={authUser? <Navigate to='/'/>:<SignUp/>}/>
      </Routes>
      <button onClick={logout}>LogOut</button>
    </div>
  )
}

export default App

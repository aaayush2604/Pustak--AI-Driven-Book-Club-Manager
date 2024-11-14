import './App.css'
import Login from './pages/Login.jsx';
import {Routes, Route,Navigate} from 'react-router-dom';
import { useAuthContext } from './context/AuthContext.jsx';
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx';
import { useLogOut } from './Hooks/useLogOut.jsx';

function App() {

  const {authUser}=useAuthContext();

  return (
    <div className="flex flex-col">
  <Routes>
    <Route path='/*' element={authUser ? <Home /> : <Navigate to='/login' />} />
    <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
    <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
  </Routes>
  
</div>
  )
}

export default App

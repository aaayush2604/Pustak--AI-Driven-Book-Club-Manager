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
    <div className="flex flex-col">
  <Routes>
    <Route path='/*' element={authUser ? <Home /> : <Navigate to='/login' />} />
    <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
    <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
  </Routes>
  
  <div className=" mb-4">
    {authUser && <button
      onClick={logout}
      className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 transition duration-200"
    >
      Log Out
    </button>}
  </div>
</div>
  )
}

export default App

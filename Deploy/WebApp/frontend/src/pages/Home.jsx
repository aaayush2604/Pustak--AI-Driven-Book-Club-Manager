import React from 'react'
import RegisterBookClub from './BookClub/Register';
import {Routes, Route} from 'react-router-dom';
import JoinBookClub from './BookClub/Join';
import FavoriteBooks from './SelectTop5';
import BookClubDetail from '../components/BookClubDetail';
import { useLogOut } from '../Hooks/useLogOut.jsx';
import { useAuthContext } from "../context/AuthContext.jsx"

const Home = () => {

  const {authUser}=useAuthContext();
  const {logout}=useLogOut();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat bg-clip-border bg-[url(/Mobile_Wallpaper.jpeg)] sm:bg-[url(/Desktop_Wallpaper.jpeg)]">
        <Routes>
            <Route path='/' element={<JoinBookClub/>}/>
            <Route path='/register' element={<RegisterBookClub/>}/>
            <Route path='/selectTop5' element={<FavoriteBooks/>}/>
            <Route path='/bookClub/:bookClubId' element={<BookClubDetail/>}/>
        </Routes>
        <div>
          {authUser && <button
            onClick={logout}
            className="py-2 px-4 mt-5 bg-black text-white font-semibold rounded-md hover:bg-[#4b4b4b] transition duration-200"
          >
            Log Out
          </button>}
        </div>
    </div>
  )
}

export default Home

import React from 'react'
import RegisterBookClub from './BookClub/Register';
import {Routes, Route} from 'react-router-dom';
import JoinBookClub from './BookClub/Join';
import FavoriteBooks from './SelectTop5';
import BookClubDetail from '../components/BookClubDetail';

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat bg-clip-border bg-[url(/Mobile_Wallpaper.jpeg)] sm:bg-[url(/Desktop_Wallpaper.jpeg)]">
        <Routes>
            <Route path='/' element={<JoinBookClub/>}/>
            <Route path='/register' element={<RegisterBookClub/>}/>
            <Route path='/selectTop5' element={<FavoriteBooks/>}/>
            <Route path='/bookClub/:bookClubId' element={<BookClubDetail/>}/>
        </Routes>
    </div>
  )
}

export default Home

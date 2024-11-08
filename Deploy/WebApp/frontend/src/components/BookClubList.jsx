// BookClubsList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const BookClubsList = ({trigger}) => {
  const [bookClubs, setBookClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {authUser}=useAuthContext();
  console.log(authUser);

  useEffect(() => {
    // Fetch the list of book clubs the user is part of
    const fetchBookClubs = async () => {
      try {
        const response = await fetch(`http://localhost:8000/bookClub/${authUser.userId}/bookclubs`);
        if (!response.ok) {
          throw new Error('Failed to fetch book clubs');
        }
        const data = await response.json();
        setBookClubs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookClubs();
  }, [authUser.userId, trigger]);

  const handleBookClubClick = (bookClubId) => {
    navigate(`/bookClub/${bookClubId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Book Clubs</h1>
    {bookClubs.length === 0 ? (
        <p className="text-lg text-gray-600">You are not part of any book clubs.</p>
    ) : (
        <ul className="w-full max-w-md bg-white shadow-md rounded-lg">
            {bookClubs.map((bookClub) => (
                <li key={bookClub._id} className="border-b last:border-b-0">
                    <button
                        onClick={() => handleBookClubClick(bookClub._id)}
                        className="w-full text-left px-4 py-2 text-lg text-blue-600 hover:bg-blue-100 focus:outline-none"
                    >
                        {bookClub.name}
                    </button>
                </li>
            ))}
        </ul>
    )}
</div>

  );
};

export default BookClubsList;

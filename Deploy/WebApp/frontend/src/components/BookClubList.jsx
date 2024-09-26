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
    <div>
      <h1>Your Book Clubs</h1>
      {bookClubs.length === 0 ? (
        <p>You are not part of any book clubs.</p>
      ) : (
        <ul>
          {bookClubs.map((bookClub) => (
            <li key={bookClub._id}>
              <button onClick={() => handleBookClubClick(bookClub._id)}>
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

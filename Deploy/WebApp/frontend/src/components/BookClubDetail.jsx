import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate to handle navigation
import GetRecommendation from './getRecommendation';

const BookClubDetail = () => {
  const { bookClubId } = useParams(); // Get bookClubId from the route params
  const [bookClub, setBookClub] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  
  // Fetch the book club details when the component mounts
  useEffect(() => {
    const fetchBookClubDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/bookClub/${bookClubId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book club details');
        }
        const data = await response.json();
        setBookClub(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchBookClubDetails();
  }, [bookClubId]);

  // Function to navigate back to home page
  const goToHomePage = () => {
    navigate('/');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!bookClub) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{bookClub.name}</h1>
      <p>{bookClub.description}</p>
      <p>Number of Members: {bookClub.numberOfMembers}</p>
      <p>Created at: {new Date(bookClub.createdAt).toLocaleString()}</p>

      {/* "Go Back to Home Page" Button */}
      <button onClick={goToHomePage} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Go Back to Home Page
      </button>
      <GetRecommendation bookClubId={bookClubId}/>
    </div>
  );
};

export default BookClubDetail;

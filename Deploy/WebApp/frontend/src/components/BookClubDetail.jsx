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
    <div className="flex flex-col justify-center items-center p-6 w-96 rounded-lg bg-[var(--primary-color)]">
    <h1 className="text-4xl font-bold mb-4 text-gray-800">{bookClub.name}</h1>
    <p className="text-lg text-gray-700 mb-2">{bookClub.description}</p>
    <p className="text-sm text-gray-600 mb-1">Number of Members: <span className="font-semibold">{bookClub.numberOfMembers}</span></p>
    <p className="text-sm text-gray-600 mb-4">Created at: <span className="font-semibold">{new Date(bookClub.createdAt).toLocaleString()}</span></p>

    {/* "Go Back to Home Page" Button */}
    <button
        onClick={goToHomePage}
        className="mt-6 w-full max-w-xs px-6 py-3  font-semibold rounded-lg bg-[var(--button-color)] hover:bg-[#ef7349] text-white focus:outline-none focus:ring-2 focus:ring-[var(--button-color)] focus:ring-opacity-50 transition duration-300"
    >
        Go Back to Home Page
    </button>

    {/* Add spacing between buttons and the next component */}
    <div className="mt-4">
        <GetRecommendation bookClubId={bookClubId} />
    </div>
</div>


  );
};

export default BookClubDetail;

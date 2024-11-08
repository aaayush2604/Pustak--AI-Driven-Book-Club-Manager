import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const FavoriteBooks = () => {
  // State to hold the search query and search results
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteBookIds, setFavoriteBookIds]=useState([]);
  const {authUser}=useAuthContext();
  const navigate=useNavigate();
  // Fetch books when the query changes (debounced)
  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() === '') {
        setResults([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:5000/search?query=${query}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the API call by setting a timeout
    const debounceTimeout = setTimeout(() => {
      fetchData();
    }, 300); // Wait 300ms before making the request

    // Cleanup the timeout when the component unmounts or query changes
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  // Add or remove a book from favorites
  const toggleFavorite = (book) => {
    setFavoriteBooks((prevFavorites) => {
      if (prevFavorites.find((favBook) => favBook.goodreads_book_id === book.goodreads_book_id)) {
        const newFavoriteBookIds=favoriteBookIds.filter((favBookId)=>favBookId!=book.goodreads_book_id);
        setFavoriteBookIds(newFavoriteBookIds);
        setQuery('');
        return prevFavorites.filter((favBook) => favBook.goodreads_book_id !== book.goodreads_book_id);
      } else {
        setFavoriteBookIds([...favoriteBookIds,book.goodreads_book_id]);
        setQuery('');
        return [...prevFavorites, book];
      }
      
    });
  };

  const submitPreference = async () => {
    console.log(authUser.username);
    console.log(favoriteBookIds);
    try {
      const response = await fetch('http://localhost:8000/user/preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username:authUser.username,
          top5list:favoriteBookIds,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update top 5 books');
      }
  
      const data = await response.json();
      console.log('Update successful:', data);
      // Handle success (e.g., update UI or give user feedback)
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error (e.g., show error message to the user)
    }
  };

  const goToHomePage = () => {
    navigate('/');
  };
  

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
  <h1 className="text-2xl font-bold text-gray-800 mb-6">Select Your Favorite Books</h1>

  {/* Search input */}
  <input
    type="text"
    value={query}
    onChange={handleSearchChange}
    placeholder="Search for books..."
    className="mb-4 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
  />

  {/* Loading spinner */}
  {isLoading && <p className="text-gray-600">Loading...</p>}

  {/* Search results */}
  <div className="results mb-4">
    {results.length > 0 && (
      <ul className="bg-gray-100 border border-gray-300 rounded-md">
        {results.map((book) => (
          <li key={book.goodreads_book_id} className="flex justify-between items-center p-2 hover:bg-blue-50">
            <span className="text-gray-800">{book.title}</span>
            <button
              onClick={() => toggleFavorite(book)}
              className="ml-2 py-1 px-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            >
              {favoriteBooks.find((favBook) => favBook.goodreads_book_id === book.goodreads_book_id)
                ? 'Remove from Favorites'
                : 'Add to Favorites'}
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>

  {/* Display selected favorite books */}
  <div className="favorites mb-4">
    <h2 className="text-xl font-semibold text-gray-800 mb-2">Selected Favorite Books</h2>
    {favoriteBooks.length > 0 && (
      <ul className="bg-gray-100 border border-gray-300 rounded-md">
        {favoriteBooks.map((book) => (
          <li key={book.goodreads_book_id} className="p-2 text-gray-700">
            {book.title}
          </li>
        ))}
      </ul>
    )}
  </div>

  <div>
    <button
      onClick={submitPreference}
      className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-green-500"
    >
      Add Favorites
    </button>
    <button
        onClick={goToHomePage}
        className="mt-6 w-full max-w-xs px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
    >Go Back to Home Page</button>
  </div>
</div>

  );
};

export default FavoriteBooks;

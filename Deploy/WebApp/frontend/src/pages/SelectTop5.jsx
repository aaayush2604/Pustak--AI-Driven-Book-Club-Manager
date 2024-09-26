import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';

const FavoriteBooks = () => {
  // State to hold the search query and search results
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteBookIds, setFavoriteBookIds]=useState([]);
  const {authUser}=useAuthContext();
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
        return prevFavorites.filter((favBook) => favBook.goodreads_book_id !== book.goodreads_book_id);
      } else {
        setFavoriteBookIds([...favoriteBookIds,book.goodreads_book_id]);
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
  

  return (
    <div className="favorite-books">
      <h1>Select Your Favorite Books</h1>

      {/* Search input */}
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search for books..."
      />

      {/* Loading spinner */}
      {isLoading && <p>Loading...</p>}

      {/* Search results */}
      <div className="results">
        {results.length > 0 && (
          <ul>
            {results.map((book) => (
              <li key={book.goodreads_book_id}>
                <span>{book.title}</span>
                <button
                  onClick={() => toggleFavorite(book)}
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
      <div className="favorites">
        <h2>Selected Favorite Books</h2>
        {favoriteBooks.length > 0 && (
          <ul>
            {favoriteBooks.map((book) => (
              <li key={book.goodreads_book_id}>{book.title}</li> // Display book title instead of ID
            ))}
          </ul>
        )}
      </div>

      <div>
        <button onClick={submitPreference}>Add Favorites</button>
      </div>
    </div>
  );
};

export default FavoriteBooks;

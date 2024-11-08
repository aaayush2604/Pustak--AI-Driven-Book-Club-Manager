// import React, { useState, useEffect } from 'react';

// const GetRecommendation = ({ bookClubId }) => {
//   const [top5Lists, setTop5Lists] = useState([]);  // Store top5 lists
//   const [recommendations, setRecommendations] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [fetchTop5, setFetchTop5] = useState(false);  // Flag to trigger useEffect

//   // Fetch the top5 lists for the book club when button is clicked
//   useEffect(() => {
//     const fetchTop5Lists = async () => {
//       setIsLoading(true);
//       setError(null);
      
//       try {
//         const response = await fetch(`http://localhost:8000/bookClub/${bookClubId}/top5Lists`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch top 5 lists');
//         }

//         const data = await response.json();
//         console.log(data.top5Lists);
//         setTop5Lists(data.top5Lists);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     // Only fetch the top5 lists if button was clicked (fetchTop5 is true)
//     if (fetchTop5) {
//         console.log('start');
//       fetchTop5Lists();
//     }
//   }, [fetchTop5, bookClubId]);

//   // Function to get recommendations based on top5Lists
//   const getRecommendations = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//         console.log(top5Lists);
//       const response = await fetch('http://127.0.0.1:5000/recommend', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             favorite_book_ids: top5Lists.flat(),  // Send top5 lists as body
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch recommendations');
//       }

//       const data = await response.json();
//       setRecommendations(data);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const formatArrayToString = (array) => {
//     return array.map(item => item.trim()).join(', '); // Join with a comma and space
// };


//   return (
//     <div>
//       <h2>Get Book Recommendations</h2>

//       {/* Button to trigger top5 list fetch */}
//       <button
//         onClick={() => setFetchTop5(true)}  // Set fetchTop5 to true to trigger useEffect
//         style={{
//           padding: '10px',
//           backgroundColor: '#28a745',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer',
//         }}
//       >
//         Fetch Top 5 Lists and Get Recommendations
//       </button>

//       {/* Loading state */}
//       {isLoading && <p>Loading...</p>}

//       {/* Error state */}
//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}

//       {/* If top5Lists fetched successfully, allow fetching recommendations */}
//       {console.log(top5Lists)}
//       {top5Lists && (
//         <button
//           onClick={getRecommendations}  // Fetch recommendations after top5Lists are fetched
//           style={{
//             padding: '10px',
//             marginTop: '10px',
//             backgroundColor: '#007bff',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer',
//           }}
//         >
//           Get Recommendations
//         </button>
//       )}

//       {/* Display the recommendations */}
//       <div style={{ marginTop: '20px' }}>
//     {recommendations.length > 0 ? (
//         <ul>
//             {recommendations.map((book) => (
//                 <li key={book.goodreads_book_id} style={{ marginBottom: '15px' }}>
//                     <h3>{book.title}</h3>
//                     <p>
//                         <strong>Genres:</strong> {formatArrayToString(JSON.parse(book.genres.replace(/'/g, '"')))}
//                     </p>
//                     <p>
//                         <strong>Authors:</strong> {formatArrayToString(JSON.parse(book.authors.replace(/'/g, '"')))}
//                     </p>
//                     <p>
//                         <strong>Average Rating:</strong> {JSON.parse(book.average_rating)[0]}
//                     </p>
//                 </li>
//             ))}
//         </ul>
//     ) : (
//         !isLoading && fetchTop5 && <p>No recommendations available yet</p>
//     )}
// </div>
//     </div>
//   );
// };

// export default GetRecommendation;


import React, { useState, useEffect } from 'react';

const GetRecommendation = ({ bookClubId }) => {
  const [top5Lists, setTop5Lists] = useState([]);  // Store top5 lists
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch the top5 lists and then get recommendations
  const fetchTop5AndRecommendations = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch top 5 lists
      const response = await fetch(`http://localhost:8000/bookClub/${bookClubId}/top5Lists`);
      if (!response.ok) {
        throw new Error('Failed to fetch top 5 lists');
      }

      const data = await response.json();
      setTop5Lists(data.top5Lists);

      // After fetching top 5 lists, fetch recommendations
      const recommendationsResponse = await fetch('http://127.0.0.1:5000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          favorite_book_ids: data.top5Lists.flat(),  // Send top5 lists as body
        }),
      });

      if (!recommendationsResponse.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const recommendationsData = await recommendationsResponse.json();
      setRecommendations(recommendationsData);

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatArrayToString = (array) => {
    return array.map(item => item.trim()).join(', '); // Join with a comma and space
  };

  return (
    <div>
      <h2>Get Book Recommendations</h2>

      {/* Button to fetch top 5 lists and recommendations */}
      <button
        onClick={fetchTop5AndRecommendations}  // Trigger the combined fetch function
        style={{
          padding: '10px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Get Your Next Recommendation
      </button>

      {/* Loading state */}
      {isLoading && <p>Loading...</p>}

      {/* Error state */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Display the recommendations */}
      <div style={{ marginTop: '20px' }}>
        {recommendations.length > 0 ? (
          <ul>
            {recommendations.map((book) => (
              <li key={book.goodreads_book_id} style={{ marginBottom: '15px' }}>
                <h3>{book.title}</h3>
                <p>
                  <strong>Genres:</strong> {formatArrayToString(JSON.parse(book.genres.replace(/'/g, '"')))}
                </p>
                <p>
                  <strong>Authors:</strong> {formatArrayToString(JSON.parse(book.authors.replace(/'/g, '"')))}
                </p>
                <p>
                  <strong>Average Rating:</strong> {JSON.parse(book.average_rating)[0]}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          !isLoading && <p>No recommendations available yet</p>
        )}
      </div>
    </div>
  );
};

export default GetRecommendation;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookClubsList from "../../components/BookClubList";

const JoinBookClub = () => {
  const [bookClubs, setBookClubs] = useState([]);  // List of book clubs
  const [filteredBookClubs, setFilteredBookClubs] = useState([]); // Filtered suggestions
  const [bookClubName, setBookClubName] = useState("");  // Name user types
  const [bookClubId, setBookClubId] = useState("");  // Selected Book Club ID
  const [userId, setUserId] = useState("");  // User ID from localStorage
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [trigger,setTrigger]=useState(0);

  // Fetch the list of book clubs on component load
  useEffect(() => {
    const fetchBookClubs = async () => {
      try {
        const response = await fetch("http://localhost:8000/bookClub/getClubs");
        const data = await response.json();
        if (response.ok) {
          setBookClubs(data);
        } else {
          setMessage(data.error || "Failed to fetch book clubs");
        }
      } catch (error) {
        setMessage("Error: " + error.message);
      }
    };

    fetchBookClubs();

    // Get stored user info from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.userId) {
      setUserId(storedUser.userId);
    }
  }, []);

  // Filter book clubs based on user input
  const handleNameChange = (e) => {
    const searchValue = e.target.value;
    setBookClubName(searchValue);

    if (searchValue) {
      const filteredClubs = bookClubs.filter((club) =>
        club.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredBookClubs(filteredClubs);
    } else {
      setFilteredBookClubs([]);
    }
  };

  // Handle the selection of a book club from the suggestions
  const handleSelectClub = (club) => {
    setBookClubName(club.name);  // Set the selected club name in input field
    setBookClubId(club._id);  // Store the selected book club's ID
    setFilteredBookClubs([]);  // Clear suggestions after selection
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:8000/bookClub/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookClubId: bookClubId.trim(),  // Using selected Book Club ID
          userId: userId.trim(),          // Using userId from state
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`User successfully added to the Book Club: ${data.bookClub.name}`);
        setTrigger((prev) => prev + 1); // Update trigger state here
      } else {
        setMessage(data.error || "Failed to join the Book Club");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
    <form onSubmit={handleSubmit} className="shadow-md rounded-lg p-6 w-96 mt-4 bg-[var(--primary-color)]">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Join Book Club</h1>
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Book Club Name:</label>
            <input
                type="text"
                value={bookClubName}
                onChange={handleNameChange}  // Handle input change to filter suggestions
                placeholder="Enter Book Club Name"
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Suggestions Dropdown */}
            {filteredBookClubs.length > 0 && (
                <ul className="mt-1 border border-gray-300 rounded-lg bg-white shadow-lg">
                    {filteredBookClubs.map((club) => (
                        <li
                            key={club._id}
                            onClick={() => handleSelectClub(club)}  // On click, select the club
                            className="cursor-pointer p-2 hover:bg-blue-100"
                        >
                            {club.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 text-white font-semibold rounded-lg ${loading ? 'bg-gray-400' : 'bg-[var(--button-color)] hover:bg-[#ef7349]'} focus:outline-none`}
        >
            {loading ? "Joining..." : "Join Book Club"}
        </button>
        <div className="mt-4">
        <Link to='/register' className="text-sm  hover:underline mr-4 text-[var(--button-color)]">
            Create Your Own Book Club
        </Link>
        <Link to='/selectTop5' className="text-sm  hover:underline text-[var(--button-color)]">
            Add Top 5 Favorites
        </Link>
    </div>
    </form>
    <BookClubsList trigger={trigger} />
</div>

  );
};

export default JoinBookClub;

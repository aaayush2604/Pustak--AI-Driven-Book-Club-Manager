import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RegisterBookClub = () => {
  const [name, setName] = useState('');
  const [manager, setManager] = useState('');
  const [managerName, setManagerName]=useState('');
  const [currentReadId, setCurrentReadId] = useState('');
  const [memberIds, setMemberIds] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [filteredUsersforManager, setFilteredUsersforManager] = useState([]);
  const [filteredUsersforMember, setFilteredUsersforMember] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    // Fetch all users when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/user/getUsers');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setMessage('Failed to fetch users');
      }
    };

    // Fetch all books when the component mounts
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8000/book/getBooks');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setMessage('Failed to fetch books');
      }
    };

    fetchUsers();
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const membersArray = selectedMembers.map(member => member._id);

    try {
      const response = await fetch('http://localhost:8000/bookClub/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          managerId:manager._id,
          currentReadId: currentReadId || null,
          memberIds: membersArray,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Book Club registered successfully: ${data.bookClub.name}`);
      } else {
        setMessage(data.error || 'Failed to register book club');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }

    setLoading(false);
  };

  // Filter users based on manager name input
  const handleManagerInput = (e) => {
    const input = e.target.value;
    setManagerName(input);
    setFilteredUsersforManager(
      users.filter((user) =>
        user.username.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  // Filter books based on current read input
  const handleBookInput = (e) => {
    const input = e.target.value;
    setCurrentReadId(input);
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  // Filter users for member selection
  const handleMemberInput = (e) => {
    const input = e.target.value;
    setMemberIds(input);
    setFilteredUsersforMember(
      users.filter((user) =>
        user.username.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  // Handle selecting a manager from suggestions
  const selectManager = (user) => {
    setManagerName(user.username)
    setSelectedMembers([...selectedMembers, user]);
    setManager(user);
    setFilteredUsersforManager([]); // Hide the suggestions once a user is selected
  };

  // Handle selecting a book from suggestions
  const selectBook = (book) => {
    setCurrentReadId(book.title);
    setFilteredBooks([]); // Hide suggestions
  };

  // Handle adding a member
  const addMember = (user) => {
    setSelectedMembers([...selectedMembers, user]);
    setMemberIds(''); // Clear the input after adding
    setFilteredUsersforMember([]); // Hide suggestions
  };

  return (
    <div className="p-6 max-w-md mx-auto shadow-lg rounded-lg w-96 bg-[var(--primary-color)]">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Register Book Club</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Book Club Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter Book Club Name"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Manager Name:</label>
        <input
          type="text"
          value={managerName}
          onChange={handleManagerInput}
          required
          placeholder="Enter Manager Name"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
        {filteredUsersforManager.length > 0 && (
          <ul className="mt-2 bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto">
            {filteredUsersforManager.map((user) => (
              <li
                key={user._id}
                onClick={() => selectManager(user)}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              >
                {user.username}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Current Book (optional):</label>
        <input
          type="text"
          value={currentReadId}
          onChange={handleBookInput}
          placeholder="Enter Book Title"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
        {filteredBooks.length > 0 && (
          <ul className="mt-2 bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto">
            {filteredBooks.map((book) => (
              <li
                key={book._id}
                onClick={() => selectBook(book)}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              >
                {book.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Members:</label>
        <input
          type="text"
          value={memberIds}
          onChange={handleMemberInput}
          placeholder="Enter Member Name"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
        {filteredUsersforMember.length > 0 && (
          <ul className="mt-2 bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto">
            {filteredUsersforMember.map((user) => (
              <li
                key={user._id}
                onClick={() => addMember(user)}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              >
                {user.username}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-2">
          {selectedMembers.length > 0 && (
            <ul className="bg-gray-100 border border-gray-300 rounded-md">
              {selectedMembers.map((member) => (
                <li key={member._id} className="px-4 py-2">
                  {member.username}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-[var(--button-color)] hover:bg-[#ef7349] text-white font-bold rounded-md disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register Book Club'}
        </button>
      </div>
    </form>
    <div className="mt-6 flex justify-between">
      <Link to="/" className="text-[var(--button-color)] hover:underline">Join a BookClub</Link>
      <Link to="/selectTop5" className="text-[var(--button-color)] hover:underline">Add Top 5 Books</Link>
    </div>
    {console.log(message)}
  </div>
  
  );
};

export default RegisterBookClub;

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
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Register Book Club</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Book Club Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter Book Club Name"
          />
        </div>
        <div>
          <label>Manager Name:</label>
          <input
            type="text"
            value={managerName}
            onChange={handleManagerInput}
            required
            placeholder="Enter Manager Name"
          />
          {filteredUsersforManager.length > 0 && (
            <ul>
              {filteredUsersforManager.map((user) => (
                <li key={user._id} onClick={() =>selectManager(user)}>
                  {user.username}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label>Current Book (optional):</label>
          <input
            type="text"
            value={currentReadId}
            onChange={handleBookInput}
            placeholder="Enter Book Title"
          />
          {filteredBooks.length > 0 && (
            <ul>
              {filteredBooks.map((book) => (
                <li key={book._id} onClick={() => selectBook(book)}>
                  {book.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label>Members:</label>
          <input
            type="text"
            value={memberIds}
            onChange={handleMemberInput}
            placeholder="Enter Member Name"
          />
          {filteredUsersforMember.length > 0 && (
            <ul>
              {filteredUsersforMember.map((user) => (
                <li key={user._id} onClick={() => addMember(user)}>
                  {user.username}
                </li>
              ))}
            </ul>
          )}
          <div>
            {selectedMembers.length > 0 && (
              <ul>
                {selectedMembers.map((member) => (
                  <li key={member._id}>{member.username}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register Book Club'}
          </button>
        </div>
      </form>
      <Link to='/'>Join a BookClub</Link>
      <Link to='/selectTop5'>Add Top 5 Books</Link>
      {console.log(message)}
    </div>
  );
};

export default RegisterBookClub;

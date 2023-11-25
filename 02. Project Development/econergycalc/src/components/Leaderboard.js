import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:3030/api/forum/leaderboard');
        setLeaders(response.data);
      } catch (error) {
        setError("Failed to load leaderboard");
        console.error("There was an error!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div>Loading leaderboard...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      {leaders.map((user, index) => (
        <div key={user._id}>
          <p>{index + 1}. {user.username} - {user.points} points</p>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;

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
    <div className="my-3 p-3 bg-body rounded shadow">
      <h2>Top Contributors</h2>
      {leaders.map((user, index) => (
        <div key={user._id} class="d-flex align-items-center justify-content-between my-3 p-2 bg-body rounded shadow">
          <p class="mt-2 me-2"><span class="h4">{index + 1}.</span> <span class="h6">{user.username}</span>{index===0 ? (<i class="fa-solid fa-award fa-2xl ms-3" style={{color: "#d1a103"}}></i>): (<div></div>)}</p>
          <h4><span class="badge rounded-pill text-bg-success">{user.points}</span></h4>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;

import React, { useState, useEffect } from 'react';

const Stopwatch = ({ onTimeSubmit }) => {
  const [isActive, setIsActive] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setSecondsElapsed(secondsElapsed => secondsElapsed + 1);
      }, 1000);
    } else if (!isActive && secondsElapsed !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsElapsed]);

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleSubmit = () => {
    onTimeSubmit(secondsElapsed);
    setSecondsElapsed(0); // Reset timer
    setIsActive(false); // Stop the stopwatch
  };

  return (
    <div>
      <div>Time: {secondsElapsed}s</div>
      <button onClick={handleStartStop}>{isActive ? 'Stop' : 'Start'}</button>
      <button onClick={handleSubmit} disabled={isActive || secondsElapsed === 0}>Submit</button>
    </div>
  );
};
export default Stopwatch;
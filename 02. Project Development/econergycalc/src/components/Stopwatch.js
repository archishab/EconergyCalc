import React, { useState, useEffect } from 'react';

const Stopwatch = ({ onTimeSubmit }) => {
  const [isActive, setIsActive] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setSecondsElapsed((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsElapsed]);

  const handleStartStop = () => {
    setIsActive(!isActive);
    // When stopping the stopwatch, update the input field with the elapsed time
    if (isActive) {
      onTimeSubmit(secondsElapsed);
    }
  };

  const handleReset = () => {
    setSecondsElapsed(0);
    onTimeSubmit(0); // Reset the time in the parent component as well
  };

  return (
    <div>
      <div>Time: {secondsElapsed} seconds</div>
      <button onClick={handleStartStop}>{isActive ? 'Stop' : 'Start'}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Stopwatch;

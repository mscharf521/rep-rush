import React, { useState, useEffect } from 'react';
import ConfirmModal from './ConfirmModal';

function Timer({ onStart, onReset }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      if (!startTime) {
        const newStartTime = new Date();
        setStartTime(newStartTime);
        onStart(newStartTime);
      }
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, onStart, startTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    setTime(0);
    setStartTime(null);
    setIsRunning(false);
    setShowResetConfirm(false);
    onReset();
  };

  return (
    <div className="timer">
      <div className="time-display">{formatTime(time)}</div>
      <div className="timer-controls">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <ConfirmModal
        isOpen={showResetConfirm}
        onConfirm={confirmReset}
        onCancel={() => setShowResetConfirm(false)}
        message="Are you sure you want to reset? This will clear all data."
      />
    </div>
  );
}

export default Timer; 
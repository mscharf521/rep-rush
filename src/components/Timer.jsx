import React, { useState, useEffect } from 'react';
import ConfirmModal from './ConfirmModal';

function Timer({ onStart, onStop, onTimeUpdate, onReset }) {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [pauseOffset, setPauseOffset] = useState(0);
  const [time, setTime] = useState(0);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    let animationFrameId;

    const updateTime = () => {
      if (isRunning && startTime) {
        const now = new Date();
        const elapsed = Math.floor((now - startTime) / 1000) + pauseOffset;
        setTime(elapsed);
        onTimeUpdate(elapsed);
        animationFrameId = requestAnimationFrame(updateTime);
      }
    };

    if (isRunning && startTime) {
      animationFrameId = requestAnimationFrame(updateTime);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isRunning, startTime, pauseOffset, onTimeUpdate]);

  const handleStartStop = () => {
    if (!isRunning) {
      // Starting
      if (!startTime) {
        // First start
        const now = new Date();
        setStartTime(now);
        onStart(now);
      } else {
        // Resuming after pause
        const now = new Date();
        setStartTime(now);
        setPauseOffset(time);
        onStart(now);
      }
    } else {
      // Stopping/Pausing
      setPauseOffset(time);
      onStop();
    }
    setIsRunning(!isRunning);
  };

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
    setPauseOffset(0);
    setIsRunning(false);
    setShowResetConfirm(false);
    onReset();
  };

  return (
    <div className="timer">
      <div className="time-display">{formatTime(time)}</div>
      <div className="timer-controls">
        <button onClick={handleStartStop}>
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
import React, { useState } from 'react';
import ExerciseChart from './ExerciseChart';

function RepCounter({ label, incrementValues = [1], decrementValues = [1], timerStartTime }) {
  const [sets, setSets] = useState([]);
  const [lastSetTime, setLastSetTime] = useState(null);

  const count = sets.reduce((sum, set) => sum + set.reps, 0);

  const updateSet = (value) => {
    const now = new Date();
    
    if (!lastSetTime) {
      // First set
      setLastSetTime(now);
      setSets([{ reps: value, timestamp: now }]);
    } else {
      const timeDiff = (now - lastSetTime) / 1000; // difference in seconds
      
      if (timeDiff <= 5) {
        // Update last set
        setSets(prevSets => {
          const lastSet = prevSets[prevSets.length - 1];
          return [
            ...prevSets.slice(0, -1),
            { reps: lastSet.reps + value, timestamp: lastSet.timestamp }
          ];
        });
      } else {
        // New set
        setLastSetTime(now);
        setSets(prevSets => [...prevSets, { reps: value, timestamp: now }]);
      }
    }
  };

  const increment = (value) => {
    updateSet(value);
  };

  const decrement = (value) => {
    updateSet(-value);
  };

  return (
    <div className="rep-counter">
      <h2>{label}</h2>
      <div className="counter-display">{count}</div>
      <div className="counter-controls">
        <div className="increment-buttons">
          {incrementValues.map(value => (
            <button key={`inc-${value}`} onClick={() => increment(value)}>
              +{value}
            </button>
          ))}
        </div>
        <div className="decrement-buttons">
          {decrementValues.map(value => (
            <button key={`dec-${value}`} onClick={() => decrement(value)}>
              -{value}
            </button>
          ))}
        </div>
      </div>
      <ExerciseChart sets={sets} timerStartTime={timerStartTime} />
    </div>
  );
}

export default RepCounter; 
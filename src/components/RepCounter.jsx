import React, { useState } from 'react';
import ExerciseChart from './ExerciseChart';

function RepCounter({ label, incrementValues = [1], decrementValues = [1], elapsedTime, isRunning }) {
  const [sets, setSets] = useState([]);
  const [lastSetTime, setLastSetTime] = useState(null);

  const count = sets.reduce((sum, set) => sum + set.reps, 0);

  const updateSet = (value) => {
    if (!isRunning) return;
    
    const now = new Date();
    setLastSetTime(now); // Always update lastSetTime when any change is made
    
    if (!sets.length) {
      // First set
      setSets([{ reps: value, elapsedTime }]);
    } else {
      const timeDiff = (now - lastSetTime) / 1000; // difference in seconds
      
      if (timeDiff <= 5) {
        // Update last set with current elapsed time
        setSets(prevSets => {
          const lastSet = prevSets[prevSets.length - 1];
          return [
            ...prevSets.slice(0, -1),
            { ...lastSet, reps: lastSet.reps + value }
          ];
        });
      } else {
        // New set
        setSets(prevSets => [...prevSets, { reps: value, elapsedTime }]);
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
            <button 
              key={`inc-${value}`} 
              onClick={() => increment(value)}
              disabled={!isRunning}
            >
              +{value}
            </button>
          ))}
        </div>
        <div className="decrement-buttons">
          {decrementValues.map(value => (
            <button 
              key={`dec-${value}`} 
              onClick={() => decrement(value)}
              disabled={!isRunning}
            >
              -{value}
            </button>
          ))}
        </div>
      </div>
      <ExerciseChart sets={sets} />
    </div>
  );
}

export default RepCounter; 
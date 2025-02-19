import React, { useState } from 'react';
import Timer from './components/Timer';
import RepCounter from './components/RepCounter';
import Header from './components/Header';
import './App.css';

function App() {
  const [timerStartTime, setTimerStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setTimerStartTime(null);
    setElapsedTime(0);
    setIsRunning(false);
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="App">
      <Header isRunning={isRunning} />
      <div className="app-container">
        <Timer 
          onStart={(startTime) => {
            setTimerStartTime(startTime);
            setIsRunning(true);
          }}
          onStop={() => setIsRunning(false)}
          onTimeUpdate={setElapsedTime}
          onReset={handleReset}
        />
        <div className="counter-container">
          <RepCounter 
            key={resetKey}
            label=""
            incrementValues={[1, 5, 10]}
            decrementValues={[1, 5, 10]}
            elapsedTime={elapsedTime}
            isRunning={isRunning}
          />
        </div>
      </div>
    </div>
  );
}

export default App; 
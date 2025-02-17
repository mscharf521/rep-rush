import React, { useState } from 'react';
import Timer from './components/Timer';
import RepCounter from './components/RepCounter';
import './App.css';

function App() {
  const [timerStartTime, setTimerStartTime] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setTimerStartTime(null);
    setResetKey(prev => prev + 1); // This will force RepCounter to re-mount and reset
  };

  return (
    <div className="App">
      <h1>Rep Rush</h1>
      <Timer 
        onStart={(startTime) => setTimerStartTime(startTime)} 
        onReset={handleReset}
      />
      <RepCounter 
        key={resetKey}
        label="Pull-ups"
        incrementValues={[1, 5, 10]}
        decrementValues={[1, 5, 10]}
        timerStartTime={timerStartTime}
      />
    </div>
  );
}

export default App; 
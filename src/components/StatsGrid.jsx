import React, { useState } from 'react';
import GoalModal from './GoalModal'; // Import the GoalModal

const StatsGrid = ({ sets, initialGoal, onGoalChange }) => {
  const [goal, setGoal] = useState(initialGoal); // Local state for goal
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  if (sets.length === 0) {
    return null; // Return null if there are no sets, hiding the stats
  }

  const largestSet = Math.max(...sets.map(set => set.reps));
  const totalReps = sets.reduce((sum, set) => sum + set.reps, 0);
  
  // Calculate average time between sets using timestamps
  const averageTimeBetweenSets = sets.length > 1 
    ? (sets[sets.length - 1].elapsedTime) / (sets.length - 1) 
    : 0;

  const averageSetSize = (totalReps / sets.length).toFixed(2);
  
  // Calculate reps per minute based on the total time taken for all sets
  const totalTime = (sets[sets.length - 1].elapsedTime) / 60; // in minutes
  const repsPerMinute = totalTime > 0 ? (totalReps / totalTime).toFixed(2) : 0;

  // Calculate estimated time to goal
  let estimatedTimeToGoal;
  if (totalReps >= goal) {
    // If the goal has been reached, find the time taken to reach the goal
    let cumulativeReps = 0;
    for (let i = 0; i < sets.length; i++) {
      cumulativeReps += sets[i].reps;
      if (cumulativeReps >= goal) {
        estimatedTimeToGoal = ((sets[i].elapsedTime) / 60).toFixed(2); // Time taken to reach the goal in minutes
        break;
      }
    }
  } else {
    // If the goal has not been reached, calculate the estimated time to reach it
    estimatedTimeToGoal = repsPerMinute > 0 ? ((goal) / repsPerMinute).toFixed(2) : 'N/A'; // in minutes
  }

  const handleGoalClick = () => {
    setIsModalOpen(true); // Open the modal when the stat box is clicked
  };

  return (
    <div className="stats-grid">
      <StatBox title={"Est. Time to " + goal + " reps (min)"} value={estimatedTimeToGoal} onClick={handleGoalClick} />
      <StatBox title="Reps Per Minute" value={repsPerMinute} />
      <StatBox title="Largest Set" value={largestSet} />
      <StatBox title="Avg Set Size" value={averageSetSize} />
      <StatBox title="Avg Time Between Sets (s)" value={averageTimeBetweenSets.toFixed(2)} />
      <GoalModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        goal={goal} 
        onGoalChange={(newGoal) => {
            setGoal(newGoal);
            onGoalChange(newGoal); // Call the parent function to update the goal
        }} 
      />
    </div>
  );
};

const StatBox = ({ title, value, onClick }) => (
  <div className="stat-box" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

export default StatsGrid; 
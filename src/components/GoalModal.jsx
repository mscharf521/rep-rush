import React from 'react';
import './GoalModal.css'; // Create a CSS file for modal styles

const GoalModal = ({ isOpen, onClose, goal, onGoalChange }) => {
  const handleGoalChange = (e) => {
    const newGoal = Number(e.target.value);
    onGoalChange(newGoal);
  };

  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Set Your Goal</h2>
        <input 
          type="number" 
          value={goal} 
          onChange={handleGoalChange} 
          min="1" // Prevent negative or zero goals
        />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default GoalModal; 
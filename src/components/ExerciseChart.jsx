import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ExerciseChart({ sets }) {
  const chartData = {
    datasets: [
      {
        label: 'Cumulative Reps',
        data: [
          { x: 0, y: 0 },  // Starting point
          ...sets.map((set, index) => ({
            x: set.elapsedTime,
            y: sets
              .slice(0, index + 1)
              .reduce((sum, set) => sum + set.reps, 0)
          }))
        ],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Seconds from Start'
        },
        min: 0,
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0
        }
      },
    },
  };

  return (
    <div className="exercise-chart">
      {sets.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <div className="no-sets-message">
          <p>No sets recorded yet</p>
          <p className="sub-text">Start the timer and add reps to see your progress</p>
        </div>
      )}
    </div>
  );
}

export default ExerciseChart; 
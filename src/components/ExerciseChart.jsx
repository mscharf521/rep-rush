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

function ExerciseChart({ sets, timerStartTime }) {
  const getSecondsFromStart = (timestamp) => {
    if (!timerStartTime || !timestamp) return 0;
    return Math.floor((timestamp - timerStartTime) / 1000);
  };

  const chartData = {
    datasets: [
      {
        label: 'Cumulative Reps',
        data: [
          { x: 0, y: 0 },  // Starting point
          ...sets.map((set, index) => ({
            x: getSecondsFromStart(set.timestamp),
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
    maintainAspectRatio: false,  // This is crucial for height control
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cumulative Reps Over Time',
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
      },
    },
  };

  return (
    <div className="exercise-chart">
      {sets.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>No sets recorded yet</p>
      )}
    </div>
  );
}

export default ExerciseChart; 
import React from "react";

export const WorkoutEl = ({ workout }) => {
  return (
    <li className={`workout workout--${workout.type}`} key={workout.id}>
      <h2 className="workout__title">{workout.description}</h2>
      <div className="workout__details">
        <span className="workout__icon">
          {workout.type === "running" ? "🏃🏿‍♂️" : "🚵🏿‍♀️"}
        </span>
        <span className="workout__value">{workout.distance}</span>
        <span className="workout__unit">km</span>
      </div>
      <div className="workout__details">
        <span className="workout__icon">⏱</span>
        <span className="workout__value">{workout.duration}</span>
        <span className="workout__unit">min</span>
      </div>
      <div className="workout__details">
        <span className="workout__icon">⚡️</span>
        <span className="workout__value">
          {workout.type === "running" ? workout.pace : workout.speed}
        </span>
        <span className="workout__unit">
          {workout.type === "running" ? "min/km" : "km/h"}
        </span>
      </div>
      <div className="workout__details">
        <span className="workout__icon">
          {workout.type === "running" ? "🦶🏼" : "⛰"}
        </span>
        <span className="workout__value">
          {workout.type === "running" ? workout.cadence : workout.elevation}
        </span>
        <span className="workout__unit">
          {workout.type === "running" ? "spm" : "m"}
        </span>
      </div>
    </li>
  );
};

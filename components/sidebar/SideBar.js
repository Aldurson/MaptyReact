import React, { useEffect, useState } from "react";
import { WorkoutEl } from "./WorkoutEl.js";
import pic1 from "./icon.png";
import "../styles.css";

export const SideBar = ({
  formState,
  setFormState,
  formActive,
  setFormActive,
  setWorkouts,
  workouts,
  setMCoords,
}) => {
  const [cadenceActive, setCadenceActive] = useState(false);
  const [elevationActive, setElevationActive] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(
    function () {
      const formatDate = (date) => {
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        };
        return Intl.DateTimeFormat("en-ZA", options).format(date);
      };
      const computeDescription = (type, date) => {
        return `${type[0].toUpperCase()}${type.slice(1)} on ${formatDate(
          date
        )}`;
      };
      if (count === 0) return; // for effect running on the first render, bug fix
      setWorkouts([
        ...workouts,
        {
          id: (Date.now() + "").slice(-10),
          date: new Date(),
          type: formState.type,
          duration: formState.duration,
          distance: formState.duration,
          img: formState.img,
          coords: formState.coords,
          cadence: formState.cadence,
          pace: formState.duration / formState.distance,
          speed: formState.distance / formState.duration,
          description: computeDescription(formState.type, formState.date),
        },
      ]);
      setFormActive(false);
      clearForm();
    },
    [count]
  );
  useEffect(
    function () {
      const tempcad = !cadenceActive;
      const tempel = !elevationActive;
      setCadenceActive(tempcad);
      setElevationActive(tempel);
    },
    [formState.type]
  );
  function clearForm() {
    setFormState({
      duration: "",
      distance: "",
      cadence: "",
      elevation: "",
      coords: [0, 0],
      type: "running",
    });
  }
  function updateFormState(evt) {
    setFormState((prev) => {
      return { ...prev, [evt.target.name]: evt.target.value };
    });
  }
  function submitForm(evt) {
    evt.preventDefault();
    setCount(count + 1);
  }
  function moveTo(evt) {
    //console.log(evt);
    const temp = evt.target.closest(".workout");
    if (!temp) return;
    //console.log(temp.getAttribute("id"));
    const identi = temp.getAttribute("id");
    const workout = workouts.find((work) => work.id === identi);
    //console.log(workout);
    setMCoords(workout.coords);
  }
  return (
    <div className="sidebar">
      <img src={pic1} alt="logo picture" className="logo" />
      <ul className="workouts" onClick={moveTo}>
        <form
          onSubmit={submitForm}
          className={formActive ? "form" : "form hidden"}
        >
          <div className="form__row">
            <label className="form__label">Type</label>
            <select
              className="form__input form__input--type"
              onChange={updateFormState}
              value={formState.type}
              name="type"
            >
              <option value="running">Running</option>
              <option value="cycling">Cycling</option>
            </select>
          </div>
          <div className="form__row">
            <label className="form__label">Distance</label>
            <input
              onChange={updateFormState}
              autoComplete="off"
              value={formState.distance}
              className="form__input form__input--distance"
              placeholder="km"
              name="distance"
            />
          </div>
          <div className="form__row">
            <label className="form__label">Duration</label>
            <input
              onChange={updateFormState}
              autoComplete="off"
              value={formState.duration}
              className="form__input form__input--duration"
              placeholder="min"
              name="duration"
            />
          </div>
          <div
            className={
              cadenceActive ? "form__row" : "form__row form__row--hidden"
            }
          >
            <label className="form__label">Cadence</label>
            <input
              onChange={updateFormState}
              value={formState.cadence}
              autoComplete="off"
              className="form__input form__input--cadence"
              placeholder="step/min"
              name="cadence"
            />
          </div>
          <div
            className={
              elevationActive ? "form__row" : "form__row form__row--hidden"
            }
          >
            <label className="form__label">Elev Gain</label>
            <input
              onChange={updateFormState}
              value={formState.elevation}
              autoComplete="off"
              className="form__input form__input--elevation"
              placeholder="meters"
              name="elevation"
            />
          </div>
          <input type="submit" className="hidden" />
        </form>
        {workouts.map((workout) => (
          <WorkoutEl key={workout.id} workout={workout} />
        ))}
      </ul>
      <p className="copyright">
        &copy; Copyright by{" "}
        <a className="twitter-link" href="">
          {" "}
          Ntlaletseng Samuel Nyamah
        </a>
        . Use for portfolio
      </p>
    </div>
  );
};

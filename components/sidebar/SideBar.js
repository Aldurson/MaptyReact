import React, { useEffect, useState } from "react";

import pic1 from "./icon.png";

export const SideBar = ({
  formState,
  setFormState,
  formActive,
  setFormActive,
  setWorkouts,
  workouts,
}) => {
  const [cadenceActive, setCadenceActive] = useState(false);
  const [elevationActive, setElevationActive] = useState(true);
  const [count, setCount] = useState(0);
  const ListItems = workouts.map((workout) => {
    return (
      <li key={workout.id} className={`workout--${workout.type}`}>
        workout.description
      </li>
    );
  });

  useEffect(
    function () {
      if (count === 0) return;
      if (formState.type === "running")
        setWorkouts([
          ...workouts,
          {
            id: (Date.now() + "").slice(-10),
            date: new Date(),
            type: formState.type,
            duration: formState.duration,
            distance: formState.duration,
            coords: formState.coords,
            cadence: formState.cadence,
            description: `${formState.type[0].toUpperCase()}${formState.type.slice(
              1
            )}`,
          },
        ]);

      if (formState.type === "cycling")
        setWorkouts([
          ...workouts,
          {
            id: (Date.now() + "").slice(-10),
            date: new Date(),
            type: formState.type,
            duration: formState.duration,
            distance: formState.distance,
            coords: formState.coords,
            elevation: formState.elevation,
            description: `${formState.type[0].toUpperCase()}${formState.type.slice(
              1
            )}`,
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

  return (
    <div className="sidebar">
      <img src={pic1} alt="logo picture" className="logo" />
      <ul className="workouts">
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
              className="form__input form__input--elevation"
              placeholder="meters"
              name="elevation"
            />
          </div>
          <input type="submit" className="hidden" />
        </form>
        {workouts.map((workout) => {
          return (
            <li key={workout.id} className={`workout--${workout.type}`}>
              {workout.description}
            </li>
          );
        })}
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

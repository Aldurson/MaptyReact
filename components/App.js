import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import { SideBar } from "./sidebar/SideBar.js";
import { Map } from "./map/Map.js";
import "./styles.css";

const App = () => {
  const [formState, setFormState] = useState({
    type: "running",
    distance: "",
    duration: "",
    coords: [0, 0],
    cadence: "",
    elevation: "",
    img: "",
  });
  const [workouts, setWorkouts] = useState(
    //JSON.parse(localStorage.getItem("workouts")) || []
    []
  );
  const [formActive, setFormActive] = useState(false);
  useEffect(
    function () {
      if (!workouts) return;
      localStorage.setItem("workouts", JSON.stringify(workouts));
    },
    [workouts]
  );
  return (
    <div className="container">
      <SideBar
        formState={formState}
        setFormState={setFormState}
        formActive={formActive}
        setFormActive={setFormActive}
        setWorkouts={setWorkouts}
        workouts={workouts}
      />
      <Map
        setFormActive={setFormActive}
        setFormState={setFormState}
        workouts={workouts}
      />
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

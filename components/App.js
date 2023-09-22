import react, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import { SideBar } from "./sidebar/SideBar";
import { Map } from "./map/Map";
import "./styles.css";

const App = () => {
  const [formState, setFormState] = useState({
    type: "running",
    distance: "",
    duration: "",
    coords: [0, 0],
    cadence: "",
    elevation: "",
  });
  const [workouts, setWorkouts] = useState(
    JSON.parse(localStorage.getItem("workouts"))
  );
  const [formActive, setFormActive] = useState(false);
  useEffect(
    function () {
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

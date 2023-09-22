"use strict";

export class Workout {
  id = (Date.now() + "").slice(-10);
  date = new Date();

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
  setDescription() {
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(
      1
    )} on ${this._formatDate(this.date)}`;
  }
  _formatDate(date) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return Intl.DateTimeFormat("en-ZA", options).format(date);
  }
}

export class Running extends Workout {
  type = "running";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.setDescription();
    this._setPace();
  }
  _setPace() {
    this.pace = this.duration / this.distance;
  }
}
export class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this._setSpeed();
    this.setDescription();
  }
  _setSpeed() {
    this.speed = this.distance / this.duration;
  }
}

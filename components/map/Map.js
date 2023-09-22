import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import char5 from "./img/char5.gif";

import { useMapEvents } from "react-leaflet/hooks";
import icon1 from "leaflet/dist/images/marker-icon.png";
import icon2 from "leaflet/dist/images/marker-icon-2x.png";
import icon3 from "leaflet/dist/images/marker-shadow.png";
import L, { icon } from "leaflet";
import { CloseButton } from "react-bootstrap";
import { useEffect } from "react";

const DefaultIcon = L.icon({
  iconUrl: icon1,
  iconRetinaUrl: icon2,
  shadowUrl: icon3,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});
L.Marker.prototype.options.icon = DefaultIcon;
const iconx = L.icon({
  iconUrl: char5,
  iconSize: [100, 100],
  iconAnchor: [50, 100],
});
export const Map = ({ setFormActive, setFormState, workouts }) => {
  const coords = [-33.92, 18.42];

  function EventHandlers() {
    const map = useMapEvents({
      click(evt) {
        const { lat, lng } = evt.latlng;
        setFormActive(true);
        setFormState((prev) => {
          return { ...prev, coords: [lat, lng] };
        });
      },
    });
    return null;
  }

  return (
    <MapContainer center={coords} id="map" zoom={9}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <EventHandlers />
      {workouts.map((workout) => {
        return (
          <Marker key={workout.id} position={workout.coords} icon={iconx}>
            <Popup
              className={`${workout.type}-popup`}
              offset={[0, -80]}
              closeButton={false}
            >
              {workout.description}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

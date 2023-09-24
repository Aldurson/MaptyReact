import React, { useEffect } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import { useMap } from "react-leaflet/hooks";

//import char5 from "./img/char5.gif";
import "../styles.css";
import { useMapEvents } from "react-leaflet/hooks";
import icon1 from "leaflet/dist/images/marker-icon.png";
import icon2 from "leaflet/dist/images/marker-icon-2x.png";
import icon3 from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
const imageRaw = require.context("./img", true, /\.(jpe?g|gif|png|svg)$/);
const imageURLs = imageRaw.keys().map((image) => imageRaw(image));

const DefaultIcon = L.icon({
  iconUrl: icon1,
  iconRetinaUrl: icon2,
  shadowUrl: icon3,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});
L.Marker.prototype.options.icon = DefaultIcon;

function MoveTo(mCoords) {
  const map = useMap();
  useEffect(
    function () {
      if (!mCoords) return null;
      const coords = L.latLng(mCoords.mCoords);
      if (!coords) return;
      map.panTo(coords, { animate: true, duration: 2 });
    },
    [mCoords]
  );
  return null;
}
function createIcon(location) {
  return L.icon({
    iconUrl: location,
    iconSize: [70, 70],
    iconAnchor: [35, 70],
  });
}
function EventHandlers({ setFormActive, setFormState }) {
  const randomImg = () => {
    return imageURLs[Math.floor(Math.random() * 30)];
  };
  const map = useMapEvents({
    click(evt) {
      const { lat, lng } = evt.latlng;

      setFormActive(true);
      setFormState((prev) => {
        return { ...prev, coords: [lat, lng], img: randomImg() };
      });
    },
  });
  return null;
}
export const Map = ({ setFormActive, setFormState, workouts, mCoords }) => {
  const coords = [-33.92, 18.42];

  return (
    <MapContainer center={coords} id="map" zoom={9}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <EventHandlers
        setFormActive={setFormActive}
        setFormState={setFormState}
      />
      <MoveTo mCoords={mCoords} />
      {workouts.map((workout) => {
        return (
          <Marker
            key={workout.id}
            position={workout.coords}
            icon={createIcon(workout.img)}
            eventHandlers={{
              mouseover: (evt) => evt.target.openPopup(),
              mouseout: (evt) => evt.target.closePopup(),
              click: (evt) => (evt) => {
                console.log("click event");
              },
            }}
          >
            <CircleMarker
              center={workout.coords}
              stroke={false}
              radius={70}
              color="red"
            />
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

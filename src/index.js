import React from "react";
import { render } from "react-dom";

import { Map, TileLayer, Marker } from "react-leaflet";

function App() {
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);

  React.useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(({ coords }) => {
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, [setLatitude, setLongitude]);

  return (
    <Map center={[latitude, longitude]} zoom={15}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | Made for Codeable'
      />
      <Marker position={[latitude, longitude]} />
    </Map>
  );
}

render(<App />, document.getElementById("root"));

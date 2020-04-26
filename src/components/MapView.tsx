import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

const MapView: React.FC<any> = (props) => {
  return (
    <>
      <Map className="map" center={[props.lat, props.long]} zoom={10}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[props.lat, props.long]}>
          <Popup>
            <p>You are here!</p>
          </Popup>
        </Marker>
      </Map>
    </>
  );
};

export default MapView;

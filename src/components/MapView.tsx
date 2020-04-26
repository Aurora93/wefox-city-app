import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

const MapView = () => {
  return (
    <>
      <Map className="map" center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            <p>You are here!</p>
          </Popup>
        </Marker>
      </Map>
    </>
  );
};
// var mymap = L.map("mapid").setView([51.505, -0.09], 13);

// const MapView = (props: any) => {
//   return (
//     <>
//       <div className="mapid"></div>
//     </>
//   );
// };

export default MapView;

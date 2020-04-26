import React from "react";
import GoogleMapReact from "google-map-react";

const MapView = (lat: any, long: any) => {
  return (
    <>
      <div style={{ height: 250, width: 250 }}>
        <GoogleMapReact
          defaultCenter={{
            lat: lat,
            lng: long,
          }}
          defaultZoom={11}
        />
      </div>
    </>
  );
};

export default MapView;

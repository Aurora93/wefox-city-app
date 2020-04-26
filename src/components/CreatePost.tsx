import React, { useRef, useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

// type CreatePostProps = {
//   onCreatePost: (postText: string) => void;
// };

const CreatePost: React.FC = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  let [latLng, setLatLng] = useState({ lat: 0, lng: 0 });

  useEffect(() => {}, [latLng]);
  // handleClick(e){
  //   setCorrds(e.latlng );
  // }

  //   const postSubmitHandler = (event: React.FormEvent) => {
  //     event.preventDefault();
  //     const enteredText = textInputRef.current!.value;
  //     props.onCreatePost(enteredText);
  //   };
  function updateMarker(latlng: any) {
    setLatLng(latlng);
  }

  return (
    <form>
      <div className="form-control">
        <label htmlFor="post-text">Post city</label>
        <input type="text" placeholder="Name of the city" ref={textInputRef} />
        <input
          type="text"
          placeholder="Description of the city"
          ref={textInputRef}
        />
      </div>
      <>
        <Map
          className="map"
          center={[51.505, -0.09]}
          zoom={12}
          onClick={({ latlng }: any) => updateMarker(latlng)}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[latLng.lat, latLng.lng]}>
            <Popup>
              <p>You are here!</p>
            </Popup>
          </Marker>
        </Map>
      </>
      <button type="submit">Add post!</button>
    </form>
  );
};

export default CreatePost;

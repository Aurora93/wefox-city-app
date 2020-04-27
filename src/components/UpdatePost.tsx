import React, { useState, useRef } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { updatePost } from "../logic/";

export interface UpdatePostProps {
  id: number;
  title: string;
  content: string;
  lat: string;
  long: string;
  image_url: string;
  onBack: () => void;
}

const UpdatePost: React.FC<UpdatePostProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const textAreaInputRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [latLng, setLatLng] = useState({ lat: props.lat, lng: props.long });

  function updateMarker(latlng: { lat: string; lng: string }) {
    setLatLng(latlng);
  }

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    let data: {
      title: string;
      content: string;
      image_url: string;
      lat: string;
      long: string;
    } = {
      title: "",
      content: "",
      image_url: "",
      lat: "",
      long: "",
    };

    data.title = textInputRef.current!.value;
    data.content = textAreaInputRef.current!.value;
    data.image_url = imageRef.current!.value;

    data.lat = latLng.lat.toString();
    data.long = latLng.lng.toString();

    await updatePost(data, props.id);
    props.onBack();
  };

  return (
    <form onSubmit={handleUpdate}>
      <div className="form-control">
        <input ref={textInputRef} type="text" defaultValue={props.title} />
        <textarea
          ref={textAreaInputRef}
          defaultValue={props.content}
          rows={4}
          cols={50}
        />
        <input ref={imageRef} type="text" defaultValue={props.image_url} />
      </div>
      <>
        <p>Click on the map to set a marker on where the city is located</p>
        <Map
          className="map"
          center={[+latLng.lat, +latLng.lng]}
          zoom={10}
          onClick={({ latlng }: any) => updateMarker(latlng)}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[+latLng.lat, +latLng.lng]}>
            <Popup>
              <p>Selected location</p>
            </Popup>
          </Marker>
        </Map>
      </>
      <button type="submit">Update post!</button>
      <button onClick={() => props.onBack()}>Back</button>
    </form>
  );
};

export default UpdatePost;

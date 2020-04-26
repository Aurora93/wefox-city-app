import React, { useRef, useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { resolve } from "path";

type CreatePostProps = {
  onCreatePost: (postText: {
    title: string;
    content: string;
    image_url: string;
    lat: number;
    long: number;
    created_at: Date;
  }) => void;
};

const CreatePost: React.FC<CreatePostProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const textAreaInputRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coordinates = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setLatLng(coordinates);
    });
  }, []);

  function updateMarker(latlng: { lat: number; lng: number }) {
    setLatLng(latlng);
  }

  const handleForm = (event: React.FormEvent) => {
    event.preventDefault();
    let data: {
      title: string;
      content: string;
      image_url: string;
      lat: number;
      long: number;
      created_at: Date;
    } = {
      title: "",
      content: "",
      image_url: "",
      lat: 0,
      long: 0,
      created_at: new Date(),
    };

    data.title = textInputRef.current!.value;
    data.content = textAreaInputRef.current!.value;
    data.image_url = resolve(__dirname, imageRef.current!.value);

    data.lat = latLng.lat;
    data.long = latLng.lng;

    props.onCreatePost(data);
  };

  return (
    <form onSubmit={handleForm}>
      <div className="form-control">
        <label htmlFor="post-text">Post city</label>
        <input ref={textInputRef} type="text" placeholder="Name of the city" />
        <textarea
          ref={textAreaInputRef}
          placeholder="Description of the city"
          rows={4}
          cols={50}
        />
        <input
          ref={imageRef}
          type="file"
          id="img"
          name="img"
          accept="image/*"
        />
      </div>
      <>
        <Map
          className="map"
          center={[latLng.lat, latLng.lng]}
          zoom={10}
          onClick={({ latlng }: any) => updateMarker(latlng)}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[latLng.lat, latLng.lng]}>
            <Popup>
              <p>Selected location</p>
            </Popup>
          </Marker>
        </Map>
      </>
      <button type="submit">Add post!</button>
    </form>
  );
};

export default CreatePost;

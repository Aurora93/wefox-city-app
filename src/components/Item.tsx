import React, { useState } from "react";
import { CityPost } from "../store/types";
// import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import MapView from "./MapView";
import { confirmAlert } from "react-confirm-alert";
import { deletePost } from "../logic";
import "react-confirm-alert/src/react-confirm-alert.css";
import { UpdatePost } from "./";

const Item: React.FC<CityPost> = (props) => {
  const [updateWin, setUpdateWin] = useState();
  // const textInputRef = useRef<HTMLInputElement>(null);
  // const textAreaInputRef = useRef<HTMLTextAreaElement>(null);
  // const imageRef = useRef<HTMLInputElement>(null);
  // const [latLng, setLatLng] = useState({ lat: props.lat, lng: props.long });

  const options = {
    title: "Confirm to delete",
    message: "Are you sure you want to delete this post?",
    buttons: [
      {
        label: "Yes",
        onClick: async () => await deletePost(props.id),
      },
      {
        label: "No",
        onClick: () => console.log("Click No"),
      },
    ],
  };

  const onDelete = (event: any) => {
    event.preventDefault();
    confirmAlert(options);
  };

  const onEdit = (event: any) => {
    event.preventDefault();
    setUpdateWin(props.id);
  };

  // function updateMarker(latlng: { lat: string; lng: string }) {
  //   setLatLng(latlng);
  // }

  const handleGoBack = () => {
    setUpdateWin(0);
  };

  // const handleUpdate = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   let data: {
  //     title: string;
  //     content: string;
  //     image_url: string;
  //     lat: string;
  //     long: string;
  //   } = {
  //     title: "",
  //     content: "",
  //     image_url: "",
  //     lat: "",
  //     long: "",
  //   };

  //   data.title = textInputRef.current!.value;
  //   data.content = textAreaInputRef.current!.value;
  //   data.image_url = imageRef.current!.value;

  //   data.lat = latLng.lat.toString();
  //   data.long = latLng.lng.toString();
  // };

  return (
    <>
      {updateWin === props.id ? (
        <UpdatePost
          id={props.id}
          title={props.title}
          content={props.content}
          lat={props.lat}
          long={props.long}
          image_url={props.image_url}
          onBack={handleGoBack}
        />
      ) : (
        <>
          <div className="item" key={props.id}>
            <div className="item__header">
              <h1 className="item__title">{props.title}</h1>
              <div className="item__actions">
                <div onClick={onEdit}>
                  <i className="fas fa-edit"></i>
                </div>
                <div onClick={onDelete}>
                  <i className="item__trash fas fa-trash"></i>
                </div>
              </div>
            </div>
            <p>{props.content}</p>
            <img src={props.image_url} alt={props.title} />
            <h2>Location: </h2>
            <MapView lat={props.lat} long={props.long} />
          </div>
        </>
      )}
    </>
  );
};

export default Item;

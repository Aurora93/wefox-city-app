import React from "react";
import { CityPost } from "../store/types";
import MapView from "./MapView";
import { confirmAlert } from "react-confirm-alert";
import { deletePost } from "../logic";
import "react-confirm-alert/src/react-confirm-alert.css";

const Item: React.FC<CityPost> = (props) => {
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

  return (
    <div className="item" key={props.id}>
      <div className="item__header">
        <h1 className="item__title">{props.title}</h1>
        <div className="item__actions">
          <div>
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
  );
};

export default Item;

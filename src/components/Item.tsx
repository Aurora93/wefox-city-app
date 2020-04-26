import React from "react";
import { CityPost } from "../store/types";
import MapView from "./MapView";

const Item: React.FC<CityPost> = (props) => {
  const onDelete = (event: any) => {
    event.preventDefault();
    props.onDeletePost(props.id);
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
      <img src={props.image_url} alt="" />
      <h2>Location: </h2>
      <MapView lat={props.lat} long={props.long} />
    </div>
  );
};

export default Item;

import React from "react";
import { CityPost } from "../store/types";
import MapView from "./MapView";

const Item: React.FC<CityPost> = (props) => {
  return (
    <div className="item-container" key={props.id}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <img src={props.image_url} alt="" />
      <h2>Location: </h2>
      <MapView />
      {/* <div className="map">
          <MapView lat={+props.lat} long={+props.long} />
        </div>
        <button onClick={props.onDeletePost.bind(null, post.id)}>
            Delete
          </button> */}
    </div>
  );
};

export default Item;

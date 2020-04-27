import React, { useState } from "react";
import { CityPost } from "../store/types";
import MapView from "./MapView";
import { confirmAlert } from "react-confirm-alert";
import { deletePost } from "../logic";
import "react-confirm-alert/src/react-confirm-alert.css";
import { UpdatePost } from "./";

const Item: React.FC<CityPost> = (props) => {
  const [updateWin, setUpdateWin] = useState();
  const [error, setError] = useState<any>();

  function __handleError__(message: any) {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  }

  const options = {
    title: "Confirm to delete",
    message: "Are you sure you want to delete this post?",
    buttons: [
      {
        label: "Yes",
        onClick: async () => {
          try {
            await deletePost(props.id);
          } catch (error) {
            __handleError__(error.message);
          }
        },
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

  const handleGoBack = () => {
    setUpdateWin(0);
  };

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

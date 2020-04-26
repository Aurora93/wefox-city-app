import React, { useState, useEffect } from "react";
import { PostsList, CreatePost } from "./components";
import { CityPost } from "./store/types";
import { retrieveAllPosts, createPost, deletePost } from "./logic";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const App: React.FC = () => {
  const [cities, setCities] = useState<any>([]);
  const [view, setView] = useState<string>("");

  const options = {
    title: "Confirm to submit",
    message: "Are you sure to do this.",
    buttons: [
      {
        label: "Yes",
        onClick: () => alert("Click Yes"),
      },
      {
        label: "No",
        onClick: () => alert("Click No"),
      },
    ],
  };

  const submit = () => {
    confirmAlert(options);
  };

  useEffect(() => {
    let response;
    try {
      (async () => {
        response = await retrieveAllPosts<CityPost[]>();
        setCities(response);
      })();
    } catch (response) {
      console.log("Error", response);
    }
  }, [cities]);

  // const deletePostHandler = (postId: string) => {
  //   setCities((prevPosts) => {
  //     return prevPosts.filter((post) => post.id !== postId);
  //   });
  // };
  const toCreateHandler = () => {
    setView("create");
  };

  const CreatePostHandler = async (data: any) => {
    await createPost(data);
    setView("");
  };

  const deletePostHandler = async (id: number) => {
    await deletePost(id);
  };

  return (
    <div className="App">
      <div className="container">
        <button onClick={submit}>Confirm dialog</button>
      </div>
      <h1 className="App-title">Wefox City Search </h1>
      <div className="button__top">
        <button className="button__top" onClick={toCreateHandler}>
          Do you want add one more city? Click here!
        </button>
      </div>
      {view === "create" && <CreatePost onCreatePost={CreatePostHandler} />}
      <PostsList items={cities} onDeletePost={deletePostHandler} />
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import { PostsList, CreatePost } from "./components";
import { CityPost } from "./post.model";
import { retrieveAllPosts } from "./logic";

const App: React.FC = () => {
  const [cities, setCities] = useState<any>([]);
  const [view, setView] = useState<string>();

  useEffect(() => {
    let response;
    try {
      (async () => {
        response = await retrieveAllPosts<CityPost[]>();
        setCities(response);
        console.log("response", response);
      })();
    } catch (response) {
      console.log("Error", response);
    }
  }, []);

  // const createPostHandler = (title: string) => {
  //   setCities((prevPosts) => [
  //     ...prevPosts,
  //     { id: Math.random().toString(), title: title },
  //   ]);
  // };

  // const deletePostHandler = (postId: string) => {
  //   setCities((prevPosts) => {
  //     return prevPosts.filter((post) => post.id !== postId);
  //   });
  // };
  const toCreateHandler = () => {
    setView("create");
  };

  return (
    <div className="App">
      <h1 className="App-title">Wefox City Search </h1>
      <div className="button__top">
        <button className="button__top" onClick={toCreateHandler}>
          Do you want add one more city? Click here!
        </button>
      </div>
      {view === "create" && <CreatePost />}
      <PostsList items={cities} />
    </div>
  );
};

export default App;

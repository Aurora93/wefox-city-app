import React, { useState, useEffect } from "react";
import { PostsList, CreatePost } from "./components";
import { CityPost } from "./store/types";
import { retrieveAllPosts, createPost } from "./logic";

const App: React.FC = () => {
  const [cities, setCities] = useState<any>([]);
  const [view, setView] = useState<string>("");

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

  const handleCreatePost = async (data: any) => {
    await createPost(data);
    setView("");
  };

  return (
    <div className="App">
      <h1 className="App-title">Wefox City Search </h1>
      <div className="button__top">
        <button className="button__top" onClick={toCreateHandler}>
          Do you want add one more city? Click here!
        </button>
      </div>
      {view === "create" && <CreatePost onCreatePost={handleCreatePost} />}
      <PostsList items={cities} />
    </div>
  );
};

export default App;

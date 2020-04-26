import React, { useState, useEffect } from "react";
import { PostsList, CreatePost } from "./components";
import { CityPost } from "./post.model";
import { retrieveAllPosts } from "./logic";
import { HttpResponse } from "./logic/retrieve-all-posts";

const App: React.FC = () => {
  const [cities, setCities] = useState<any>([]);

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

  return (
    <div className="App">
      <PostsList items={cities} />
    </div>
  );
};

export default App;

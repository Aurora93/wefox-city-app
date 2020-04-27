import React, { useState, useEffect } from "react";
import { PostsList, CreatePost, UpdatePost } from "./components";
import { CityPost } from "./store/types";
import { retrieveAllPosts, createPost } from "./logic";
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  RouteComponentProps,
} from "react-router-dom";

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

  const toCreateHandler = () => {
    setView("create");
  };

  const CreatePostHandler = async (data: any) => {
    await createPost(data);
    setView("");
  };

  const onBackHandler = () => {
    setView("");
  };

  return (
    <Router>
      <div className="App">
        <h1 className="App-title">Wefox City Search </h1>
        <div className="button__top">
          <button onClick={toCreateHandler}>
            Do you want add one more city? Click here!
          </button>
        </div>
        {view === "create" && (
          <CreatePost onCreatePost={CreatePostHandler} onBack={onBackHandler} />
        )}
        {/* <PostsList items={cities} /> */}
        <Switch>
          <Route path="/" render={(props) => <PostsList items={cities} />} />
          <Route
            path="/create-post"
            render={(props) => (
              <CreatePost
                onCreatePost={CreatePostHandler}
                onBack={onBackHandler}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import { PostsList, CreatePost } from "./components";
import { CityPost } from "./store/types";
import { retrieveAllPosts, createPost } from "./logic";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

const App: React.FC = () => {
  const [cities, setCities] = useState<any>([]);
  const [view, setView] = useState<string>("");
  const [error, setError] = useState<any>(null);

  function __handleError__(message: any) {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  }

  useEffect(() => {
    let response;
    try {
      (async () => {
        response = await retrieveAllPosts<CityPost[]>();
        setCities(response);
      })();
    } catch (error) {
      __handleError__(error.message);
    }
  }, [cities]);

  const toCreateHandler = () => {
    setView("create");
  };

  const CreatePostHandler = async (data: any) => {
    try {
      await createPost(data);
      setView("");
    } catch (error) {
      __handleError__(error.message);
    }
  };

  const onBackHandler = () => {
    setView("");
  };

  return (
    <Router>
      <div className="App">
        <h1 className="App-title">Wefox City Search </h1>
        {error && <p>{error}</p>}
        <div className="button__top">
          <button onClick={toCreateHandler}>
            Do you want add one more city? Click here!
          </button>
        </div>
        {view === "create" && (
          <CreatePost onCreatePost={CreatePostHandler} onBack={onBackHandler} />
        )}
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

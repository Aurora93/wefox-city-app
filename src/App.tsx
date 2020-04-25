import React, { useState }from 'react';
import {PostsList, CreatePost} from './components'
import { Post } from './post.model'

const App: React.FC = () => {
  const [cities, setCities] = useState<Post[]>([])

  const createPostHandler = (title: string) => {
    setCities(prevPosts => [
      ...prevPosts,
      {id: Math.random().toString(), title: title}
    ]);
  };

  const deletePostHandler = (postId: string) => {
    setCities(prevPosts => {
      return prevPosts.filter(post => post.id !== postId)
    })
  };

  return (
    <div className="App">
      <CreatePost onCreatePost={createPostHandler}/>
      <PostsList items={cities} onDeletePost = {deletePostHandler}/>
    </div>
  );
}

export default App;

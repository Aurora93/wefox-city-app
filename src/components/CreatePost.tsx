import React, { useRef } from "react";

type CreatePostProps = {
  onCreatePost: (postText: string) => void;
};

const CreatePost: React.FC<CreatePostProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const postSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    props.onCreatePost(enteredText);
  };

  return (
    <form onSubmit={postSubmitHandler}>
      <div className="form-control">
        <label htmlFor="post-text">Post text</label>
        <input type="text" id="post-text" ref={textInputRef} />
      </div>
      <button type="submit">Add post!</button>
    </form>
  );
};

export default CreatePost;

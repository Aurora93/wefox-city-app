import React, { useRef } from "react";

// type CreatePostProps = {
//   onCreatePost: (postText: string) => void;
// };

const CreatePost: React.FC = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  //   const postSubmitHandler = (event: React.FormEvent) => {
  //     event.preventDefault();
  //     const enteredText = textInputRef.current!.value;
  //     props.onCreatePost(enteredText);
  //   };

  return (
    <form>
      <div className="form-control">
        <label htmlFor="post-text">Post city</label>
        <input type="text" placeholder="Name of the city" ref={textInputRef} />
        <input
          type="text"
          placeholder="Description of the city"
          ref={textInputRef}
        />
      </div>
      <button type="submit">Add post!</button>
    </form>
  );
};

export default CreatePost;

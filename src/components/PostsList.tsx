import React from "react";
import Item from "./Item";

interface PostsListProps {
  items: {
    id: number;
    title: string;
    content: string;
    lat: string;
    long: string;
    image_url: string;
    created_at: string;
    updated_at: string;
  }[];
}

const PostsList: React.FC<PostsListProps> = (props) => {
  return (
    <ul>
      {props.items.map((post) => (
        <Item
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          lat={post.lat}
          long={post.long}
          image_url={post.image_url}
          created_at={post.created_at}
          updated_at={post.updated_at}
        />
      ))}
    </ul>
  );
};

export default PostsList;

import React from 'react'

interface PostsListProps {
    items: {id: string, title: string}[];
    onDeletePost: (id: string) => void;
};

const PostsList: React.FC <PostsListProps> = props => {
    return <ul>
        {props.items.map(post => <li key = {post.id}>
            <span>{post.title}</span>
            <button onClick={props.onDeletePost.bind(null, post.id)}>Delete</button>
        </li>)}
    </ul>;
};

export default PostsList
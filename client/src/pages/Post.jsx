import { useState } from "react";
import { useCookies } from "react-cookie";
import { postText } from "../Api";

const Post = ({ posts, fetchPosts }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handlePostText = async (e) => {
    e.preventDefault();
    try {
      await postText(text);
      setText("")
      fetchPosts();
    } catch (err) {
      console.log(err);
      setError("Something went wrong, please try again!");
    }
  };

  return (
    <div>
      <form onSubmit={handlePostText}>
        <h1>Post</h1>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a post..." required />
        <button type="submit">Submit</button>
        {error && <p>{error}</p>}
      </form>

      <h1>Posts</h1>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index}>
            <p>Posted by: {post.user.username}</p>
            <p>{post.text}</p>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Post;

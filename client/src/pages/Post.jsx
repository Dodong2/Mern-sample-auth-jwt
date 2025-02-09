import { useState } from "react";
import { useCookies } from "react-cookie";
import { postText, logout } from "../Api";

const Post = ({ posts, fetchPosts }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [removeCookie] = useCookies(["token"])

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

  const handleLogout = async () => {
    try {
      await logout();
      removeCookie("token"); // Remove token from cookies
      window.location.reload(); // Reload page to reset state
    } catch (err) {
      console.log("Logout failed", err);
    }
  };

  return (
    <div>

    <button onClick={handleLogout}>Logout</button>

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

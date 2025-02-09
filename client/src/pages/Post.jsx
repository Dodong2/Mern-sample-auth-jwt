import { useState } from "react";
import { useCookies } from "react-cookie";
import { postText, logout } from "../Api";
import { useNavigate } from "react-router-dom";

const Post = ({ posts, fetchPosts }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate()

  const handlePostText = async (e) => {
    e.preventDefault();
    try {
      await postText(text);
      setText("")
      fetchPosts();
    } catch (err) {
      console.log(err);
      setError("Access denied, you are not logged in...");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      removeCookie("token", { path: "/" }); // Remove token from cookies
      navigate("/")
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

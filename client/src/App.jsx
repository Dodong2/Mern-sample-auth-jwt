import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getPosts } from "./Api";
// import Login from './pages/Login.jsx'
// import Register from './pages/Register.jsx'
// import Post from './pages/Post.jsx'

    

function App() {
    const Introduction = lazy(() => import('./pages/Introduction'))
    const Login = lazy(() => import('./pages/Login'))
    const Register = lazy(() => import('./pages/Register'))
    const Post = lazy(() => import('./pages/Post'))

  const [cookies] = useCookies(["token"]);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (cookies.token) {
      fetchPosts();
    }
  }, [cookies.token]);

  return (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
      <Routes>
      <Route path="/" element={<Introduction/>}/>
        <Route path="/login" element={<Login fetchPosts={fetchPosts} />} />
        <Route path="/register" element={<Register fetchPosts={fetchPosts} />} />
        <Route path="/post" element={<Post posts={posts} fetchPosts={fetchPosts} />} />
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

// import { Suspense, lazy } from 'react'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { register, login, postText, getPosts } from './Api';
import './App.css';

function App() {
    const [cookies, setCookies] = useCookies(['token']);
    const [username, setUsername] = useState('');
    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const [posts, setPosts] = useState([]);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(username, gmail, password);
            alert('User registered');
        } catch (err) {
            console.log(err);
            setError('Registration failed');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(gmail, password);
            console.log('login successfully');
            fetchPosts();
        } catch (err) {
            console.log(err);
            setError('Invalid credentials');
        }
    };

    const handlePostText = async (e) => {
        e.preventDefault();
        try {
            await postText(text);
            fetchPosts();
        } catch (err) {
            console.log(err);
        }
    };

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
        <>
            <div>
                <form onSubmit={handleRegister}>
                    <h1>Register</h1>
                    <input type='text' onChange={(e) => setUsername(e.target.value)} placeholder='username...' required />
                    <input type='text' onChange={(e) => setGmail(e.target.value)} placeholder='gmail...' required />
                    <input type='text' onChange={(e) => setPassword(e.target.value)} placeholder='password...' required />
                    <button type='submit'>submit</button>
                    {error && <p>{error}</p>}
                </form>

                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <input type='text' onChange={(e) => setGmail(e.target.value)} placeholder='Gmail...' required />
                    <input type='text' onChange={(e) => setPassword(e.target.value)} placeholder='password...' required />
                    <button type='submit'>submit</button>
                    {error && <p>{error}</p>}
                </form>

                <form onSubmit={handlePostText}>
                    <h1>Post</h1>
                    <input type='text' value={text} onChange={(e) => setText(e.target.value)} placeholder='post' required />
                    <button type='submit'>submit</button>
                </form>

                <h1>Posts</h1>
                {posts.map((post, index) => (
                    <div key={index}>
                    <p>Posted by: {post.user.username}</p>
                        <p>{post.text}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
import { useState } from "react";
import { useCookies } from "react-cookie";
import { login } from "../Api";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ fetchPosts }) => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(gmail, password);
      setCookies("token", response.data.token, { path: "/" });
      console.log("Login successful");
      fetchPosts();
      navigate("/post");
    } catch (err) {
      console.log(err);
      setError("Invalid credentials");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <input type="text" onChange={(e) => setGmail(e.target.value)} placeholder="Gmail..." required />
        <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder="Password..." required />
        <button type="submit">Submit</button>
        {error && <p>{error}</p>}
      </form>
      <br />
      <div>
        <span>You don't have an account yet? <Link to="/register">Sign up</Link></span>
      </div>
    </div>
  );
};

export default Login;

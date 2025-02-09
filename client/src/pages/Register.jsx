import { useState } from "react";
import { register } from "../Api";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ fetchPosts }) => {
  const [username, setUsername] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, gmail, password);
      alert("User registered");
      fetchPosts();
      navigate("/post");
    } catch (err) {
      console.log(err);
      setError("Registration failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username..." required />
        <input type="text" onChange={(e) => setGmail(e.target.value)} placeholder="Gmail..." required />
        <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder="Password..." required />
        <button type="submit">Submit</button>
        {error && <p>{error}</p>}
      </form>
      <br />
      <div>
        <span>Already have an account? <Link to="/login">Sign in</Link></span>
      </div>
    </div>
  );
};

export default Register;

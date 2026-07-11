import { useState } from "react";
import axios from "axios";
import "./Login.css";
  function Login({ onLogin }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

    try {

        const response = await axios.post(
            "http://localhost:8080/api/users/login",
            {
                username,
                password
            }
        );

        localStorage.setItem("username", response.data.username);
        localStorage.setItem("role", response.data.role);

        onLogin();

    } catch (err) {

        console.log(err);
        alert("Invalid Username or Password");

    }

};

    return (
    <div className="container">

      <div className="left-panel">
        <h1 className="title">
          📁 File <span>Processor</span>
        </h1>

        <h2>
          Smart File Processing <br />
          Made <span>Simple</span>
        </h2>

        <p>
          Upload, analyze and process your files efficiently
          with powerful tools.
        </p>

        <div className="feature">
          <h3>📤 Easy Upload</h3>
          <p>Upload multiple files easily.</p>
        </div>

        <div className="feature">
          <h3>🔒 Secure Processing</h3>
          <p>Your files are safe and secure.</p>
        </div>

        <div className="feature">
          <h3>📊 Real-time Results</h3>
          <p>Get instant results and insights.</p>
        </div>
      </div>

      <div className="right-panel">
        <div className="login-card">

          <h1>Welcome Back!</h1>
          <p>Login to access your account</p>
<input
type="text"
placeholder="👤 Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>
<input
type="password"
placeholder="🔒 Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

          <div className="options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <a href="/">Forgot Password?</a>
          </div>

          <button className="login-btn" onClick={handleLogin}>
🚀 Login
</button>

          <div className="divider">
            OR CONTINUE WITH
          </div>

          <div className="social">
            <button>Google</button>
            <button>GitHub</button>
          </div>

          <p className="signup">
            Don't have an account?
            <span> Sign Up</span>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;
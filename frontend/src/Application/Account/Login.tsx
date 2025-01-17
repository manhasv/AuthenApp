import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, setUser, setError } from "./authReducer";
import { login } from "./client"; // API function
import { Link, useNavigate } from "react-router-dom";
import "../CssFolder/Login.css";
import { showSuccessToast, showErrorToast } from "../Components/Toast"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: any) => state.auth);

  const handleLogin = async () => {
    dispatch(startLoading()); // Set loading to true
    try {
      const userData = await login({ email, password });
      dispatch(setUser(userData.user)); // Set the user on success
      showSuccessToast("Login successful!");
      navigate("/Application");
    } catch (e: any) {
      dispatch(setError("Login failed. Check your credentials.")); 
      console.log("Login failed:", e);
      showErrorToast("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome Back</h2>
        <p>Please log in to access your account.</p>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        <button className="login-button" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="signup-redirect">
          Don’t have an account? <Link to="/Application/Account/Signup">Sign Up Here</Link>
        </p>
        <p className="landing-redirect">
          <Link to="/Application/Landing">Main Page</Link>
        </p>
      </div>
    </div>
  );
}
